import { benchmark } from "../../benchmark";
import { parseFile } from "../../file-parser";
import path from "path";

export const runner = async () => {
	const expenseReportLines = await parseFile(
		path.resolve("./source/days/day1/input.txt")
	);
	const numbers = expenseReportLines.map((n) => parseInt(n, 10));
	// benchmark(() => findPairThatSumsTo(numbers), "day 1 part 1");

	console.log(part2(numbers));

	benchmark(() => part2(numbers), "day 1 part 2");
};

const SUM_TO = 2020;

// Ugly O(n) implementation
// const part1 = (numbers: number[]): number => {
// 	const [a, b] = findPairThatSumsTo(numbers, SUM_TO)!;
// 	return a * b;
// };

const findPairThatSumsTo = (
	numbers: number[],
	sumTo: number
): [number, number] | undefined => {
	const set = new Set(numbers);

	const foundNumber = numbers.find((number) => set.has(sumTo - number));

	if (foundNumber === undefined) {
		return undefined;
	}

	return [foundNumber, sumTo - foundNumber];
};

// O(n^2) -_-
const part2 = (numbers: number[]): number | undefined => {
	for (let i = 0; i < numbers.length; i++) {
		const currentNumber = numbers[i]!;
		const maybeResult = findPairThatSumsTo(numbers, SUM_TO - currentNumber);

		if (maybeResult) {
			const [a, b] = maybeResult;

			return a * b * currentNumber;
		}
	}

	return undefined;
};
