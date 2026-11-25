import { colors } from "@/settings"

export const processContainer = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: "120px",
    paddingBottom: "120px",
}

export const processContainerHeadingWrapper = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    h2: {
        textAlign: "center",
        textTransform: "uppercase",
        textShadow: `3px 3px 0 ${colors.green}`,
    }
}

export const processContainerHeading = {
  
    zIndex: 2,
    fontFamily: "Coco Sharp",
    textShadow: `3px 3px 0 ${colors.red}`,
}

export const oneContainer = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
}

export const processNumberIndicator = {
    border: `0.9px dotted ${colors.darkgrey}`,
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
    color: colors.dark,
    backgroundColor: colors.white,
}