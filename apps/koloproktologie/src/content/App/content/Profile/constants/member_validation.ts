import * as Yup from "yup";

const memberValidationSchema = Yup.object().shape({
    accept_search: Yup.boolean().oneOf(
        [true, false],
        "Bitte wählen Sie eine Mitgliedschaft"
    ),
    title: Yup.string().optional(),
    name: Yup.string().when("accept_search", {
        is: true,
        then: () => Yup.string().required("Name ist erforderlich"),
        otherwise: () => Yup.string().optional()
    }),
    postal_code: Yup.string().when("accept_search", {
        is: true,
        then: () => Yup.string().required("PLZ ist erforderlich"),
        otherwise: () => Yup.string().optional()
    }),
    city: Yup.string().when("accept_search", {
        is: true,
        then: () => Yup.string().required("Ort ist erforderlich"),
        otherwise: () => Yup.string().optional()
    }),
    country: Yup.string().when("accept_search", {
        is: true,
        then: () => Yup.string().required("Land ist erforderlich"),
        otherwise: () => Yup.string().optional()
    })
});

export default memberValidationSchema;
