import chai from "chai"
import FileSystem from "./filesystem"

chai.should()

describe("FileSystem", () => {
  it("initializes with root as working directory", () => {
    const fs = new FileSystem()
    fs.cwd().name.should.equal("/")
  })

  it("creates a new directory within working directory", () => {
    const fs = new FileSystem()
    fs.cwd().children.should.have.lengthOf(0)
    fs.mkdir("test")
    fs.cwd().children.should.have.lengthOf(1)
    fs.cwd().children[0].name.should.equal("test")
  })

  it("creates a new file within working directory", () => {
    const fs = new FileSystem()
    fs.cwd().children.should.have.lengthOf(0)
    fs.touch("test", 1000)
    fs.cwd().children.should.have.lengthOf(1)
    fs.cwd().children[0].name.should.equal("test")
    fs.cwd().children[0].getSize().should.equal(1000)
  })

  it("changes working directory", () => {
    const fs = new FileSystem()
    fs.cwd().name.should.equal("/")
    fs.mkdir("test")
    fs.cd("test")
    fs.cwd().name.should.equal("test")
    fs.cd("..")
    fs.cwd().name.should.equal("/")
  })

  it("gets total size of directory recursively", () => {
    const fs = new FileSystem()
    fs.cwd().getSize().should.equal(0)
    fs.touch("file_1", 1000)
    fs.cwd().getSize().should.equal(1000)
    fs.mkdir("dir_1")
    fs.cd("dir_1")
    fs.touch("nested_file_1", 1000)
    fs.cd("/")
    fs.mkdir("dir_2")
    fs.cd("dir_2")
    fs.touch("nested_file_2", 1000)
    fs.mkdir("nested_dir_1")
    fs.touch("nested_nested_file_1", 1000)
    fs.cd("/")
    fs.cwd().getSize().should.equal(4000)
  })

  it("does not throw error when trying to go up from root directory", () => {
    const fs = new FileSystem()
    chai.expect(() => fs.cd("..")).to.not.throw()
  })

  it("gets all files stored in filesystem", () => {
    const fs = new FileSystem()
    fs.mkdir("dirA")
    fs.touch("fileA", 1)
    fs.cd("dirA")
    fs.touch("fileB", 1)
    fs.all().should.have.lengthOf(4) // includes root
  })
})
