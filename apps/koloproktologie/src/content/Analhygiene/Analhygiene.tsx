import { Layout } from "@components";
import { ContentContainer, HeadContent } from "@ui";
import React from "react";

const Analhygiene: React.FC = () => {
    return (
        <Layout showKongress={false}>
            <HeadContent
                title="Wundpflege"
                isInline
            />
            <ContentContainer noPaddingTop>
                <video
                    controls
                    src="/videos/BCD_Wundpflege_Video.mp4"
                    style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%"
                    }}
                />
            </ContentContainer>
        </Layout>
    );
};

export default Analhygiene;
