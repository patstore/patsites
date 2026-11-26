import styles from "./Mosaic.module.css";

const tiles = [
	"slate",
	"teal",
	"green",
	"lime",
	"cream",
	"circle",
	"split"
] as const;

type MosaicProps = {
	variant?: "hero" | "cluster";
};

const Mosaic = ({ variant = "cluster" }: MosaicProps) => (
	<div className={styles[variant]} aria-hidden="true">
		{tiles.map((tile) => (
			<span key={tile} className={`${styles.tile} ${styles[tile]}`} />
		))}
	</div>
);

export default Mosaic;
