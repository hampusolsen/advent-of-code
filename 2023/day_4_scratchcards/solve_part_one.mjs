import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");
console.log(
  input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(": ")[1].split(" | "))
    .reduce((total, [winners, numbers]) => {
      return (
        total +
        numbers.split(" ").reduce((partial, number) => {
          return winners
            .split(" ")
            .filter(Boolean)
            .some((winner) => winner === number)
            ? !partial
              ? 1
              : partial << 1
            : partial;
        }, 0)
      );
    }, 0),
);
