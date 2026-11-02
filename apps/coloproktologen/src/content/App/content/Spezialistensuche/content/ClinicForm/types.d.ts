import { ColoproktologenUser } from "@types";
import { Dispatch, SetStateAction } from "react";

export type ClinicFormProps = {
  setSelectClinic: Dispatch<SetStateAction<boolean>>;
};

export type DoctorData = {
  fachrichtung: string;
  klinikposition: string;
  belegklinik: string;
  tel: string;
  fax: string;
  email: string;
};

export type ClinicData = {
  objectId?: string;
  title: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  data: {
      strasse: string;
      plz: string;
      ort: string;
      tel: string;
      fax: string;
      email: string;
      homepage: string;
  }
};

export type ClinicDataProps = {
  clinicData: ClinicData;
  setClinicData: Dispatch<SetStateAction<ClinicData>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
};

export type DoctorDataProps = {
  doctorData: DoctorData;
  setDoctorData: Dispatch<SetStateAction<DoctorData>>;
  name: string;
};

export type PreviewProps = {
  doctorData: ColoproktologenUser;
  clinicData: ClinicData;
  setClinicData: Dispatch<SetStateAction<ClinicData>>;
};

export type FormSubmitStoreProps = {
  formValidationHandler?: (t: boolean) => void;
  useWithDebounce?: boolean;
  setErrors?: (errors: FormikErrors<FormikValues>) => void;
};
