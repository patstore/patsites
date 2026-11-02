import settings from "@settings";
import { Button, FlexBox } from "@ui";
import React from "react";

const ManualHeadContent: React.FC = () => {
    return (
        <FlexBox
            direction="row"
            gap={settings.sizes.large}
            align="center"
            justify="space-between"
        >
            <div>
                <Button
                    text="Band 1 herunterladen"
                    externalLink="https://www.degruyterbrill.com/document/doi/10.1515/9783111331270/html"
                />
            </div>
            <div>
                <Button
                    text="Band 2 herunterladen"
                    externalLink="https://www.degruyterbrill.com/document/doi/10.1515/9783111253237/html"
                />
            </div>
        </FlexBox>
    );
};

export default ManualHeadContent;
