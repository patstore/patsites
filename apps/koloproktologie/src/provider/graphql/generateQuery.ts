import { gql } from "@apollo/client/core";

const stringreplace = (str: string) => {
    return str.replace(
        new RegExp("author", "g"),
        "author {objectId label portrait}"
    );
};

const unwrapZodType = (zodType: any): any => {
    if (!zodType?._def) return zodType;

    const typeName = zodType._def.typeName;
    if (typeName === "ZodOptional" || typeName === "ZodNullable") {
        return unwrapZodType(zodType._def.innerType);
    }

    return zodType;
};

const getQueryStringFromFields = (
    fields: string[],
    schemaShape?: Record<string, any>
) => {
    return fields
        .map((field) => {
            let isFileType = false;
            let isElementType = false;
            let nestedObjectFields: string[] | null = null;

            if (schemaShape && schemaShape[field]) {
                if (field === "data") {
                    return field;
                }

                const fieldDef = unwrapZodType(schemaShape[field]);

                if (fieldDef._def) {
                    const typeName = fieldDef._def.typeName;
                    if (typeName === "ZodObject") {
                        const shape = fieldDef._def.shape?.();
                        if (shape && shape.name && shape.url) {
                            isFileType = true;
                        } else if (
                            shape &&
                            shape.value &&
                            Object.keys(shape).length <= 2
                        ) {
                            isElementType = true;
                        } else if (shape) {
                            nestedObjectFields = Object.keys(shape);
                        }
                    } else if (typeName === "ZodArray") {
                        const innerType = unwrapZodType(fieldDef._def.type);
                        if (innerType._def?.typeName === "ZodObject") {
                            const innerShape = innerType._def.shape?.();
                            if (
                                innerShape &&
                                innerShape.value &&
                                Object.keys(innerShape).length <= 2
                            ) {
                                isElementType = true;
                            }
                        }
                    }
                }
            }

            if (!isFileType && !isElementType && !nestedObjectFields) {
                if (field === "data") {
                    return field;
                }

                if (
                    field === "categories" ||
                    field === "field" ||
                    field === "fields" ||
                    field === "data_fields" ||
                    field === "setting_fields" ||
                    field === "roles" ||
                    field === "gallery" ||
                    field === "persons" ||
                    field === "times" ||
                    field === "dates" ||
                    field === "documents" ||
                    field === "connected_elements" ||
                    field === "form_fields" ||
                    field === "content"
                ) {
                    isElementType = true;
                }

                if (field === "file" || field === "portrait") {
                    isFileType = true;
                }
            }

            if (isElementType) {
                return `
          ${field} {
            ... on Element {
              value
            }
          }
        `;
            }

            if (isFileType) {
                return `
          ${field} {
            name
            url
          }
        `;
            }

            if (nestedObjectFields && nestedObjectFields.length > 0) {
                const subfields = nestedObjectFields.join("\n            ");
                return `
          ${field} {
            ${subfields}
          }
        `;
            }

            return field;
        })
        .join("\n");
};

export interface GenerateQueryOptions {
    type?: string;
    objectName: string;
    queryName?: string;
    fields: string[];
    schemaShape?: Record<string, any>;
}

export function generateQuery(options: GenerateQueryOptions) {
    const {
        type = "find",
        objectName,
        queryName,
        fields = [],
        schemaShape
    } = options;
    const fieldsString = getQueryStringFromFields(fields, schemaShape);
    const processedFields = stringreplace(fieldsString);
    const finalQueryName = queryName || `${objectName.toLowerCase()}s`;

    return gql`
    query ${type}${objectName}($params: ${objectName}WhereInput, $first: Int, $skip: Int, $order: [${objectName}Order!]) {
      ${finalQueryName}(where: $params, first: $first, skip: $skip, order: $order) {
        count
        edges {
          node {
            id
            ${processedFields}
          }
        }
      }
    }
  `;
}
