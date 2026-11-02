"use client";

import React, { useState } from "react";
import "./ContentPreview.scss";
import { ContentPreviewProps } from "./types";
import { Button, ContentBox, FlexBox, Label, SlideIn } from "@ui";
import { transformToWeb } from "./functions";
import Attachments from "./components/Attachments";
import { buttonsContainer, contentBox, topline } from "@styles";
import settings from "@settings";
import { getDateString } from "@provider";

export const infoContainer = settings.mq({
	width: "100%",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "30px 15px",
	borderBottom: `0.6px solid ${settings.colors.grey}`,
	gap: 0,
  });
  

const ContentPreview: React.FC<ContentPreviewProps> = ({
	title,
	date,
	content,
	attachments,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<>
		 <div css={infoContainer}>
			<div>
				{date && <div css={topline}>{getDateString(date).date}</div>}
				<h3>{title}</h3>
			</div>
			{/* <p>{description}</p> */}
			<Button
			text="Öffnen"
			onClick={() => setOpen(true)}
			color="white"
			/>
      </div>
		
		<SlideIn
			open={open}
			cancelButtonHandler={() => setOpen(false)}
			width="medium"
			hasNoOverflow={false}
		>
			<div className="content-preview">
				{attachments?.length ? <Attachments attachments={attachments} /> : null}
				<div className="content-preview-body">
					<div className="web-preview">
						<div className="web-preview-container">
							{transformToWeb(content)}
						</div>
					</div>
				</div>
			</div>
		</SlideIn>
		</>
	);
};

export default ContentPreview;
