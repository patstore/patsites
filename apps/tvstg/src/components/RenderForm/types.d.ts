import type { CSSProperties } from "react";
import { PatstoreForm } from "@types";

export type RenderFormProps = {
  form: UnwrapScalar<PatstoreForm>;
  initialValues: { [key: string]: any };
  onSubmit: (values: { [key: string]: any }) => void;
  buttonStyles?: CSSProperties;
  buttonText?: string;
  hasHoneypot?: boolean;
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
