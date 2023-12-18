import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const almanac = input.split("\n\n");
const seeds = almanac
  .shift()
  .slice(7)
  .split(" ")
  .map((n) => +n);

const maps = almanac.map((map) =>
  map
    .trim()
    .split("\n")
    .slice(1)
    .map((range) => range.split(" ").map((n) => +n)),
);

const inRange = (n, [_d, s, l]) => s <= n && n <= s + l;

const mapNumber = (n, [d, s]) => n + (d - s);

const min = seeds.reduce((min, seed) => {
  const num = maps.reduce((num, ranges) => {
    const range = ranges.find((range) => inRange(num, range));
    return !!range ? mapNumber(num, range) : num;
  }, seed);

  return Math.min(min, num);
}, Infinity);

console.log(min);
