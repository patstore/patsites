import { PageHeader } from "@components";
import { Link } from "@tanstack/react-router";

const Header = () => (
	<PageHeader
		eyebrow="Coming Home"
		title={
			<>
				Ankommen.
				<br /> Vertrauen.
				<br /> Geborgen Sein.
			</>
		}
		lead="Wir begleiten euch auf eurem Weg ins Elternsein."
	>
		<Link to="/team">
			<button>Lerne uns kennen</button>
		</Link>
	</PageHeader>
);

export default Header;
