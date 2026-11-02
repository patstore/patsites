import React from "react";
import { MembershipItem } from "../types";
import { Button, FlexBox, Label } from "@ui";
import settings from "@settings";
import { memberHighlightContent } from "../styles";

const Protocol: React.FC<{ protocol: MembershipItem; label: string }> = ({
    protocol,
    label
}) => {
    return (
        <div css={memberHighlightContent}>
            <FlexBox
                direction="column"
                justify="space-between"
                align="flex-start"
                gap={settings.sizes.medium}
            >
                <div>
                    <Label
                        text={label}
                        background={settings.colors.white}
                    />
                    <h4>{protocol.label}</h4>
                </div>
                <Button
                    size="medium"
                    text="Download"
                    background={settings.colors.primary}
                    externalLink={protocol.file.url}
                />
            </FlexBox>
        </div>
    );
};

export default Protocol;
