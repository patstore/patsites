import React from "react";
import { ListElementProps } from "../types";
import { listElementContainer } from "../styles";
import { Circle, CircleCheck } from "lucide-react";
import settings from "@settings";

const ListElement: React.FC<ListElementProps> = ({
  element,
  isSelected,
  onSelect,
}) => {
  return (
    <>
      <button
        css={listElementContainer}
        data-selected={isSelected}
        onClick={() => onSelect(element)}
        disabled={element.disabled || false}
        type="button"
      >
        <div>
          {isSelected ? (
            <CircleCheck
              width={18}
              height={18}
              strokeWidth={1.8}
              color={"green"}
            />
          ) : (
            <Circle
              width={18}
              height={18}
              strokeWidth={1.8}
              color={settings.colors.grey}
            />
          )}
        </div>
        {element.element ? element.element : <span>{element.label}</span>}
      </button>
    </>
  );
};

export default ListElement;
