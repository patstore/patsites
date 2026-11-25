import { colors } from '@/settings'

export const aboutContainer = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: "120px",
    "h2": {
        fontSize: "72px",
        fontWeight: "bold",
        textShadow: `3px 3px 0 ${colors.green}`,
        textTransform: "uppercase"
    }
}

export const hiContainer = {
    fontSize: "48px",
    fontWeight: "bold",
    color: colors.darkgrey,
    backgroundColor: colors.blue,
    textAlign: "left",
    marginBottom: "24px",
    lineHeight: 1,
    top: "-90px",
    left: "50%",
    transfom: "translate(-50%, -50%)",
    position: "absolute",
    fontFamily: "Coco Sharp",
    "-webkit-text-stroke": `1.2px ${colors.darkgrey}`,
    border: `0.9px solid ${colors.darkgrey}`,
    padding: "12px",
    borderRadius: "12px",
    boxShadow: colors.shadow,
}

export const portraitContainer = {
    width: "300px",
    height: "300px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: colors.shadow,
    border: `0.9px solid ${colors.darkgrey}`,
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    position: "absolute",
    bottom: "0%",
    left: "0",
}