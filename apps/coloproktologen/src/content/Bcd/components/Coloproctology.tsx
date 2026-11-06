import { contentBox, topline } from "@styles";
import { Button, ContentContainer, Divider, FlexBox, MultiContentDisplay } from "@ui";
import React, { useEffect, useState } from "react";
import coloproctology_content from "../constants/coloproctology_content";
import settings from "@settings";

const Coloproctology: React.FC<{color?: "light" | "white"}> = ({color = "light"}) => {
  const [rssData, setRssData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/rss", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => data.json()).then(setRssData);
  }, []);

  return (
    <ContentContainer 
      id="coloproctology" 
      largeBackground={color === "white" ? settings.colors.light : settings.colors.white}
    >
      <FlexBox
        direction="column"
        align="stretch"
        gap={settings.sizes.medium}
        hasFullWidth
        styles={{
          marginTop: "42px"
        }}
      >
        <FlexBox
          direction="row"
          align="center"
          justify="space-between"
          gap={settings.sizes.medium}
        >
          <div css={{ flex: 1 }}>
            <img
              src={rssData?.items[0]?.enclosure?.url}
              alt="Coloproctology"
              width={210}
            />
          </div>
          <div css={[contentBox("1"), { flex: 1, 
            
            backgroundColor: settings.colors.white }]}>
            <div css={topline}>Verbandsorgan</div>
            <h2> Coloproctology</h2>
            <p>
              Die interdisziplinäre Zeitschrift coloproctology ist für alle
              proktologisch tätigen Ärzte/Ärztinnen zur Fort- und Weiterbildung
              unentbehrlich. Die Zeitschrift deckt das gesamte Spektrum der
              Koloproktologie ab. 
            </p>
              <p>Mitglieder erhalten die Zeitschrift kostenfrei.</p>
              <div className="button-container">
                <Button
                  background={settings.colors.primary}
                  text="Coloproctology online lesen"
                  externalLink="https://www.springermedizin.de/coloproctology/7925988?utm_medium=gesellschaftswebsite&utm_source=bcd&utm_campaign=regmar_society"
                >
                  
                </Button>
                <Button 
                color={settings.colors.primary}
                  background={settings.colors.light}
                  text="Support bei Login und Registrierung"
                  externalLink="mailto:sabine.ruepke@springer.com"
                >
                  
                </Button>
              </div>
          </div>
        </FlexBox>
        <Divider />
        <div css={{ width: "100%" }}>
          <MultiContentDisplay
            content={coloproctology_content}
            contentHeight="500px"
            direction="vertical"
            color={color}
          />
        </div>
      </FlexBox>
    </ContentContainer>
  );
};

export default Coloproctology;
