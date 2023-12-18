import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const almanac = input.split("\n\n");
const seeds = almanac
  .shift()
  .slice(7)
  .split(" ")
  .map((n) => +n)
  .reduce(
    (acc, cur, idx, seeds) =>
      idx % 2 == 0 ? acc.concat([[cur, cur + seeds[++idx] - 1]]) : acc,
    [],
  );

const maps = almanac.map((map) =>
  map
    .trim()
    .split("\n")
    .slice(1)
    .map((range) => range.split(" ").map((n) => +n)),
);

console.log(seeds);
