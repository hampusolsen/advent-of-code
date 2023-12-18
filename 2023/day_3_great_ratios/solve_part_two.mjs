import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n").filter(Boolean);

const isSymbol = (ri, ci) => {
  return (
    typeof lines[ri]?.[ci] === "string" &&
    lines[ri][ci] !== "." &&
    isNaN(lines[ri][ci])
  );
};

const getAdjacentSymbolPoints = (y, x) => {
  const points = {};

  isSymbol(y - 1, x - 1) && (points[[y - 1, x - 1]] = lines[y - 1][x - 1]);
  isSymbol(y - 1, x) && (points[[y - 1, x]] = lines[y - 1][x]);
  isSymbol(y - 1, x + 1) && (points[[y - 1, x + 1]] = lines[y - 1][x + 1]);
  isSymbol(y, x - 1) && (points[[y, x - 1]] = lines[y][x - 1]);
  isSymbol(y, x + 1) && (points[[y, x + 1]] = lines[y][x + 1]);
  isSymbol(y + 1, x - 1) && (points[[y + 1, x - 1]] = lines[y + 1][x - 1]);
  isSymbol(y + 1, x) && (points[[y + 1, x]] = lines[y + 1][x]);
  isSymbol(y + 1, x + 1) && (points[[y + 1, x + 1]] = lines[y + 1][x + 1]);

  return points;
};

const symbolPointsMap = {};

for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  let number = "";
  let adjacentSymbolPoints = {};

  for (let x = 0; x < line.length; x++) {
    const char = line[x];

    if (!isNaN(char)) {
      adjacentSymbolPoints = {
        ...adjacentSymbolPoints,
        ...getAdjacentSymbolPoints(y, x),
      };

      number += char;
    }

    if (isNaN(line[x + 1]) && number) {
      for (const key in adjacentSymbolPoints) {
        symbolPointsMap[key] ??= [];
        symbolPointsMap[key].push(number);
      }
      adjacentSymbolPoints = {};
      number = "";
    }
  }
}

console.log(
  Object.values(symbolPointsMap)
    .filter((x) => x.length > 1)
    .map(([x, y]) => x * y)
    .reduce((sum, cur) => sum + cur, 0),
);
