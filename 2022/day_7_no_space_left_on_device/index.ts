import fs from "fs"
import FileSystem from "./src/filesystem"
import Prompt from "./src/prompt"
import Solver from "./src/solver"

const input = fs.readFileSync("input.txt", "utf8")
const solver = new Solver()

console.log(solver.partOne(new FileSystem(), new Prompt(input)))
console.log(solver.partTwo(new FileSystem(), new Prompt(input)))
