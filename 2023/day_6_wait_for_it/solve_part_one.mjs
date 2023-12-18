import { readFileSync } from "fs";
const input = readFileSync("input.txt", "utf8");

const [lengths, records] = input
  .split("\n")
  .map((s) => s.split(/\w+:/)[1].split(/\s+/).slice(1));

let product = 1;
for (let i = 0; i < lengths.length; i++) {
  const length = lengths[i];
  const record = records[i];
  let winning = 0;
  for (let held = 1; held <= length; held++) {
    if (held * (length - held) > record) winning++;
  }

  product *= winning;
}

console.log(product);
