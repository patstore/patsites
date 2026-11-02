import React, { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { FormField, RenderFormProps } from "./types";
import createYupSchema from "./functions/createYupSchema";
import {
    formError,
    label,
    submitButton,
    formField,
    fieldContainer
} from "./styles";
import generateFieldType from "./functions/generateFieldType";
import { useDataHandler } from "@provider";

const RenderForm: React.FC<RenderFormProps> = ({
    form,
    initialValues,
    onSubmit,
    buttonStyles,
    buttonText
}) => {
    const { createData } = useDataHandler();
    const formFields: FormField[] = form.fields.map((field) => {
        const { name, type, placeholder, required, label } = field;
        return {
            name,
            type,
            placeholder,
            required,
            label
        } as FormField;
    });

    const submitHandler = useCallback(
        async (values: { [key: string]: any }) => {
            await createData({
                className: "Item",
                updateObject: {
                    data: values,
                    reference_id: form.objectId,
                    type: "form"
                }
            });
        },
        [onSubmit]
    );

    const validationSchema = createYupSchema(formFields);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
        >
            {({ errors, isValid, submitForm }) => {
                return (
                    <Form>
                        <div css={fieldContainer}>
                            {formFields.map((field) => (
                                <div
                                    key={field.name}
                                    css={[formField, { flex: "1 1 40%" }]}
                                >
                                    <label
                                        css={label}
                                        htmlFor={field.name}
                                    >
                                        {field.label}
                                    </label>
                                    <Field
                                        id={field.name}
                                        name={field.name}
                                        type={field.type}
                                        as={generateFieldType(field)}
                                        placeholder={field.placeholder}
                                    />
                                    <div css={formError}>
                                        {(errors[field.name] as string) && (
                                            <span>
                                                {errors[field.name] as string}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            text="Formular abschicken"
                            type="submit"
                            disabled={!isValid}
                            onClick={() => null}
                        />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RenderForm;
