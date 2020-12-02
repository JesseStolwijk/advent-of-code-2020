import { parseFile } from "../../file-parser";
import path from "path";

export const runner = async () => {
	const expenseReportLines = await parseFile(
		path.resolve("./source/days/day2/input.txt")
	);
	const input: PasswordEntry[] = expenseReportLines
		.map((line) => line.split(/ |-|: /))
		.map(([min, max, letter, password]) => ({
			min: parseInt(min!, 10),
			max: parseInt(max!, 10),
			letter: letter!,
			password: password!,
		}));

	console.log(part2(input));
};

const part1 = (entries: PasswordEntry[]): number => {
	return entries.filter((entry) => {
		const numberOfOccurences = entry.password
			.split("")
			.filter((char) => char === entry.letter).length;

		return (
			entry.min <= numberOfOccurences &&
			entry.max >= numberOfOccurences
		);
	}).length;
};

const part2 = (entries: PasswordEntry[]): number => {
	return entries.filter((entry) => {
		const minLetter = entry.password[entry.min - 1];
		const maxLetter = entry.password[entry.max - 1];

		return (
			(minLetter === entry.letter ||
				maxLetter === entry.letter) &&
			minLetter !== maxLetter
		);
	}).length;
};


interface PasswordEntry {
	letter: string;
	min: number;
	max: number;
	password: string;
}