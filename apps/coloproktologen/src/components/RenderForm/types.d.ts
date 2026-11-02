import { CSSObject } from "@emotion/react";
import { FormClass } from "@types";

export type RenderFormProps = {
  form: FormClass;
  initialValues: { [key: string]: any };
  onSubmit: (values: { [key: string]: any }) => void;
  buttonStyles?: CSSObject;
  buttonText?: string;
};

export type FormField = {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";
  placeholder?: string;
  required?: boolean;
  select_options?: { label: string; value: string }[];
};
