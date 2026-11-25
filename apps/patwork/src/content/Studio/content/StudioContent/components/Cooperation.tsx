import { useNavigate } from "@tanstack/react-router";
import { AnimateLine } from "@/animations";
import { Button } from "@/ui";

const Values = () => {
    const navigate = useNavigate();
    return (
        <div
            className="section-container-element padding-top-medium padding-bottom-medium column"
            css={{
                color: "var(--color-white)",
                backgroundColor: "var(--color-dark)"
            }}
        >
            <div className="topline light">
                patwork ist Keine bloße Dienstleistung.
            </div>

            <h3 className="center large">Sondern langfristige Kooperation.</h3>
            <div className="divider medium" />
            <p className="center dark-background">
                Ideen entwickeln sich weiter.
                <br />
                Neue Möglichkeiten entstehen.
                <br />
                Was gestern gepasst hat, ist heute zu klein.
                <br />
            </p>
            <div className="divider large" />
            <AnimateLine
                trigger={true}
                length={100}
                unit="px"
                thickness={"1.8px"}
                direction="left-to-right"
                css={{ backgroundColor: "var(--color-white)" }}
            />
            <div className="divider large" />
            <p className="large center dark-background">Ein Projekt im Sinn?</p>
            <button
                className="white"
                onClick={() => navigate({ to: "/kontakt" })}
            >
                Jetzt Kontakt aufnehmen
            </button>
        </div>
    );
};

export default Values;
