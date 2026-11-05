import React, { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Field, Form, Formik } from "formik";
import { submitContactMessage } from "@functions/forms.functions";

type SubmitState = "idle" | "success" | "error";

const ContactForm = () => {
  const submit = useServerFn(submitContactMessage);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const initialValues = {
    name: "",
    message: "",
    email: "",
  };

  return (
    <div>
      <h3 css={{ margin: 0 }}>Kontaktformular</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          try {
            await submit({ data: values });
            setSubmitState("success");
            actions.resetForm();
            setTimeout(() => setSubmitState("idle"), 5000);
          } catch {
            setSubmitState("error");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="name">Vor- und Nachname</label>
            <Field id="name" name="name" placeholder="Vor- und Nachname" required />
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="beispiel@email.com"
              type="email"
              required
            />
            <label htmlFor="message">Ihre Nachricht</label>
            <Field
              id="message"
              name="message"
              placeholder="Nachricht"
              as="textarea"
              required
            />

            {submitState === "error" && (
              <p role="alert">
                Die Nachricht konnte nicht übermittelt werden. Bitte versuche es
                erneut.
              </p>
            )}
            {submitState === "success" ? (
              <h4>Ihre Nachricht wurde erfolgreich übermittelt</h4>
            ) : (
              <button disabled={isSubmitting} className="submit_button" type="submit">
                {isSubmitting ? "Wird übermittelt" : "Formular absenden"}
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
