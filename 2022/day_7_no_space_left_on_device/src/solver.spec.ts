import chai from "chai"
import FileSystem from "./filesystem"
import Prompt from "./prompt"
import Solver from "./solver"

chai.should()

export const SAMPLE_INPUT = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

describe("Solver", () => {
  it("solves part one", () => {
    const solver = new Solver()
    solver.partOne(new FileSystem(), new Prompt(SAMPLE_INPUT)).should.equal(95437)
  })

  it("solves part two", () => {
    const solver = new Solver()
    solver.partTwo(new FileSystem(), new Prompt(SAMPLE_INPUT)).should.equal(24933642)
  })
})
