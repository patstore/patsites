import { divider } from "./styles";
import settings from "@settings";

const Divider = ({ showLine = false }) => {
  return (
    <div
      css={[
        divider,
        { backgroundColor: showLine ? settings.colors.dark : "transparent" },
      ]}
    />
  );
};

export default Divider;
