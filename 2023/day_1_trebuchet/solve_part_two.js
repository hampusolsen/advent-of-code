const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

const words = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let sum = 0;
for (const line of lines) {
  const digits = [];
  const chars = line.split("");

  for (let i = 0; i < chars.length; i++) {
    if (!isNaN(chars[i])) {
      digits.push(chars[i]);
    }

    const substring = chars.slice(i).join("");
    for (let y = 0; y < words.length; y++) {
      if (substring.startsWith(words[y])) {
        digits.push(y + 1 + "");
      }
    }
  }

  sum += +(digits[0] + digits[digits.length - 1]);
}

console.log(sum);
