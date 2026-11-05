import * as Yup from "yup";
import { FormField } from "../types";

export const createYupSchema = (fields: FormField[]) => {
  const shape: { [key: string]: Yup.AnySchema } = {};

  fields.forEach((field) => {
    let validator:
      | Yup.StringSchema
      | Yup.NumberSchema
      | Yup.BooleanSchema
      | Yup.MixedSchema;

    switch (field.type) {
      case "text":
      case "email":
        validator = Yup.string();
        if (field.type === "email") {
          validator = (validator as Yup.StringSchema).email(
            "Ungültige E-Mail-Adresse",
          );
        }
        break;
      case "number":
        validator = Yup.number().typeError("Bitte eine Zahl eingeben");
        break;
      case "checkbox":
        validator = Yup.boolean();
        break;
      case "select":
      case "radio":
        validator = Yup.string();
        break;
      default:
        validator = Yup.mixed();
    }

    if (field.required) {
      validator = validator.required(`${field.name} ist ein Pflichtfeld`);
    }

    shape[field.name] = validator;
  });

  return Yup.object().shape(shape);
};

export default createYupSchema;
