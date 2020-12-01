import React, { FC, useEffect } from "react";
import { Text, useInput } from "ink";
import { usePerformanceObserver } from "./benchmark";
import { runner } from "./days/day1/part1";
import { exit } from "process";

const App: FC<{ name?: string }> = ({ name = "Stranger" }) => {
	useInput((_, key) => {
		if (key.escape) {
			exit();
		}
	});

	return (
		<Text>
			Hello, <Text color="green">{name}</Text>
			<Bench />
		</Text>
	);
};

const Bench = () => {
	const progress = usePerformanceObserver();

	useEffect(() => {
		console.log("Run runner");
		runner();
	}, []);

	return <Text>Progress {progress} %</Text>;
};

module.exports = App;
export default App;
