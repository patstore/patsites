import { z } from "zod";
import { activeFields } from "./modules.ts";
import type { DataField, ModuleField, PatStoreModule } from "./types.ts";

const ELEMENT_IDS = new Set([
  "categories",
  "fields",
  "data_fields",
  "setting_fields",
  "roles",
  "gallery",
  "persons",
  "times",
  "dates",
  "documents",
  "connected_elements",
  "form_fields",
  "content",
]);

const ELEMENT_TYPES = new Set([
  "edit_dates",
  "edit_times",
  "connected_elements",
  "edit_webpage_components",
  "categories",
  "gallery",
  "documents",
]);

const ARRAY_TYPES = new Set([
  "files",
  "gallery",
  "emails",
  "edit_persons",
  "edit_team",
  "category",
]);

const OBJECT_ARRAY_TYPES = new Set([
  "edit_dates",
  "edit_times",
  "connected_elements",
  "edit_webpage_components",
]);

export interface FieldDescription {
  id: string;
  required: boolean;
  tsType: string;
  zodExpr: string;
  zodType: z.ZodType;
  selection: string;
}

const fileZod = z
  .object({
    __typename: z.string().optional(),
    name: z.string().optional(),
    url: z.string(),
  })
  .nullable();

const fileExpr =
  "z.object({ __typename: z.string().optional(), name: z.string().optional(), url: z.string() }).nullable()";

export function isDownloadableFileField(field: ModuleField): boolean {
  return field.active && (field.id === "file" || field.id === "portrait" || field.type === "file");
}

export function moduleHasDownloadableFile(module: PatStoreModule): boolean {
  return activeFields(module).some((field) => isDownloadableFileField(field));
}

function prop(name: string): string {
  return /^[A-Za-z_$][\w$]*$/.test(name) ? name : JSON.stringify(name);
}

function elementSelection(id: string): string {
  return `${id} {\n... on Element {\nvalue\n}\n}`;
}

function selectionFor(field: ModuleField): string {
  if (field.id === "file" || field.id === "portrait" || field.type === "file") {
    return `${field.id} { name url }`;
  }
  if (field.id === "data") {
    return "data";
  }
  if (ELEMENT_IDS.has(field.id) || ELEMENT_TYPES.has(field.type)) {
    return elementSelection(field.id);
  }
  if (field.type === "geopoint" || field.type === "edit_geopoint") {
    return `${field.id} { latitude longitude }`;
  }
  if (field.type === "person" || field.type === "edit_person") {
    return `${field.id} { objectId }`;
  }
  return field.id;
}

function describedType(field: ModuleField): {
  tsType: string;
  zodExpr: string;
  zodType: z.ZodType;
} {
  if (field.id === "file" || field.id === "portrait" || field.type === "file") {
    return {
      tsType: "{ __typename?: string; name?: string; url: string } | null",
      zodExpr: fileExpr,
      zodType: fileZod,
    };
  }
  if (OBJECT_ARRAY_TYPES.has(field.type) || field.id === "dates" || field.id === "times" || field.id === "connected_elements") {
    return {
      tsType: "any[] | null",
      zodExpr: "z.array(z.any()).nullable()",
      zodType: z.array(z.any()).nullable(),
    };
  }
  if (ARRAY_TYPES.has(field.type) || field.id === "documents" || field.id === "gallery" || field.id === "emails") {
    return {
      tsType: "string[] | null",
      zodExpr: "z.array(z.string()).nullable()",
      zodType: z.array(z.string()).nullable(),
    };
  }
  if (field.type === "boolean") {
    return {
      tsType: "boolean | null",
      zodExpr: "z.boolean().nullable()",
      zodType: z.boolean().nullable(),
    };
  }
  if (field.type === "geopoint" || field.type === "edit_geopoint") {
    return {
      tsType: "{ latitude: number; longitude: number } | null",
      zodExpr: "z.object({ latitude: z.number(), longitude: z.number() }).nullable()",
      zodType: z.object({ latitude: z.number(), longitude: z.number() }).nullable(),
    };
  }
  if (
    field.type === "string" ||
    field.type === "edit_string" ||
    field.type === "textfield" ||
    field.type === "edit_textfield" ||
    field.type === "texteditor" ||
    field.type === "edit_texteditor" ||
    field.type === "state" ||
    field.type === "edit_state" ||
    field.type === "location" ||
    field.type === "edit_color" ||
    field.type === "content" ||
    field.type === "edit_content" ||
    field.type === "custom" ||
    field.type === "image" ||
    field.type === "edit_image" ||
    field.type === "image_preview" ||
    field.type === "date" ||
    field.type === "edit_date" ||
    field.type === "person" ||
    field.type === "edit_person" ||
    field.type === "video" ||
    field.type === "edit_role"
  ) {
    return {
      tsType: "string | null",
      zodExpr: "z.string().nullable()",
      zodType: z.string().nullable(),
    };
  }
  return {
    tsType: "any | null",
    zodExpr: "z.any().nullable()",
    zodType: z.any().nullable(),
  };
}

