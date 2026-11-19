const Welcome = () => {
	return (
		<section aria-label="Wilkommen">
			<div className="content padding-md border-radius-full">
				<div style={{ gridColumn: "span 3" }}>
					<h2 className="left">Schön dass ihr hier seid!</h2>
				</div>

				<div style={{ gridColumn: "1 /span 1", gridRow: "2 / span 3" }}>
					<img
						src="/schwangere_2.png"
						alt="Schwangere"
						style={{
							width: "auto",
							height: "600px",
							objectFit: "cover",
							borderRadius: "12px",
							boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
						}}
					/>
				</div>

				<div style={{ gridColumn: "2 / span 2" }}>
					<h3>
						Wir sind Coming Home – ein Hebammenteam aus Freiburg,
						das Familien auf einem ganz besonderen Weg begleiten
						darf.
					</h3>
				</div>
				<div style={{ gridColumn: "2 / span 1" }}>
					<p>
						Die Zeit rund um Schwangerschaft, Geburt und Wochenbett
						ist einzigartig. Sie bringt Vorfreude, Glück und
						manchmal auch Unsicherheit mit sich. Wir möchten euch in
						dieser besonderen Lebensphase einen verlässlichen Anker
						bieten: mit unserem Wissen, unserer Erfahrung und vor
						allem mit viel Herz und Verständnis für eure
						individuellen Bedürfnisse.
					</p>
					<p>
						Dabei steht ihr als Familie für uns im Mittelpunkt. Wir
						möchten euch stärken, Vertrauen in euch und euren
						eigenen Weg entwickeln und euch dabei unterstützen, gut
						in eure neue Rolle hineinzuwachsen.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Welcome;
