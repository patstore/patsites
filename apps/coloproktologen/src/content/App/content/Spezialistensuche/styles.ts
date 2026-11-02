import { css } from "@emotion/react";
import settings from "@settings";

export const spezialistensucheContentContainer = css({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: "30px",
  padding: settings.padding.medium,
  backgroundColor: settings.colors.lightgrey,
  borderRadius: settings.sizes.large,
});

export const formContainer = css({
  width: "100%",
  "& form": {
    width: "100%",
  },
  "& label": {
    display: "block",
    marginBottom: "8px",
    fontWeight: 500,
    color: settings.colors.dark,
  },
  "& input, & select, & textarea": {
    width: "100%",
    padding: "10px 15px",
    border: `1px solid ${settings.colors.grey}`,
    borderRadius: settings.sizes.small,
    fontSize: "16px",
    fontFamily: "Raleway, sans-serif",
    backgroundColor: settings.colors.white,
    transition: "border-color 0.3s ease",
    "&:focus": {
      outline: "none",
      borderColor: settings.colors.primary,
    },
    "&:disabled": {
      backgroundColor: settings.colors.lightgrey,
      cursor: "not-allowed",
      opacity: 0.7,
    },
  },
  "& select": {
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "20px",
    paddingRight: "40px",
  },
});

export const formRow = css({
  display: "flex",
  flexDirection: "row",
  gap: "30px",
  width: "100%",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

export const formColumn = css({
  flex: "1 1 50%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const formField = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const formError = css({
  color: "#dc3545",
  fontSize: "14px",
  marginTop: "5px",
  minHeight: "20px",
});

export const formSection = css({
  marginBottom: "30px",
  "& h3": {
    marginTop: 0,
    marginBottom: "20px",
    color: settings.colors.primary,
    fontSize: "24px",
    fontWeight: 600,
  },
});

export const infoText = css({
  fontSize: "14px",
  color: settings.colors.dark,
  margin: "10px 0",
  lineHeight: 1.5,
  "& small": {
    fontSize: "12px",
    color: "#666",
  },
  "& a": {
    color: settings.colors.primary,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const buttonContainer = css({
  display: "flex",
  flexDirection: "row",
  gap: "15px",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "30px",
});

export const specialistIcon = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  "& img": {
    height: "22px",
    width: "22px",
  },
});
