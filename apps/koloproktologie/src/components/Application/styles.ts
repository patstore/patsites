import settings from "@settings";
import { StylesConfig } from "react-select";

export const formContainer = settings.mq({
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    overflow: "hidden",
    gap: 0,
    form: {
        flex: 1,
        minHeight: "0",
        overflowY: "auto"
    }
});

export const formHeader = settings.mq({
    flexShrink: 0,
    h2: {
        marginTop: `0 !important`
    }
});

export const formFooter = settings.mq({
    paddingTop: settings.sizes.large,
    flexShrink: "0"
});

export const radioOrCheckboxfieldContainer = settings.mq({
    display: "flex",
    flexDirection: ["row"],
    alignItems: ["flex-start"],
    justifyContent: "flex-start",
    gap: "12px",
    width: ["100%", "100%", "auto"],
    label: {
        padding: 0,
        margin: 0,
        marginTop: "0 !important"
    }
});

export const fieldContainer = settings.mq({
    display: "flex",
    flexDirection: ["column", "column", "row"],
    alignItems: ["flex-start", "flex-start", "center"],
    justifyContent: "flex-start",
    gap: "12px",
    width: ["100%", "100%", "auto"],
    label: {
        padding: 0,
        margin: 0,
        marginTop: ["24px !important", "24px !important", "0 !important"]
    }
});

export const formContentContainer = settings.mq({
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: ["24px", "24px", "30px"]
});

export const formFieldsContainer = settings.mq({
    display: "flex",
    flexDirection: ["column", "column", "row"],
    alignItems: "flex-start",
    gap: "12px"
});

export const reactSelectStyles: StylesConfig = {
    control: (provided) => ({
        ...provided,
        minHeight: "24px",
        height: "24px",
        borderColor: "#e5e7eb",
        borderRadius: "4px",
        boxShadow: "none",
        color: "#000",
        fontFamily: "inherit",
        fontSize: "12px",
        lineHeight: "1",
        padding: "0 15px",
        transition: "all 0.2s ease-in-out",
        width: "240px",
        marginBottom: "3px"
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: "100%",
        fontSize: "12px",
        lineHeight: "1",
        padding: "0"
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 999,
        fontSize: "12px"
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: "12px"
    })
};
