import { PageHeader } from "@components";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const Header = () => (
	<PageHeader
		eyebrow="Willkommen bei Coming Home"
		title={<>Wir sind für euch da</>}
		lead="Und begleiten euch auf eurem Weg ins Elternsein."
	>
		<div className="separator large"></div>
		<div className="flex row gap-md">
			<Link to="/team">
				<button className="with-icon">
					Lerne uns kennen
					<div className="icon">
						<ChevronRight strokeWidth={1} />
					</div>
				</button>
			</Link>
			<Link to="/leistungen">
				<button className="with-icon inverted">
					Unsere Leistungen
					<div className="icon">
						<ChevronRight strokeWidth={1} />
					</div>
				</button>
			</Link>
		</div>
	</PageHeader>
);

export default Header;
