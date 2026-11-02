import { Dispatch, SetStateAction } from "react";

export type SpecialistType = {
  id: string;
  anrede: string;
  titel: string;
  vorname: string;
  nachname: string;
  mitgliedschaft: string;
  fachrichtung: string;
  klinikposition: string;
  belegklinik: string;
  tel: string;
  fax: string;
  email: string;
  homepage: string | null;
  spezialist: string | null;
  praxis: string;
  LAST_MODIFIED: string;
  praxisid: string;
  strasse: string;
  plz: string;
  ort: string;
  name: string;
  name_2: string;
  name_3: string;
  vorwahl: string;
  praxistel: string;
  praxisfax: string;
  praxisemail: string;
  praxishomepage: string;
  latitude: string;
  longitude: string;
  kompetenzzentrum: string | null;
  distance: string;
};

export type SearchFieldsProps = {
  setLocations: Dispatch<SetStateAction<SearchSpecialistResult>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
};

interface SpecialistUser {
  id: string;
  title?: string;
  pre_title?: string;
  post_title?: string;
  name: string;
  address?: string;
  last_name: string;
  email?: string;
  description: string;
  data: any;
}

interface SpecialistLocation {
  id: string;
  description?: string;
  latitude: number;
  longitude: number;
  title: string;
  users: SpecialistUser[];
  data: any;
  distance: string;
  distance_int: number;
}

type SearchSpecialistResult = SpecialistLocation[];

export type FilterButtonsProps = {
  filter: { value: string; label: string };
  setFilter: Dispatch<SetStateAction<{ value: string; label: string }>>;
};

export type SpecialistsHeaderProps = {
  highlightedLocation: SearchSpecialistResult[number] | undefined;
  setHighlightedLocation: Dispatch<
    SetStateAction<SearchSpecialistResult[number] | undefined>
  >;
  locations: SearchSpecialistResult;
};
