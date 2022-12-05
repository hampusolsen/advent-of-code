function readFile(path) {
  return require('fs').readFileSync(path, 'utf-8')
}

function findDuplicate(inventory) {
  // split each inventory string in half
  const middle = inventory.length / 2
  const first = inventory.slice(0, middle)
  const latter = inventory.slice(middle)

  for (const item of first) {
    // check for case-sensitive duplicates
    if (latter.includes(item)) return item
  }
}

const items = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function getItemValue(item) {
  return items.indexOf(item) + 1
}

function partOne(input) {
  return input.split(/\r?\n/).reduce((sum, inventory) => {
    const item = findDuplicate(inventory)
    const value = getItemValue(item)
    return sum + value
  }, 0)
}

describe('Rucksack Reorganization', () => {
  test('Finds duplicate', () => {
    const cases = [
      ['vJrwpWtwJgWrhcsFMMfFFhFp', 'p'],
      ['jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'L'],
      ['PmmdzqPrVvPwwTWBwg', 'P'],
      ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'v'],
      ['ttgJtRGJQctTZtZT', 't'],
      ['CrZsJsPPZsGzwwsLwLmpwMDw', 's'],
    ]

    cases.forEach(([input, result]) => expect(findDuplicate(input)).toBe(result))
  })

  test('Gets value', () => {
    const cases = [
      ['p', 16],
      ['L', 38],
      ['P', 42],
      ['v', 22],
      ['t', 20],
      ['s', 19],
    ]

    cases.forEach(([input, result]) => expect(getItemValue(input)).toBe(result))
  })

  test('Correct result for part one', () => {
    const input = readFile('./partOne.input.example')
    expect(partOne(input)).toBe(157)
  })
})
