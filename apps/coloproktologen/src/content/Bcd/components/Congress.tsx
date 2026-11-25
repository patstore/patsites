import { getCurrentEvents, useFindImages, useCollection } from "@provider";
import type { EventClass } from "@types";
import settings from "@settings";
import { buttonsContainer, topline } from "@styles";
import { Button, ContentContainer, Gallery } from "@ui";
import React from "react";

const Congress: React.FC = () => {
	const { items: events } = useCollection<EventClass>("Event");
	const currentEvents = getCurrentEvents(events);
	const { findImage } = useFindImages();

	if (!currentEvents?.upcoming) {
		return null;
	}

	return (
		<ContentContainer largeBackground={settings.colors.light}>
			<div>
				<div css={topline}>Kongressrückblicke</div>
				<h2>{currentEvents?.current?.title}</h2>
				<Gallery
					imageIds={currentEvents?.current?.gallery || []}
					findImage={findImage}
					displayMode="mosaic"
				/>

				<div css={buttonsContainer}>
					<Button
						text="Ältere Kongressrückblicke"
						internalLink="/kongressrueckblicke"
					/>
					<Button text="Kongressbericht" onClick={() => {}} />
				</div>
			</div>
		</ContentContainer>
	);
};

export default Congress;
