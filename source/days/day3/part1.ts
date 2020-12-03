import { parseFile } from "../../file-parser";
import path from "path";

export const runner = async () => {
	const input = await parseFile(path.resolve("./source/days/day3/input.txt"));

	const grid = input.map((line) => line.split("").map(toTile));
	console.log(part1(grid));
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
	return grid
		.map((row, index) => getTile(row, index * 3))
		.filter((tile) => tile === "🌲").length;
};

const getTile = (row: Tile[], x: number) => {
	return row[x % row.length];
};

type Tile = Square | Tree;

type Square = "🟦";
type Tree = "🌲";
