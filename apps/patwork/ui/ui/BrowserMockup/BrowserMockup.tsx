import { useEffect, useState } from "react";
import {
    browser,
    circle,
    circles,
    container,
    contentContainer,
    topBar
} from "./styles";

export default function BrowserMockup({
    content,
    id,
    sizeKey = 800
}: {
    content: React.ReactNode;
    id: string;
    sizeKey?: number;
}) {
    useEffect(() => {
        const handleResize = () => {
            const element = document.getElementById(id);
            if (element) {
                const containerWidth = element.offsetWidth;
                const key = sizeKey / containerWidth;

                setSizes({
                    browserHeight: 500 / key,
                    browserWidth: 800 / key,
                    browserBorderRadius: 10 / key,
                    topBarHeight: 40 / key,
                    circleHeight: 12 / key,
                    circleWidth: 12 / key
                });
            } else if (sizeKey) {
                // If no element found, use the sizeKey directly
                const key = sizeKey / 800; // Assuming 800 is the default width
                setSizes({
                    browserHeight: 500 / key,
                    browserWidth: 800 / key,
                    browserBorderRadius: 10 / key,
                    topBarHeight: 40 / key,
                    circleHeight: 12 / key,
                    circleWidth: 12 / key
                });
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Call handler right away so state gets updated with initial element size

        return () => window.removeEventListener("resize", handleResize);
    }, [id, sizeKey]);

    const [sizes, setSizes] = useState({
        browserHeight: 500,
        browserWidth: 800,
        browserBorderRadius: 10,
        topBarHeight: 40,
        circleHeight: 12,
        circleWidth: 12
    });

    // const sizes = useMemo(() => {
    //         const containerWidth
    //       const key = 1;
    //       const browserHeight = 500 / key;
    //       const browserWidth = 800 / key;
    //       const browserBorderRadius = 10 / key;
    //       const topBarHeight = 40 / key;
    //       const circleHeight = 12 / key;
    //       const circleWidth = 12 / key;
    //       return {
    //          browserHeight,
    //          browserWidth,
    //          browserBorderRadius,
    //          topBarHeight,
    //          circleHeight,
    //          circleWidth
    //       }

    //    }, [])
    return (
        <div css={container}>
            {/* Browser Window */}
            <div
                css={browser(
                    sizes.browserHeight,
                    sizes.browserWidth,
                    sizes.browserBorderRadius
                )}
            >
                {/* Browser Top Bar */}
                <div css={topBar(sizes.topBarHeight)}>
                    <div css={circles}>
                        <div
                            css={circle(
                                "#EF4444",
                                sizes.circleHeight,
                                sizes.circleWidth
                            )}
                        ></div>
                        <div
                            css={circle(
                                "#FACC15",
                                sizes.circleHeight,
                                sizes.circleWidth
                            )}
                        ></div>
                        <div
                            css={circle(
                                "#22C55E",
                                sizes.circleHeight,
                                sizes.circleWidth
                            )}
                        ></div>
                    </div>
                </div>

                {/* Browser Content (Replace with your UI) */}
                <div css={contentContainer}>{content}</div>
            </div>
        </div>
    );
}
