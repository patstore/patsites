import { SpecialistUser } from "../../types";

export type SpecialistLocationProps = {
  title: string;
  distance: string;
  description?: string;
  email?: string;
  fax?: string;
  homepage?: string;
  kompetenzzentrum?: "P" | "K" | null;
  land: string;
  ort: string;
  plz: number;
  strasse: string;
  tel: string;
  specialists: SpecialistUser[];
  lat?: number;
  lng?: number;
};

export type SpecialistProps = {
  title?: string;
  address?: string;
  name: string;
  description?: string;
  email?: string;
  tel?: string;
  specialist?: boolean;
};
