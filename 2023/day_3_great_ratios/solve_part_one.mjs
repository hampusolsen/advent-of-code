import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

let sum = 0;
const isSymbol = (ri, ci) => {
  return (
    typeof lines[ri]?.[ci] === "string" &&
    lines[ri][ci] !== "." &&
    isNaN(lines[ri][ci])
  );
};

const checkForAdjacentSymbol = (ri, ci) => {
  return (
    isSymbol(ri - 1, ci - 1) ||
    isSymbol(ri - 1, ci) ||
    isSymbol(ri - 1, ci + 1) ||
    isSymbol(ri, ci - 1) ||
    isSymbol(ri, ci + 1) ||
    isSymbol(ri + 1, ci - 1) ||
    isSymbol(ri + 1, ci) ||
    isSymbol(ri + 1, ci + 1)
  );
};

for (let ri = 0; ri < lines.length; ri++) {
  const line = lines[ri];
  let number = "";
  let hasAdjacentSymbol = false;

  for (let ci = 0; ci < line.length; ci++) {
    const char = line[ci];

    if (!isNaN(char)) {
      if (!hasAdjacentSymbol) {
        hasAdjacentSymbol = checkForAdjacentSymbol(ri, ci);
      }

      number += char;
    }

    if (isNaN(line[ci + 1])) {
      if (hasAdjacentSymbol) {
        sum += +number;
      }

      number = "";
      hasAdjacentSymbol = false;
    }
  }
}

console.log(sum);
