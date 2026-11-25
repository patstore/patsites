import settings from "@settings";
import { Button, ContentContainer } from "@ui";
import React from "react";

const Hygiene: React.FC = () => {
	return (
		<ContentContainer
			id="empfehlungen-zur-hygiene"
			largeBackground={settings.colors.light}
		>
			<h2>Empfehlungen zur Hygiene</h2>
			<p>
				Herausgegeben vom Berufsverband Coloproktologie Deutschland
				(BCD) und der Deutschen Gesellschaft für Koloproktologie (DGK)
			</p>
			<p>
				<Button
					text="Leitfaden und Empfehlungen für die Hygiene in der
					Koloproktologie 2024 herunterladen"
					background={settings.colors.primary}
					color={settings.colors.white}
					size="medium"
					externalLink="https://www.coloproktologen.de/pdf/Hygieneleitfaden_BCD_2024.pdf"
				/>
				<br /> Quelle: coloproctology, 8. April 2024
			</p>
		</ContentContainer>
	);
};

export default Hygiene;
