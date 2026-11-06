import { Button, SlideIn } from "@ui";
import React, { ReactNode, useMemo, useState } from "react";
import { topline } from "@styles";
import { getDateString, getRecordFileUrl, renderDownloadLinks, useCollection } from "@provider";
import type { PatstoreDownload } from "@types";
import { isArray } from "lodash-es";
import { infoContainer } from "../styles";
import sanitizeHtml from 'sanitize-html';


const MitgliederInfoNews: React.FC<{
  title: string;
  text: string;
  description: string;
  date: string;
  categories: string[];
  documents: string[];
  isEmail?: boolean;
  content?: ReactNode
}> = ({ title, text, description, date, categories, documents, isEmail, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { find: findDownload } = useCollection<PatstoreDownload>("Download");

  const newsContent = useMemo(() => {
    if (isEmail && content) {
      return (
        <div className="content-preview">
          <div className="content-preview-body">
					<div className="web-preview">
						<div className="web-preview-container"></div>
							{content}
						</div>
					</div>
				</div>
      );
    } 

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: text }} />
        {isArray(documents) &&
          documents.map((document) => (
            <p>
              {renderDownloadLinks({
                title: findDownload(document)?.title,
                link: getRecordFileUrl(findDownload(document)),
              })}
            </p>
          ))}
      </div>
    );
  }, [title, text, documents]);
  
  return (
    <>
      <div css={infoContainer}>
        {date && <div css={topline}>{getDateString(date).date}</div>}
        <h3>{title}</h3>
        <p>{description}</p>
        <Button
          text="Mehr erfahren"
          onClick={() => setIsOpen(true)}
          color="white"
        />
      </div>
      <SlideIn open={isOpen} width={isEmail ? "medium" : "small"} cancelButtonHandler={() => setIsOpen(false)}>
        {newsContent}
      </SlideIn>
    </>
  );
};

export default MitgliederInfoNews;
