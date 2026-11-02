import { FormikErrors, FormikTouched, FormikValues } from "formik";
import React from "react";

export type ApplicationProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FieldData = {
    label: string;
    value: string | boolean;
    key: string;
    type: string;
    required: boolean;
    placeHolder?: string;
    inline?: boolean;
    showLabel?: boolean;
    options?: { value: string; label: string }[];
    subfield?: FieldData;
    html?: string;
};

export type RenderFieldsProps = {
    field: FieldData;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
    noLabel?: boolean;
    values: FormikValues;
};
