import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

let sum = 0;
for (let i = 0; i < lines.length - 1; i++) {
  const minimum = { red: 0, green: 0, blue: 0 };
  const [, game] = lines[i].split(": ");
  const sets = game.split("; ");

  for (let y = 0; y < sets.length; y++) {
    const showings = sets[y].split(", ");

    for (let z = 0; z < showings.length; z++) {
      const [count, color] = showings[z].split(" ");

      minimum[color] = Math.max(minimum[color], Number(count));
    }
  }

  sum += minimum.red * minimum.green * minimum.blue;
}

console.log(sum);
