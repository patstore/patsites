import { AppImage, FlexBox } from "@ui";
import React from "react";
import { headerMobileContainer } from "../styles";
import { motion } from "framer-motion";
import settings from "@settings";
import { Link } from "@tanstack/react-router";
import logo from "../images/logo.webp";

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
                    animate={
                        headerAnimate === "start"
                            ? { scale: 1 }
                            : { scale: 0.8 }
                    }
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
                                src={logo}
                                alt="Deutsche Gesellschaft für Koloproktologie e.V."
                                objectFit="cover"
                                width={42}
                            />
                        </Link>

                        <h1
                            css={{
                                marginLeft: "24px",
                                fontSize: ".7rem !important",
                                marginBottom: "0 !important",
                                fontWeight: 600
                            }}
                        >
                            Deutsche Gesellschaft für Koloproktologie e.V.
                        </h1>
                    </div>
                </motion.div>
            </FlexBox>
        </header>
    );
};

export default MobileHeader;
