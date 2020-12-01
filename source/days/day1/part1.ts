import { benchmark } from "../../benchmark";
import { parseFile } from "../../file-parser";
import path from "path";

export const runner = async () => {
	const expenseReportLines = await parseFile(
		path.resolve("./source/days/day1/input.txt")
	);
	const numbers = expenseReportLines.map(parseInt);
	benchmark(() => part1(numbers), "day 1 part 1");
};

const SUM = 2020;

// Ugly O(n) implementation
const part1 = (numbers: number[]): number => {
	const set = new Set(numbers);

	const luckyNumber = numbers.find((number) => set.has(SUM - number));

	if (luckyNumber === undefined) {
		throw new Error("Could not find the lucky number");
	}

	return luckyNumber * (SUM - luckyNumber);
};
