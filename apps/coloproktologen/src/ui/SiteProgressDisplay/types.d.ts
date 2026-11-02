export type SiteState = {
  value: string;
  label: string;
};

export type SiteProgressDisplayProps = {
  siteStates: SiteState[];
  currentState: SiteState;
};

export type SiteProgressElementProps = {
  isActive: boolean;
  number: number;
};

export type HorizontalLineProps = {
  isActive: boolean;
};
