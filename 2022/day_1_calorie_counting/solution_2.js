const fs = require('fs');

try {
  const input = fs.readFileSync(process.env.PWD + '/input.txt', 'utf8')
  const rows = input.split(/\r?\n/)
  
  const totals = []

  let currentTotal = 0
  for (const current of rows) {
    const currentNumber = parseInt(current, 10)

    if (isNaN(currentNumber)) {
      totals.push(currentTotal)
      currentTotal = 0
      continue
    }

    currentTotal += currentNumber
  }

  const topThreeTotal = totals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, c) => a + c)

  console.log(topThreeTotal)
} catch (err) {
  console.error(err)
}

