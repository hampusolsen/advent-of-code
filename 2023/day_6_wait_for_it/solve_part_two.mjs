import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const [length, record] = input
  .split("\n")
  .map((s) => s.split(/\w+:/)[1].split(/\s+/).slice(1))
  .map((i) => +i.join(""));

let winning = 0;
for (let held = 1; held <= length; held++) {
  if (held * (length - held) > record) winning++;
}
