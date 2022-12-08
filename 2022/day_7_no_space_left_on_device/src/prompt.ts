export default class Prompt {
  history: string[] = []

  constructor(input: string) {
    this.history = this.parseInputIntoHistory(input)
  }

  private parseInputIntoHistory(input: string) {
    return input.split("\n")
      .map(line => line.replace("$ ", "")) // strips any `$ ` suffixes found
      .filter(Boolean) // get rid of any potentially empty lines
  }
}
