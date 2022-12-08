import chai from "chai"
import Prompt from "./prompt"
import { SAMPLE_INPUT } from "./solver.spec"

chai.should()

describe("Prompt", () => {
  it("initializes with a history of commands", () => {
    const prompt = new Prompt(SAMPLE_INPUT)
    prompt.history.at(0).should.equal("cd /")
    prompt.history.at(1).should.equal("ls")
    prompt.history.at(-1).should.equal("7214296 k")
  })
})
