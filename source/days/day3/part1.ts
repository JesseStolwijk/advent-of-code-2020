import { parseFile } from "../../file-parser";
import path from "path";

export const runner = async () => {
	const input = await parseFile(path.resolve("./source/days/day3/input.txt"));

	const grid = input.map((line) => line.split("").map(toTile));
	console.log(part2(grid));
};

const toTile = (char: string): Tile => {
	switch (char) {
		case ".":
			return "🟦";
		case "#":
			return "🌲";
		default:
			throw new Error("Invalid input");
	}
};

const part1 = (grid: Tile[][]): number => {
	return transverseGrid(grid, 3, 1);
};

const part2 = (grid: Tile[][]): number => {
	const results = [
		transverseGrid(grid, 1, 1),
		transverseGrid(grid, 3, 1),
		transverseGrid(grid, 5, 1),
		transverseGrid(grid, 7, 1),
		transverseGrid(grid, 1, 2),
	];

	return results.reduce(
		(currentValue, accumulator) => currentValue * accumulator
	);
};

const transverseGrid = (
	grid: Tile[][],
	rightStepSize: number,
	downStepSize: number
): number => {
	return grid
		.filter((_, index) => index % downStepSize === 0)
		.map((row, index) => getTile(row, index * rightStepSize))
		.filter((tile) => tile === "🌲").length;
};

const getTile = (row: Tile[], x: number) => {
	return row[x % row.length];
};

type Tile = Square | Tree;

type Square = "🟦";
type Tree = "🌲";
