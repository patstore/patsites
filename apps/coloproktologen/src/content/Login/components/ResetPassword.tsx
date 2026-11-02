import { env } from "@env";
import { axiosclient } from "@provider";
import settings from "@settings";
import { Button, SlideIn } from "@ui";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const emailSchema = Yup.object().shape({
  // password: Yup.string().required("Aktuelles Passwort ist erforderlich"),
  email: Yup.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
});

const ResetPassword: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <>
      <Button background={settings.colors.light} color={settings.colors.dark} text="Passwort vergessen?" onClick={() => setOpen(true)} />
      <SlideIn
        open={open}
        cancelButtonHandler={() => setOpen(false)}
        width="small"
      >
        <h3>Passwort zurücksetzen</h3>

        <Formik
          validationSchema={emailSchema}
          initialValues={{
            email: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setSuccess("");
              setError("");
              setSubmitting(true);

              const response = await axiosclient().post("/functions/send_password_reset", {
                email: values.email,
                project_id: env.patstoreProjectId,
              });

              if (response.statusText === "OK") {
                setSuccess("Sie erhalten in Kürze eine E-Mail mit einem Link, um Ihr Passwort zurückzusetzen.");
              } 
              setSubmitting(false);
             
            } catch (error: any) {
              setError(error.response.data.error);
              setSubmitting(false);
              resetForm();
            } 
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            isValid,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">
                  Hier können Sie Ihr Passwort zurücksetzen.
                </label>
                <input
                  value={values.email}
                  id="email"
                  type="text"
                  placeholder="beispiel@example.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="form_error">{errors.email}</div>
                )}
              </div>
              <Button
                text="Passwort zurücksetzen"
                onClick={() => handleSubmit()}
                disabled={!isValid || isSubmitting}
              />
            </form>
          )}
        </Formik>
        {success && (
          <div>
            <p css={{ color: "green" }}>{success}</p>
          </div>
        )}
        {error && (
          <div>
            <p css={{ color: "red" }}>{error}</p>
          </div>
        )}
      </SlideIn>
    </>
  );
};

export default ResetPassword;
