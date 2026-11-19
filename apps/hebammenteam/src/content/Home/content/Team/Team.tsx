import TeamRoster from "../../../Team/roster/TeamRoster";

const Team = () => (
	<section aria-label="Team">
		<div className="content">
			<div className="eyebrow" style={{ gridColumn: "span 3" }}>
				Team
			</div>
			<div style={{ gridColumn: "span 3" }}>
				<h2>
					Ob große Fragen oder kleine Sorgen, wunderschöne erste
					Momente oder herausfordernde Tage – wir sind für euch da.
				</h2>
			</div>
			<div style={{ gridColumn: "span 3" }}>
				<TeamRoster />
			</div>
		</div>
	</section>
);

export default Team;
