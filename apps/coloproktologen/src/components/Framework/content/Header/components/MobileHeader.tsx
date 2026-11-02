import staticAsset0 from "../images/logo_bcd.webp";
import { Link } from "@router";
import { AppImage, FlexBox } from "@ui";
import React from "react";
import { headerMobileContainer } from "../styles";
import { motion } from "framer-motion";
import settings from "@settings";
const MobileHeader: React.FC<{ headerAnimate: string }> = ({
    headerAnimate
}) => {
    return (
        <header css={headerMobileContainer}>
            <FlexBox
                direction="row"
                align="center"
                justify="space-between"
                hasFullWidth
            >
                <motion.div
                    css={{
                        width: "auto",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "12px"
                    }}
                    style={{ originX: "0", originY: "50%" }}
                    animate={headerAnimate === "start" ? { scale: 1 } : { scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                >
                    <div
                        css={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: "auto",
                            marginBottom: "auto",
                            gap: settings.sizes.medium
                        }}
                    >
                        <Link
                            to="/"
                            css={{
                                overflow: "visible",
                                width: "2em",
                                height: "2em"
                            }}
                        >
                            <AppImage
                                src={staticAsset0} alt="Berufsverband Coloproktologie Deutschand e.V."
                                objectFit="cover"
                                width={42}
                            />
                        </Link>

                        <h1
                            css={{
                                marginLeft: "24px",
                                fontSize: ".66rem !important",
                                marginBottom: "0 !important",
                                fontWeight: 600
                            }}
                        >
                            Berufsverband Coloproktologie Deutschand e.V.                       
                        </h1>
                    </div>
                </motion.div>
            </FlexBox>
        </header>
    );
};

export default MobileHeader;
