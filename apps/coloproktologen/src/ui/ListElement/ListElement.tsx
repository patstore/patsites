import React from "react";
import {
  listContainer,
  listElementContainer,
  listElementContent,
} from "./styles";
import { ListElementProps } from "./types";

const ListElement: React.FC<ListElementProps> = ({
  title,
  description,
  listItems,
}) => {
  return (
    <div css={listElementContainer}>
      <div css={listElementContent}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      <ul css={listContainer}>
        {listItems.map((item) => (
          <li key={item.title}>
            <h4>{item.title}</h4>
            {item.description && <p>{item.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListElement;
