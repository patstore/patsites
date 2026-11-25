import { AnimateContent, AnimateText } from "@/animations";

const Title = () => {
    return (
        <>
            <h1 className="large">
                <AnimateText>Ausruckvolle Webseiten &</AnimateText>
                {/* <AnimateText delay={0.1}>Webseiten &</AnimateText> */}

                <AnimateText delay={0.2}>Starke Weblösungen</AnimateText>
                {/* <AnimateText delay={0.3}>Weblösungen</AnimateText> */}
            </h1>
            {/* <p className="center large"> Hallo</p> */}
           
        </>
    );
};

export default Title;
