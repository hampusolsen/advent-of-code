import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");
const lines = input.split("\n").filter(Boolean);
const map = [];

const parseCard = (line) =>
  line
    .split(": ")[1]
    .split(" | ")
    .map((nums) => nums.trim().split(/\s+/));

const getMatches = ([winners, numbers]) =>
  winners.filter((winner) => numbers.includes(winner));

for (let index = 0; index < lines.length; index++) {
  map[index] ??= 0;
  map[index]++;
  const card = parseCard(lines[index]);
  const matches = getMatches(card);
  for (let match = 1; match <= matches.length; match++) {
    map[index + match] ??= 0;
    map[index + match] += map[index];
  }
}

console.log(map.reduce((sum, cur) => sum + cur, 0));