function dataFieldType(field: DataField): {
  tsType: string;
  zodExpr: string;
  zodType: z.ZodType;
} {
  if (field.type === "number") {
    return {
      tsType: "string | number | null",
      zodExpr: "z.union([z.string(), z.number()]).nullable()",
      zodType: z.union([z.string(), z.number()]).nullable(),
    };
  }
  if (field.type === "checkbox" || field.type === "boolean") {
    return {
      tsType: "boolean | string | null",
      zodExpr: "z.union([z.boolean(), z.string()]).nullable()",
      zodType: z.union([z.boolean(), z.string()]).nullable(),
    };
  }
  return {
    tsType: "string | null",
    zodExpr: "z.string().nullable()",
    zodType: z.string().nullable(),
  };
}

export function describeModule(module: PatStoreModule): FieldDescription[] {
  const fields: FieldDescription[] = [];
  const seen = new Set<string>();

  const push = (field: FieldDescription) => {
    if (seen.has(field.id)) {
      return;
    }
    seen.add(field.id);
    fields.push(field);
  };

  push({
    id: "categories",
    required: false,
    tsType: "string[] | null",
    zodExpr: "z.array(z.string()).nullable().optional()",
    zodType: z.array(z.string()).nullable().optional(),
    selection: elementSelection("categories"),
  });

  for (const field of activeFields(module)) {
    if (field.id === "categories" || field.id === "data") {
      continue;
    }
    const described = describedType(field);
    const optional = !field.required;
    push({
      id: field.id,
      required: field.required,
      tsType: described.tsType,
      zodExpr: optional ? `${described.zodExpr}.optional()` : described.zodExpr,
      zodType: optional ? described.zodType.optional() : described.zodType,
      selection: selectionFor(field),
    });
  }

  const dataFields = module.data_fields.filter((field) => field.name || field.id);
  if (dataFields.length > 0) {
    const shape: Record<string, z.ZodType> = {};
    const tsLines: string[] = [];
    const zodLines: string[] = [];
    for (const field of [...dataFields].sort((a, b) => a.position - b.position)) {
      const id = field.name || field.id;
      const described = dataFieldType(field);
      shape[id] = described.zodType.optional();
      tsLines.push(`${prop(id)}?: ${described.tsType};`);
      zodLines.push(`${prop(id)}: ${described.zodExpr}.optional()`);
    }
    push({
      id: "data",
      required: false,
      tsType: `{\n${tsLines.map((line) => `    ${line}`).join("\n")}\n  } | null`,
      zodExpr: `z.object({\n${zodLines.map((line) => `    ${line},`).join("\n")}\n  }).nullable().optional()`,
      zodType: z.object(shape).nullable().optional(),
      selection: "data",
    });
  }

  if (moduleHasDownloadableFile(module)) {
    push({
      id: "filePath",
      required: false,
      tsType: "string",
      zodExpr: "z.string().optional()",
      zodType: z.string().optional(),
      selection: "",
    });
  }

  if (module.connected_class === "Image") {
    push({
      id: "thumbnailPath",
      required: false,
      tsType: "string",
      zodExpr: "z.string().optional()",
      zodType: z.string().optional(),
      selection: "",
    });
  }

  return fields;
}

export function buildSelection(module: PatStoreModule): string {
  return describeModule(module)
    .map((field) => field.selection)
    .filter(Boolean)
    .join("\n");
}

export function stripSelectionField(selection: string, fieldName: string): string {
  const matcher = new RegExp(`\\b${fieldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{`);
  const match = matcher.exec(selection);
  if (!match) {
    return selection
      .split("\n")
      .filter((line) => line.trim() !== fieldName)
      .join("\n")
      .trim();
  }
  const brace = selection.indexOf("{", match.index);
  let depth = 0;
  for (let index = brace; index < selection.length; index += 1) {
    const char = selection[index];
    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return `${selection.slice(0, match.index)}${selection.slice(index + 1)}`.trim();
      }
    }
  }
  return selection;
}

export function selectionWithoutMissingField(
  selection: string,
  error: unknown,
): string | null {
  const message = error instanceof Error ? error.message : String(error);
  const match =
    /Cannot query field ["']([^"']+)["']/i.exec(message) ??
    /Field ["']([^"']+)["'] of type/i.exec(message);
  const fieldName = match?.[1];
  if (!fieldName) {
    return null;
  }
  const next = stripSelectionField(selection, fieldName);
  return next === selection ? null : next;
}

export function recordSchema(module: PatStoreModule): z.ZodType {
  const shape: Record<string, z.ZodType> = {
    objectId: z.string(),
    id: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  };
  for (const field of describeModule(module)) {
    shape[field.id] = field.zodType;
  }
  return z.looseObject(shape);
}

export function schemaExportName(className: string): string {
  const camel = className.charAt(0).toLowerCase() + className.slice(1);
  return `${camel.replace(/[^A-Za-z0-9_]/g, "") || "record"}Schema`;
}

export function classTypeName(className: string): string {
  return `${className.replace(/[^A-Za-z0-9_]/g, "") || "Record"}Class`;
}
