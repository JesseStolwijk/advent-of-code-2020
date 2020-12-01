import React, { FC, useEffect, useState } from "react";
import { Text, useInput } from "ink";
import { usePerformanceObserver } from "./benchmark";
import { runner } from "./days/day1/part1";
import { exit } from "process";
import { useTimeout } from "./use-timeout";

const colors = ["red", "green", "blue", "yellow", "pink"];

const pickRandomValue = <T extends unknown>(array: T[]): T | undefined => {
	if (array.length === 0) {
		throw new Error("fuck off");
	} else if (array.length === 1) {
		return array[0];
	}
	return array[Math.floor(Math.random() * array.length)];
};

const App: FC<{ name?: string }> = ({ name = "Stranger" }) => {
	const [headerColor, setHeaderColor] = useState<string>("green");

	useInput((_, key) => {
		if (key.escape) {
			exit();
		}
	});

	useTimeout(() => setHeaderColor(pickRandomValue(colors) ?? "green"), 1000);

	return (
		<Text>
			{name}
			<Text color={headerColor}>Advent of Code 2020</Text>
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
