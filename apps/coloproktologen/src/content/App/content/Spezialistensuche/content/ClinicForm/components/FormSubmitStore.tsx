import { useFormikContext } from "formik";
import { isEqual } from "lodash-es";
import { useEffect } from "react";
import { FormSubmitStoreProps } from "../types";
import { useDebounceValue } from "usehooks-ts";

const FormSubmitStore = ({
    formValidationHandler,
    useWithDebounce = true,
    setErrors
}: FormSubmitStoreProps) => {
    const {
        submitForm,
        values,
        initialValues,
        isValid: formIsValid,
        errors
    } = useFormikContext();
    const [formValues, setFormValues] = useDebounceValue(initialValues, 2000);
    
    useEffect(() => {
        const dataHasChanged = !isEqual(values, initialValues);
        if (formValidationHandler) {
            formValidationHandler(formIsValid);
        }
        if (dataHasChanged && useWithDebounce) {
            setFormValues(values);
        }
        if (setErrors) {
            setErrors(errors);
        }
    }, [values, initialValues, formIsValid, errors]);

    useEffect(() => {
        if (useWithDebounce) {
            const dataHasChanged = !isEqual(initialValues, formValues);
            if (dataHasChanged) {
                submitForm();
            }
        }
    }, [formValues]);

    return null;
};

export default FormSubmitStore;
