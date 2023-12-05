import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

const loadedCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

let sum = 0;
games: for (let i = 0; i < lines.length - 1; i++) {
  const [prefix, game] = lines[i].split(": ");
  const id = Number(prefix.substring(5));
  const sets = game.split("; ");

  for (let y = 0; y < sets.length; y++) {
    const showings = sets[y].split(", ");

    for (let z = 0; z < showings.length; z++) {
      const [count, color] = showings[z].split(" ");

      if (count > loadedCubes[color]) {
        continue games;
      }
    }
  }

  sum += id;
}

console.log(sum);
