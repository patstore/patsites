import React, { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { FormField, RenderFormProps } from "./types";
import createYupSchema from "./functions/createYupSchema";
import generateFieldType from "./functions/generateFieldType";
import { useServerFn } from "@tanstack/react-start";
import { submitFormEntry } from "@functions/forms.functions";
import { FullButton } from "@ui";
import styles from "./RenderForm.module.css";

const RenderForm: React.FC<RenderFormProps> = ({
  form,
  initialValues,
  onSubmit,
  hasHoneypot,
}) => {
  const [formSend, setFormSend] = React.useState(false);
  const [submitFailed, setSubmitFailed] = React.useState(false);
  const submitEntry = useServerFn(submitFormEntry);
  const formFields: FormField[] = form.form_fields.map((field: FormField) => {
    const { name, type, placeholder, required, label } = field;
    return {
      name,
      type,
      placeholder,
      required,
      label,
    } as FormField;
  });

  const submitHandler = useCallback(
    async (values: { [key: string]: any }) => {
      const { honeypot, ...fieldValues } = values;
      setSubmitFailed(false);
      try {
        await submitEntry({
          data: {
            formId: form.objectId,
            values: fieldValues,
            honeypot: hasHoneypot ? honeypot : undefined,
          },
        });
        setFormSend(true);
        onSubmit?.(fieldValues);
      } catch {
        setSubmitFailed(true);
      }
    },
    [form.objectId, hasHoneypot, onSubmit, submitEntry],
  );

  const validationSchema = createYupSchema(formFields);

  if (formSend) {
    return <p>Formular erfolgreich gesendet.</p>;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {({ errors, isValid }) => {
        return (
          <Form>
            <div className={styles.fields}>
              {formFields.map((field) => (
                <div key={field.name} className={styles.field}>
                  <label className="field-label" htmlFor={field.name}>
                    {field.label}
                  </label>
                  <Field
                    className="field-input"
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    as={generateFieldType(field)}
                    placeholder={field.placeholder}
                  />
                  <div className={styles.error}>
                    {(errors[field.name] as string) && (
                      <span>{errors[field.name] as string}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {hasHoneypot && (
              <div className={styles.honeypot}>
                <label htmlFor="honeypot">Leave this field blank</label>
                <Field
                  id="honeypot"
                  name="honeypot"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
              </div>
            )}
            {submitFailed && (
              <p role="alert" className={styles.error}>
                Das Formular konnte nicht gesendet werden. Bitte versuche es
                erneut.
              </p>
            )}
            <FullButton
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
