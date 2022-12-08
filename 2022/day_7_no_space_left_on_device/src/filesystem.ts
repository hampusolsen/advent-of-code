type Parent = Directory | null
type FileTree = Array<Directory | File>

export class File {
  name: string
  private size: number
  parent: Parent

  constructor(name: string, size: number, parent: Parent) {
    this.name = name
    this.size = size
    this.parent = parent
  }

  getSize() {
    return this.size
  }
}

export class Directory extends File {
  children: FileTree = []

  constructor(name: string, parent: Parent) {
    super(name, 0, parent)
  }

  getSize() {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0)
  }
}

export default class FileSystem {
  private rootDirectory = new Directory("/", null)
  private currentWorkingDirectory = this.rootDirectory
  private files: FileTree = [this.rootDirectory]

  cd(name: string) {
    if (name === "/") {
      this.currentWorkingDirectory = this.files.find((file): file is Directory => file.name === name && file instanceof Directory)
    }

    if (name === "..") {
      if (this.cwd().parent !== null) {
        this.currentWorkingDirectory = this.cwd().parent
      }

      return
    }

    // going down
    const newWorkingDirectory = this.cwd().children.find(dir => dir.name === name)

    if (newWorkingDirectory instanceof Directory) {
      this.currentWorkingDirectory = newWorkingDirectory
    }
  }

  cwd() {
    return this.currentWorkingDirectory
  }

  mkdir(name: string) {
    const newDirectory = new Directory(name, this.cwd())
    this.files.push(newDirectory)
    this.cwd().children.push(newDirectory)
  }

  touch(name: string, size: number) {
    const newFile = new File(name, size, this.cwd())
    this.files.push(newFile)
    this.cwd().children.push(newFile)
  }

  all() {
    return this.files
  }
}
