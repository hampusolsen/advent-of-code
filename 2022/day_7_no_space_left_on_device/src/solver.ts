import FileSystem, { Directory } from "./filesystem";
import Prompt from "./prompt";

export default class Solver {
  partOne(fs: FileSystem, prompt: Prompt) {
    const MAX_DIRECTORY_SIZE = 100000

    this.populateFileSystem(fs, prompt)

    return fs.all()
      .filter((file): file is Directory => file instanceof Directory)
      .map(dir => dir.getSize())
      .filter(size => size <= MAX_DIRECTORY_SIZE)
      .reduce((sum, size) => sum + size, 0)
  }

  partTwo(fs: FileSystem, prompt: Prompt) {
    const TOTAL_DISK_SPACE = 70000000
    const DISK_SPACE_REQUIRED = 30000000

    this.populateFileSystem(fs, prompt)

    fs.cd("/")

    const usedDiskSpace = fs.cwd().getSize()
    const availableDiskSpace = TOTAL_DISK_SPACE - usedDiskSpace

    const candidates = fs.all()
      .filter((file): file is Directory => file instanceof Directory)
      .map(dir => dir.getSize())
      .filter(size => size + availableDiskSpace >= DISK_SPACE_REQUIRED)

    return Math.min(...candidates)
  }

  populateFileSystem(fs: FileSystem, prompt: Prompt) {
    for (const line of prompt.history) {
      const [cmd, arg] = line.split(" ")
      
      if (cmd === "cd") fs.cd(arg)
      else if (cmd === "ls") continue // skip this for now
      else if (cmd === "dir") fs.mkdir(arg)
      else {
        // assume file
        const name = arg
        const size = parseInt(cmd)
        fs.touch(name, size)
      }
    }
  }
}
