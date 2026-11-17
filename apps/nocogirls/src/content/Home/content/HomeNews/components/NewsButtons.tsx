import { useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type NewsButtonsProps = {
	counter: number;
	setCounter: (counter: number) => void;
	maxCounterValue: number;
};

export function NewsButtons({
	counter,
	setCounter,
	maxCounterValue
}: NewsButtonsProps) {
	const buttonState = useMemo(() => {
		const disabled: [boolean, boolean] = [false, false];
		if (counter === 0) {
			disabled[0] = true;
		}
		if (counter === maxCounterValue) {
			disabled[1] = true;
		}
		return disabled;
	}, [counter, maxCounterValue]);

	return (
		<div className="flex row align-center justify-end gap-md">
			<button
				className="round_button"
				type="button"
				onClick={() => setCounter(counter - 1)}
				disabled={buttonState[0]}
			>
				<ArrowLeft size={15} />
			</button>
			<button
				className="round_button"
				type="button"
				onClick={() => setCounter(counter + 1)}
				disabled={buttonState[1]}
			>
				<ArrowRight size={15} />
			</button>
		</div>
	);
}
