import { performance, PerformanceObserver } from "perf_hooks";
import { useEffect, useState } from "react";

const NUMBER_OF_EXECUTIONS = 1000;

export const usePerformanceObserver = () => {
	const [currentIteration, setCurrentIteration] = useState(0);

	useEffect(() => {
		const perfObserver = new PerformanceObserver((items) => {
			setCurrentIteration((current) => current + items.getEntries().length);
		});

		perfObserver.observe({ entryTypes: ["measure"] });
	}, []);

	return (currentIteration / NUMBER_OF_EXECUTIONS) * 100;
};

export const benchmark = (block: () => void, name: string) => {
	console.log("Start running benchmark");

	for (let i = 0; i < NUMBER_OF_EXECUTIONS; i++) {
		measureMillis(block, name);
	}

	console.log("Benchmark finished");
};

const measureMillis = (block: () => void, name: string) => {
	performance.mark("start");

	block();

	performance.mark("end");

	performance.measure(name, "start", "end");
};
