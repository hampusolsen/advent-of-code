function readFile(path) {
  return require('fs').readFileSync(path, 'utf-8')
}

function findGroupBadge(rucksacks) {
  const [first, second, third] = rucksacks
  return [...first].find(item => second.includes(item) && third.includes(item))
}

const items = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function getItemValue(item) {
  return items.indexOf(item) + 1
}

function partTwo(input) {
  const elves = input.split(/\r?\n/)

  let total = 0
  for (let i = 0; i < elves.length; i += 3) {
    const groupBadge = findGroupBadge([
      elves[i],
      elves[i + 1],
      elves[i + 2],
    ])

    total += getItemValue(groupBadge)
  }

  return total
}

describe('Rucksack Reorganization', () => {
  test('Finds group badge', () => {
    const cases = [
      [[
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg',
      ], 'r'],
      [[
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
        'ttgJtRGJQctTZtZT',
        'CrZsJsPPZsGzwwsLwLmpwMDw',
      ], 'Z'],
    ]

    cases.forEach(([input, result]) => expect(findGroupBadge(input)).toBe(result))
  })

  test('Gets item value', () => {
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

  test('Gets total group badge values', () => {
    const input = readFile('./partTwo.input')
    expect(partTwo(input)).toBe(70)
  })
})

