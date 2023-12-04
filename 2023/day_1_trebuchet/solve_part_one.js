const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

let sum = 0;
for (const line of lines) {
  const digits = [];

  for (const char of line.split("")) {
    if (isNaN(char)) {
      continue;
    }

    digits.push(char);
  }

  sum += +(digits[0] + digits[digits.length - 1]);
}

console.log(sum);
