import { Button, FlexBox, SwitchButton } from "@ui";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import switch_buttons from "./constants/switch_buttons";
import SelectClinik from "./components/SelectClinik";
import { clinicFormContainer, switchButtonsContainer } from "./styles";
import ClinicData from "./components/ClinicData";
import DoctorData from "./components/DoctorData";
import { ClinicDataProps, ClinicFormProps, DoctorData as DoctorDataTypes } from "./types";
import Preview from "./components/Preview";
import { apiRequest, useSiteContext } from "@provider";
import { buttonsContainer } from "@styles";

const ClinicForm: React.FC<ClinicFormProps> = ({ setSelectClinic }) => {
    const { user, getUser } = useSiteContext();
    const [selectedClinic, setSelectedClinic] = useState<
    ClinicDataProps["clinicData"]
  >({
      title: "",
      description: "",
      coordinates: {
          latitude: 0,
          longitude: 0
      },
      data: {
          strasse: "",
          plz: "",
          ort: "",
          tel: "",
          fax: "",
          email: "",
          homepage: ""
      }
  });
    const [selectedButton, setSelectedButton] = useState<{
    value: string;
    label: string;
    disabled: boolean;
  }>(switch_buttons[0]);
    const [doctorData, setDoctorData] = useState<DoctorDataTypes>({
        fachrichtung: "",
        klinikposition: "",
        belegklinik: "",
        tel: "",
        fax: "",
        email: ""
    });
    const [isValid, setIsValid] = useState(true);
    useEffect(() => {
        if (user && user.data) {
            setDoctorData({
                fachrichtung: user.data?.bcd?.fachrichtung || "",
                klinikposition: user.data?.bcd?.klinikposition || "",
                belegklinik: user.data?.bcd?.belegklinik || "",
                tel: user.data?.bcd?.tel || "",
                fax: user.data?.bcd?.fax || "",
                email: user.data?.bcd?.email || ""
            });
        }
    }, [user]);

    const buttons = useMemo(() => {
        const switchButtons = switch_buttons.map((button, index) => ({
            value: button.value,
            label: button.label,
            disabled: index === 3 ? !isValid : false
        }));

        return switchButtons;
    }, [selectedClinic, isValid]);

    const buttonHandlers = useMemo(() => {
        const switchButtonIndex = switch_buttons.findIndex(
            (button) => button.value === selectedButton.value
        );

        return {
            switchButtonIndex,
            isLastIndex: switchButtonIndex === switch_buttons.length - 1
        };
    }, [selectedButton]);

    const saveAndCloseHandler = useCallback(async () => {
        if (!user) return;
        await apiRequest("/api/account/clinic", {
            locationId: selectedClinic.objectId,
            clinic: selectedClinic.objectId ? undefined : selectedClinic,
            doctorData
        });
        await getUser();
        setSelectClinic(false);
    }, [doctorData, getUser, selectedClinic, user]);

    if (!user) return null;

    return (
        <div css={clinicFormContainer}>
            <div css={switchButtonsContainer}>
                {buttons.map(
                    (button: { value: string; label: string; disabled: boolean }) => (
                        <SwitchButton
                            key={button.value}
                            state={selectedButton}
                            initialState={button}
                            text={button.label}
                            onClick={() => setSelectedButton(button)}
                            disabled={button.disabled}
                        />
                    )
                )}
            </div>
            <div
                css={{
                    flex: "1 1 0",
                    minHeight: 0,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {selectedButton.value === "doctor" && (
                    <DoctorData
                        doctorData={doctorData}
                        setDoctorData={setDoctorData}
                        name={user.label}
                    />
                )}
                {selectedButton.value === "clinic" && (
                    <SelectClinik
                        selectedClinic={selectedClinic}
                        setSelectedClinic={setSelectedClinic}
                    />
                )}
                {selectedButton.value === "clinic_data" && (
                    <ClinicData
                        clinicData={selectedClinic}
                        setClinicData={setSelectedClinic}
                        setIsValid={setIsValid}
                    />
                )}
                {selectedButton.value === "preview" && (
                    <Preview
                        doctorData={{ ...user }}
                        clinicData={selectedClinic}
                        setClinicData={setSelectedClinic}
                    />
                )}
            </div>
            <div css={{ flexShrink: 0 }}>
                <FlexBox
                    direction="row"
                    align="center"
                    justify="space-between"
                    hasFullWidth
                >
                    <Button
                        text="Abbrechen"
                        onClick={() => {
                            setSelectClinic(false);
                        }}
                        color="primary"
                        background="light"
                    ></Button>

                    <div css={buttonsContainer}>
                        <Button
                            text="zurück"
                            onClick={() =>
                                setSelectedButton(
                                    switch_buttons[buttonHandlers.switchButtonIndex - 1]
                                )
                            }
                            disabled={buttonHandlers.switchButtonIndex === 0}
                        />
                        <Button
                            text={
                                buttonHandlers.isLastIndex
                                    ? "Speichern und schließen"
                                    : "Weiter"
                            }
                            onClick={() => {
                                if (buttonHandlers.isLastIndex) {
                                    saveAndCloseHandler();
                                } else {
                                    setSelectedButton(
                                        switch_buttons[buttonHandlers.switchButtonIndex + 1]
                                    );
                                }
                            }}
                            disabled={
                                buttonHandlers.switchButtonIndex === 2 && !isValid
                                    ? !isValid
                                    : false
                            }
                        />
                    </div>
                </FlexBox>
            </div>
        </div>
    );
};

export default ClinicForm;
