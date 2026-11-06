import { useFindImages, useCollection } from "@provider";
import settings from "@settings";
import { contentBox, topline } from "@styles";
import { AppImage, ContentContainer, Divider, FlexBox } from "@ui";
import React from "react";
import { PatstorePerson } from "@types";

type PersonCardProps = {
  person: PatstorePerson;
};

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const { findImage } = useFindImages();

  return (
    <FlexBox
      direction="column"
      align="stretch"
      justify="center"
      hasFullWidth
      styles={{
        overflow: "hidden",
        maxWidth: "240px",
      }}
    >
      <div>
        {person.image && person.title && (
          <AppImage
            src={findImage(person?.image)}
            alt={person.title}
            objectPosition="top"
            css={{
              width: "240px",
              height: "300px",
              borderRadius: settings.borderRadius.large,
            }}
          />
        )}
      </div>
      <div
        css={{
          padding: settings.padding.small,
          height: "auto",
          transform: "translateY(18px)",
          borderRadius: settings.borderRadius.large,
          p: {
            fontSize: settings.fontSize.small,
          },
          a: {
            fontSize: settings.fontSize.small,
          },
        }}
      >
        <h4>{person.title}</h4>
        <h5>{person.description}</h5>
        {person.text && (
          <div dangerouslySetInnerHTML={{ __html: person.text }} />
        )}
      </div>
    </FlexBox>
  );
};

const Committee: React.FC = () => {
  const { items: persons } = useCollection<PatstorePerson>("Person");
  const sortedPersons = persons.sort((a, b) => (a?.data?.order || 0) - (b?.data?.order || 0));

  return (
    <>
      <ContentContainer id="vorstand" largeBackground={settings.colors.white}>
        {/* <div css={{ flex: "1 1 50%" }}>
                        <h2>Der Vorstand</h2>
                        <p>
                            Vertreter interdisziplinärer Fachrichtungen bilden
                            den Vorstand. So ist sichergestellt, dass alle
                            wesentlichen Tätigkeiten des Verbands im Sinne
                            unserer Mitglieder geführt und gelenkt werden.
                        </p>
                        <p>
                            Der Vorstand besteht aus dem 1. und 2. Vorsitzenden,
                            dem Kassenwart sowie 1. und 2. Schriftführer. Er
                            wird von der Mitgliederversammlung für die Dauer von
                            2 Jahren gewählt.
                        </p>
                        <p>
                            Dr. Daniel Sterzing, Prof. Dr. Dieter Bussen, Dr.
                            Claudia Breitkopf, Prof. Dr. Heiner Krammer, Prof.
                            Dr. A. Fürst
                        </p>
                    </div> */}
        <div
          css={{
            width: "100%",
          }}
        >
          <FlexBox
            direction="column"
            align="center"
            justify="center"
            hasFullWidth
          >
            <FlexBox
              direction="column"
              align="center"
              justify="center"
              hasFullWidth
            >
              <div css={topline}>Lernen Sie uns kennen</div>
              <h2>Vorstandsmitglieder im Portrait</h2>
              <p css={{ textAlign: "center" }}>
                Gerichtlich und außergerichtlich wird der Verein durch den
                Ersten Vorsitzenden und dem Zweiten Vorsitzenden jeweils einzeln
                vertreten.
              </p>
            </FlexBox>
            <Divider />
            <div
              css={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                rowGap: "60px",
                columnGap: "30px",
              }}
            >
              {sortedPersons?.map((person) => (
                <PersonCard key={person.objectId} person={person} />
              ))}
            </div>
          </FlexBox>
        </div>
      </ContentContainer>
      <ContentContainer>
        <FlexBox
          direction="row"
          align="stretch"
          justify="center"
          hasFullWidth
          changeToColumn
          gap={settings.sizes.large}
        >
          <div css={contentBox()}>
            <h3>Der Beirat</h3>
            <p>
              Der Vorstand beruft aus der Zahl der Mitglieder einen Beirat, der
              ihn in seiner Arbeit unterstützt. Er äußert sich zu allen Fragen
              und ist ehrenamtlich tätig.
            </p>
            <p>
              Derzeit widmen sich 9 Fachärzte aus unterschiedlichen
              Fachrichtungen den fachlichen und berufspolitischen Aufgaben.
            </p>
          </div>
          <div css={contentBox()}>
            <h3>Beiratsmitglieder</h3>
            <p>
              Dr. Pascal Geers; Hannover
              <br /> Dr. Felix Hemminger; München
              <br /> Dr. Thorsten Jacobi; Dresden
              <br /> Prof. Dr. Volker Kahlke; Kiel
              <br /> Dr. Nils Krakow; Heidelberg
              <br /> Dr. Ute Lehmann; Koblenz
              <br /> Dr. Andreas Ommer; Essen
              <br /> Dr. Sandra Sauer; Berlin
              <br /> Prof. Dr. Oliver Schwandner; Regensburg
              <br />
            </p>
          </div>
        </FlexBox>
      </ContentContainer>
    </>
  );
};

export default Committee;
