import workElements from "../constants/work_elements"
import WorkElementContent from "./WorkElementContent"

const AboutContentTwo = () => {
  return (
    <div>
        
        <div className="divider large" />
        <div css={{padding: "12px"}}>
            <div className="label">
                wie arbeitet patwork?
            </div>
            <h2>
            Klarheit in der Kommunikation und eine nachvollziehbare digitale Strategie.
            </h2>
        </div>
        <div className="divider large" />
            {workElements.map((element) => (
                <div key={element.title} className="section-container-element padding-bottom-medium">
                    <div className="flex-33">
                        <div className="label">
                            {element.number} - {element.title}
                        </div>
                    </div>
                    <div className="flex column gap-large flex-66">
                        <WorkElementContent number={element.number}  />
                    </div>
                </div>
            ))}
    </div>
    )   
}

export default AboutContentTwo