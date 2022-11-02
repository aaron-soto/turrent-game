function resizeCanvas() {
	canvas.height = innerHeight;
	canvas.width = innerWidth;
}

const setRandomInterval = (intervalFunction, minDelay, maxDelay, loops) => {
	let timeout;
	let count = 0;

	const runInterval = () => {
		const timeoutFunction = () => {
			if (count >= loops) {
				return;
			}
			intervalFunction();
			count += 1;
			runInterval();
		};

		const delay =
			Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

		timeout = setTimeout(timeoutFunction, delay);
	};

	runInterval();

	return {
		clear() {
			clearTimeout(timeout);
		},
	};
};

function randInt(min, max, positive) {
	if (positive == false) {
		var num = Math.floor(Math.random() * max) - min;
		num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
	} else {
		var num = Math.floor(Math.random() * max) + min;
	}
	return num;
}
