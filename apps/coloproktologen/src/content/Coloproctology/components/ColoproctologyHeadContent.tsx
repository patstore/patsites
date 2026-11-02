import settings from "@settings";
import { Button, FlexBox } from "@ui";
import React from "react";

const ColoproctologyHeadContent: React.FC = () => {
  return (
    <FlexBox direction="row" gap={settings.sizes.small}>
      <div>
        <a
          href="https://www.springermedizin.de/coloproctology/7925988"
          target="_blank"
          rel="noreferrer"
        >
          <Button text="Übersicht" />
        </a>
      </div>
      <div>
        <a
          href="https://www.springermedizin.de/archive/journal/53"
          target="_blank"
          rel="noreferrer"
        >
          <Button text="Alle Ausgaben" />
        </a>
      </div>
    </FlexBox>
  );
};

export default ColoproctologyHeadContent;
