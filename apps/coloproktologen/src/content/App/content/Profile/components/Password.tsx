import React, { useState } from "react";
import { Formik } from "formik";
import { profileContentContainer } from "../styles";
import { Button, Divider, FlexBox } from "@ui";
import { isEqual } from "lodash-es";
import { apiRequest } from "@provider";
import * as Yup from "yup";
import { ColoproktologenUser } from "@types";

const passwordSchema = Yup.object().shape({
  // password: Yup.string().required("Aktuelles Passwort ist erforderlich"),
  new_password: Yup.string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      "Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten",
    )
    .required("Neues Passwort ist erforderlich"),
  new_password_confirmation: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwörter müssen übereinstimmen")
    .required("Passwortbestätigung ist erforderlich"),
});

const Password: React.FC<{
  user: ColoproktologenUser;
  getUser: () => Promise<void>;
}> = ({ user, getUser }) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState("");

  return (
    <div css={{ width: "100%" }}>
      <div css={profileContentContainer}>
        <div>
          <h3>Passwort</h3>
          <p>
            Ändern Sie Ihr Passwort, um sich beim Login in den geschützten
            Mitgliederbereich der BCD anzumelden.
          </p>
        </div>
        <FlexBox direction="column" align="flex-start" gap="30px">
          <div>
            <Formik
              validationSchema={passwordSchema}
              initialValues={{
                // password: "",
                new_password: "",
                new_password_confirmation: "",
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  await apiRequest("/api/account/password", {
                    password: values.new_password,
                  });
                  await getUser();
                  resetForm();
                  // Add success message handling here
                } catch (error: any) {
                  // eslint-disable-line @typescript-eslint/no-explicit-any
                  setError(error?.message);
                } finally {
                  setSuccess("Passwort erfolgreich geändert");
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
                initialValues,
                isValid,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  {/* <div>
                                        <label htmlFor="password">
                                            Bisheriges Passwort
                                        </label>
                                        <input
                                            value={values.password}
                                            id="password"
                                            type="password"
                                            placeholder="****"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.password &&
                                            touched.password && (
                                                <div className="form_error">
                                                    {errors.password}
                                                </div>
                                        )}
                                    </div> */}
                  <div>
                    <label htmlFor="new_password">Neues Passwort</label>
                    <input
                      value={values.new_password}
                      id="new_password"
                      type="password"
                      placeholder="****"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.new_password && touched.new_password && (
                      <div className="form_error">{errors.new_password}</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="new_password_confirmation">
                      Neues Passwort bestätigen
                    </label>
                    <input
                      value={values.new_password_confirmation}
                      id="new_password_confirmation"
                      type="password"
                      placeholder="****"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.new_password_confirmation &&
                      touched.new_password_confirmation && (
                        <div className="form_error">
                          {errors.new_password_confirmation}
                        </div>
                      )}
                  </div>

                  <Divider />
                  <Button
                    disabled={
                      !isValid || isSubmitting || isEqual(values, initialValues)
                    }
                    type="submit"
                    text="Passwort ändern"
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
          </div>
        </FlexBox>
      </div>
    </div>
  );
};

export default Password;
