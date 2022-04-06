const fs = require('fs')
const axios = require('axios').default
const jsdom = require("jsdom")
const { JSDOM } = jsdom

async function fetchBand(chromosome) {
  console.log(`Saving data for chromosome ${chromosome}...`)
  const url = `https://en.wikipedia.org/wiki/Chromosome_${chromosome}`
  const response = await axios.get(url)
  const dom = new JSDOM(response.data)
  const tables = dom.window.document.querySelectorAll('.wikitable')
  const rows = Array.from(tables[tables.length - 1].children[1].children).filter((el, idx) => idx > 0)
  return rows.reduce((output, currentRow) => {
    output[currentRow.children[1].textContent.trim()].push({
      identifier: currentRow.children[2].textContent.trim(),
      rangeStart: parseInt(currentRow.children[5].textContent.trim().replace(/,/g, '')),
      rangeEnd: parseInt(currentRow.children[6].textContent.trim().replace(/,/g, ''))
    })
    return output
  }, {'p': [], 'q': []})
}

async function populateBands() {
  const bands = {}
  for (let i = 1; i < 23; i++) {
    bands[i] = await fetchBand(i)
  }
  fs.writeFileSync('./src/bands.js', `module.exports = ${JSON.stringify(bands, null, 2)}`)
}

populateBands()
