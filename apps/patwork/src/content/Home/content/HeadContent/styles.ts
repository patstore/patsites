import { colors } from "@/settings";

export const headContentContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    height: "100vh",
}

export const titleCard = {
    padding: '18px',
    backgroundColor: colors.yellow,
    fontSize: '24px',
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    margin: '0 auto',
    // borderRadius: '10px',
    // border: `0.9px solid ${colors.darkgrey}`,
    boxShadow: `${colors.shadow}`,
    transform: 'rotate(-3deg)',
    zIndex: 2,
    fontFamily: "Coco Sharp"

}

export const rowBlock = { 
    flex: 1,
    borderBottom: `0.9px solid ${colors.darkgrey}`, 
    borderTop: `0.9px solid ${colors.darkgrey}`,
    height: "auto", 
    overflow: "hidden", 
    display: "flex", 
    flexDirection: "row", 
    alignItems: "stretch", 
    justifyContent: "flex-start", 
    maxHeight: "calc(100vh - 60px)"
}

export const rowBlockTwo = { 
    borderBottom: `0.9px solid ${colors.darkgrey}`, 
    borderTop: `0.9px solid ${colors.darkgrey}`,
    height: "auto", 
    minHeight: "660px", 
    overflow: "hidden", 
    display: "flex", 
    flexDirection: "row", 
    alignItems: "stretch", 
    justifyContent: "flex-start", 
    marginTop: "60px", 
    gap: "36px"
}

export const patworkContainer = {
    fontSize: "calc(20px + 15vw)",
    lineHeight: 1,
    paddingTop: "24px",
    paddingBottom: "24px",
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    margin: "0 auto",
    fontFamily: "Coco Sharp",
    backgroundColor: colors.dark,
}