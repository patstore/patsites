import { FormikValues } from "formik";

const disabledHandler = (key: string, values: FormikValues) => {
    let isDisabled = false;

    if (values.billing !== "sepa") {
        if (key === "account_owner") {
            isDisabled = true;
        }
        if (key === "sepa_country") {
            isDisabled = true;
        }
        if (key === "sepa_iban") {
            isDisabled = true;
        }
        if (key === "sepa_bic") {
            isDisabled = true;
        }
    }

    if (values.newsletter === false) {
        if (key === "newsletter_email" || key === "newsletter_email_address") {
            isDisabled = true;
        }
    } else if (values.newsletter === true) {
        if (values.newsletter_email === "existing") {
            if (key === "newsletter_email_address") {
                isDisabled = true;
            }
        }
    }

    return isDisabled;
};

export default disabledHandler;
