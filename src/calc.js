const bands = require('./bands')

function getBreakSize (chromosome, arm, band) {
  if (chromosome < 1 || chromosome > 23) {
    throw 'Chromosome must be between 1 and 23'
  }
  if (!['p', 'q'].includes(arm.toLowerCase())) {
    throw 'Arm must be p or q'
  }
  const chromosomeArm = bands[chromosome][arm.toLowerCase()]
  const matchingBand = chromosomeArm.find(b => b.identifier.toString() === band.toString())
  if (arm.toLowerCase() === 'p') {
    const start = 1
    const end = matchingBand.rangeEnd
    return Math.round((end - start) / 1000000)
  } else {
    const start = matchingBand.rangeStart
    const end = chromosomeArm[chromosomeArm.length - 1].rangeEnd
    return Math.round((end - start) / 1000000)
  }
}

function getBreakDescription (size) {
  if (size <= 5) {
    return 'This is a very small break'
  } else if (size < 25) {
    return 'This is a small break'
  } else if (size < 50) {
    return 'This is a medium-sized break'
  } else {
    return 'This is a large break'
  }
}

module.exports = {
  getBreakSize,
  getBreakDescription
}
