import React from "react";
import { Link } from "@tanstack/react-router";
import { Layout } from "@components";
import Information from "../../components/SportSlideIn/components/Information";
import type { PatstoreGroup } from "@types";

/** Stand-alone page of one training group; the same content the calendar slide-in shows. */
const Gruppe: React.FC<{ group: PatstoreGroup }> = ({ group }) => (
	<Layout>
		<div className="wrapper">
			<div className="site-container">
				<Link to="/sportangebot">← Zum Sportangebot</Link>
				<Information
					email=""
					startalter={group.data?.start_age}
					endalter={group.data?.end_age}
					beschreibung={group.text || group.data?.description}
					titel={group.title || ""}
					trainingszeiten={group.times}
					info={group.description || ""}
					trainer={group.persons}
				/>
			</div>
		</div>
	</Layout>
);

export default Gruppe;
