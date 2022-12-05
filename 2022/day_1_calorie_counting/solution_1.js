const fs = require('fs');

try {
  const input = fs.readFileSync(process.env.PWD + '/input.txt', 'utf8')
  const rows = input.split(/\r?\n/)

  let highestTotal = 0
  let currentTotal = 0
  for (const current of rows) {
    const c = parseInt(current, 10)

    if (isNaN(c)) {
      if (currentTotal > highestTotal) {
        highestTotal = currentTotal
      }

      currentTotal = 0
    } else {
      currentTotal += c
    }
  }

  console.log(highestTotal)
} catch (err) {
  console.error(err)
}

