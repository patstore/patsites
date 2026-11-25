import { borderRadius, colors } from "@/settings"

export const worksContainer = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: "800px",
    paddingBottom: "120px",
    maxWidth: "1040px",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "visible",

}

export const worksContainerHeadingWrapper = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "visible",
    "h2": {
        textAlign: "left",
    }
}

export const worksContainerHeading = {
    fontFamily: "Coco Sharp",
    fontSize: "72px",
    fontWeight: 800,
    color: colors.dark,
    textTransform: "uppercase",
    textShadow: `3px 3px 0 ${colors.red}`,
}

export const worksList = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
}

export const worksSliderViewport = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    marginTop: "48px",
    // backgroundColor: "#F3ECD2",
    borderRadius: "24px",
    padding: "24px"
}

export const worksListButtonContainer = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    maxWidth: "420px",
    marginTop: "48px",
}

export const workContainer = {
    width: "480px",
    height: "320px",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    position: "relative",
    border: `0.9px solid ${colors.darkgrey}`,
    boxShadow: colors.shadow,
    borderRadius: "12px",
    overflow: "hidden",
}

export const workContentContainer = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
    padding: "18px",
    "p": {
        fontSize: "18px",
    }
}

export const workImageContainer = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    "img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    }
}