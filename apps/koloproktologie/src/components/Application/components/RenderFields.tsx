import React from "react";
import { RenderFieldsProps } from "../types";
import {
    fieldContainer,
    radioOrCheckboxfieldContainer,
    reactSelectStyles
} from "../styles";
import { Field, FieldProps } from "formik";
import ReactSelect from "react-select";
import disabledHandler from "../functions/disabledHandler";

const RenderFields: React.FC<RenderFieldsProps> = ({
    field,
    errors,
    touched,
    noLabel,
    values
}) => {
    const isRadioOrCheckbox =
        field.type === "radio" || field.type === "checkbox";

    return (
        <div
            key={field.key}
            css={
                isRadioOrCheckbox
                    ? radioOrCheckboxfieldContainer
                    : fieldContainer
            }
        >
            <label
                htmlFor={field.key}
                css={{
                    order: isRadioOrCheckbox ? 2 : 0,
                    width: isRadioOrCheckbox ? "360px" : "180px",
                    display: noLabel ? "none" : "inline-block"
                }}
            >
                {field.label}
                {field.html && (
                    <div dangerouslySetInnerHTML={{ __html: field.html }} />
                )}
            </label>
            {/* Handle different field types */}
            {field.type === "radio" ? (
                <Field
                    type="radio"
                    name={field.key}
                    value={field.value}
                    css={{ order: 1, width: "40px" }}
                    disabled={disabledHandler(field.key, values)}
                />
            ) : typeof field.value === "boolean" ? (
                <Field
                    type="checkbox"
                    name={field.key}
                    id={field.key}
                    className="form-checkbox"
                    required={field.required}
                    css={{ order: 1, width: "40px" }}
                    disabled={disabledHandler(field.key, values)}
                />
            ) : field.type === "select" && field.options ? (
                <Field
                    name={field.key}
                    required={field.required}
                    css={{ order: 1, width: "180px" }}
                >
                    {(fieldProps: FieldProps) =>
                        field.options && (
                            <ReactSelect
                                placeholder={field.placeHolder}
                                styles={reactSelectStyles}
                                options={field.options}
                                isDisabled={disabledHandler(field.key, values)}
                                onChange={(e: any) => {
                                    if (e && e.value) {
                                        fieldProps.form.setFieldValue(
                                            field.key,
                                            e.value
                                        );
                                    }
                                }}
                                value={field.options.find(
                                    (option) =>
                                        option.value === fieldProps.field.value
                                )}
                            />
                        )
                    }
                </Field>
            ) : field.type === "password" ? (
                <Field
                    type="password"
                    name={field.key}
                    id={field.key}
                    className="form-input w-full px-3 py-2 border rounded"
                    required={field.required}
                    placeHolder={field.placeHolder}
                    disabled={disabledHandler(field.key, values)}
                    css={{
                        width: "240px",
                        borderColor:
                            errors[field.key] && touched[field.key]
                                ? "#ef4444"
                                : "#e5e7eb",
                        transition: "all 0.2s ease-in-out"
                    }}
                />
            ) : (
                <Field
                    type="text"
                    name={field.key}
                    id={field.key}
                    className="form-input w-full px-3 py-2 border rounded"
                    required={field.required}
                    placeHolder={field.placeHolder}
                    disabled={disabledHandler(field.key, values)}
                    css={{
                        width: "240px",
                        borderColor:
                            errors[field.key] && touched[field.key]
                                ? "#ef4444"
                                : "#e5e7eb",
                        transition: "all 0.2s ease-in-out"
                    }}
                />
            )}
            {touched[field.key] && errors[field.key] && (
                <div
                    className="form_error"
                    css={{ order: 4 }}
                >
                    {errors[field.key] as string}
                </div>
            )}
        </div>
    );
};

export default RenderFields;
