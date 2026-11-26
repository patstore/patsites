import { AnimateContent, AnimateText } from "@/animations";

const Title = () => {
	return (
		<div style={{ flex: 1 }}>
			<h1 className="large uppercase">
				<AnimateText>Patwork</AnimateText>
				{/* <AnimateText delay={0.1}>Webseiten &</AnimateText> */}

				<AnimateText delay={0.2}>Studio</AnimateText>
				{/* <AnimateText delay={0.3}>Weblösungen</AnimateText> */}
			</h1>
			{/* <p className="center large"> Hallo</p> */}
		</div>
	);
};

export default Title;
