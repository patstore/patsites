import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const CustomSolution = () => {
    const navigate = useNavigate();
    return (
        <div className="column-block">
            <div className="section-container bg-dark">
                <div className="section-container-element w-100 row justify-start padding-top-large padding-bottom-small">
                    <div className="w-33">
                        <p className="chapter-number">02</p>
                    </div>
                    <div className="w-66">
                        <h2>Individuelle Lösung</h2>
                    </div>
                </div>
                <div className="section-container-element w-100 row justify-end padding-bottom-large">
                    <div className="w-66">
                        <p className="white">
                            Nicht jedes Projekt passt in ein Standardpaket. Wenn
                            du spezielle Anforderungen an dein Content
                            Management System hast — etwa individuelle Module,
                            Schnittstellen oder komplexe Nutzerrollen —
                            entwickle ich gemeinsam mit dir eine passende
                            Lösung.
                        </p>
                        <div className="divider extralarge"></div>
                        <div className="w-50 padding-top-large">
                            <button
                                className="white"
                                onClick={() => navigate({ to: "/kontakt" })}
                            >
                                <span>Beschreibe dein Projekt</span>
                                <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomSolution;
