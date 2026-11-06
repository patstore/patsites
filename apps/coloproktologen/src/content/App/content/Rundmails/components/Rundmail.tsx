import React, { useCallback, useMemo } from "react";
import { topline } from "@styles";
import { getDateString, renderDownloadLinks } from "@provider";
import { isArray } from "lodash-es";
import { infoContainer } from "../styles";
import { useQuery } from "@apollo/client/react";
import { generateQuery, sanitizeGraphQlNode } from "@provider";
const Rundmail: React.FC<{
  title: string;
  text: string;
  description: string;
  date: string;
  categories: string[];
  documents: string[];
}> = ({ title, text, description, date, categories, documents }) => {
  const { data: downloads } = useQuery(
    generateQuery({
      type: "find",
      objectName: "Download",
      queryName: "downloads",
      fields: ["objectId", "title", "file {name url}"],
    }),
    {
      variables: { params: { project: { have: {id : { equalTo: "JRxDkaxCoI" } } }, objectId: { in: documents } } },
    }
  );

 const documentsArray = useMemo(() => {
    const nws: Array<{ title?: string; file?: { url?: string } }> =
        downloads?.downloads?.edges.map((edge: any) => sanitizeGraphQlNode(edge.node)) || [];
   console.log(nws);
    return nws || [];
}, [downloads]);

  return (
    <>
      <div css={infoContainer}>
        {date && <div css={topline}>{getDateString(date).date}</div>}
        <h3>{title}</h3>
        <p>{description}</p>
        {isArray(documentsArray) &&
          documentsArray.map((document) => (
            <p>
              {renderDownloadLinks({
                title: document.title,
                link: document?.file?.url || "",
              })}
            </p>
          ))}
      </div>
    </>
  );
};

export default Rundmail;
