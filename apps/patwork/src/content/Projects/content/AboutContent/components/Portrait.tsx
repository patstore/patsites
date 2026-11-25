import imageUrl from "../images/redde_bw.jpg";

const Portrait = () => {
    return (
        <div className="portrait-image-container">
            <img
                src={imageUrl}
                alt="Portrait"
                css={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    maxWidth: "420px"
                }}
            />
        </div>
    );
};

export default Portrait;
