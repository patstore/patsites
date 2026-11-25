import { colors } from "@/settings"

export const offerContainer = {
    borderRadius: "30px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: "300px",
    paddingBottom: "120px",
}

export const skillContainerHeadingWrapper = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translateY(-100px)",
    h2: {
        textAlign: "center",
    }
}

export const skillContainerHeading = {
    backgroundColor: colors.green,
    padding: '6px 12px',
    borderRadius: '10px',
    color: colors.dark,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0 auto',
    border: `0.9px solid ${colors.darkgrey}`,
    boxShadow: `12px 12px 0 0 #00000026`,
    display: 'inline-block',
    transform: 'rotate(3deg)',
    zIndex: 2,
    fontFamily: "Coco Sharp"
}