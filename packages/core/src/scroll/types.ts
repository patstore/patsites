export type ScrollOrientation = "vertical" | "horizontal";

export type ScrollSnapshot = {
  scroll: number;
  limit: number;
  velocity: number;
  direction: number;
  progress: number;
};

export type ScrollToOptions = {
  immediate?: boolean;
  lock?: boolean;
  duration?: number;
  easing?: (time: number) => number;
  force?: boolean;
  programmatic?: boolean;
};

export const EMPTY_SCROLL: ScrollSnapshot = {
  scroll: 0,
  limit: 0,
  velocity: 0,
  direction: 0,
  progress: 0,
};
