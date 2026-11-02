import React, { useCallback, useMemo, useState } from "react";
import { locationsContainer } from "../styles";
import { Button } from "@ui";
import { ClinicDataProps } from "../types";
import { useSiteContext } from "@provider";

const SelectClinik: React.FC<{
  selectedClinic: ClinicDataProps["clinicData"];
  setSelectedClinic: (selectedClinic: ClinicDataProps["clinicData"]) => void;
}> = ({ selectedClinic, setSelectedClinic }) => {
  const [search, setSearch] = useState<string>("");
  const { locations } = useSiteContext();
 

  const isSelected = useCallback(
    (objectId: string) => {
      return (selectedClinic as any)?.objectId === objectId;
    },
    [selectedClinic],
  );

  const filteredLocations = useMemo(() => {
    if (!search) {
      return locations;
    }
    return locations.filter((location: any) => {
      return location.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [locations, search]);

  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div css={{ flexShrink: 0 }}>
        <h3>Klinikwahl</h3>
        <p>
          Geben Sie den Namen Ihrer Klinik an. Falls die Klinik in der Liste
          erscheint, wählen Sie eine Klinik aus der Liste aus. Falls Ihr Kliniks
          nicht in der Liste ist, können Sie eine neue Klinik erstellen.
        </p>
        <input
          type="text"
          placeholder="Klinikname"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div
        css={[
          locationsContainer,
          { flex: "1 1 0", minHeight: 0, overflowY: "auto" },
        ]}
      >
        {filteredLocations?.map((location: any) => {
          if (!location.data) {
            return null;
          }
          return (
          <div key={location.objectId}>
            <div>
              <h4>{location.title}</h4>
              <p>
                {location.data.strasse} {location.data.hausnummer},{" "}
                {location.data.plz} {location.data.ort}
              </p>
            </div>
            <div>
              <Button
                text={
                  isSelected(location.objectId) ? "Ausgewählt" : "Auswählen"
                }
                size="medium"
                onClick={() => setSelectedClinic(location)}
              />
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default SelectClinik;
