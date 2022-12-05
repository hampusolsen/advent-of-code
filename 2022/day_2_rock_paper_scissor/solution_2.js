const input = require("fs").readFileSync("input.txt", "utf-8")

export default function solution(input) {
    return input.split("\n").reduce((s, c) => s + {
        "A X": 3,
        "A Y": 4,
        "A Z": 8,
        "B X": 1,
        "B Y": 5,
        "B Z": 9,
        "C X": 2,
        "C Y": 6,
        "C Z": 7,
    }[c], 0)
}

console.log(solution(input));
