import { WorkContent } from "../WorksContent";
import ScrollIndicator from "./components/ScrollIndicator";
import Title from "./components/Title";
import TitleCard from "./components/TitleCard";

const HeadContent = () => {
	return (
		<div className="head-container large">
			{/* <div className="head-content-container large"> */}
			<WorkContent />
			<div className="inner">
				<div className=" section-container-element w-100 row align-end justify-space-between">
					<Title />
					<TitleCard />
				</div>
			</div>
		</div>
	);
};

export default HeadContent;
