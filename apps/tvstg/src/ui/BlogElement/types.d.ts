export type BlogElementProps = {
  type: "tile" | "header";
  title: Maybe<string>;
  categories: Maybe<string[]>;
  image: Maybe<string>;
  date: Maybe<string>;
  flex?: string[];
};
