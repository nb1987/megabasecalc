const calc = require('./calc')
const bands = require('./bands')

const chromosomeDropdown = document.querySelector('#chromo')
const armOptions = document.querySelectorAll('[name="arm"]')
const bandDropdown = document.querySelector('#band')

chromosomeDropdown.addEventListener('change', (element) => {
  clearForm()
  clearBreakValue()
})

armOptions.forEach(armOption => {
  armOption.addEventListener('change', (element) => {
    bandDropdown.disabled = false
    repopulateBands(chromosomeDropdown.value, element.target.value)
  })
})

bandDropdown.addEventListener('change', (value) => {
  if (chromosomeDropdown.value && document.querySelector('[name="arm"]:checked').value && bandDropdown.value) {
    const size = calc.getBreakSize(
      chromosomeDropdown.value,
      document.querySelector('[name="arm"]:checked').value,
      bandDropdown.value)
    document.querySelector('#break').textContent = size
    document.querySelector('#break-phrase').textContent = calc.getBreakDescription(size)
  } else {
    clearBreakValue()
  }
})

const clearForm = () => {
  clearBands()
  const checkedArmRadioButton = document.querySelector('[name="arm"]:checked')
  if (checkedArmRadioButton) checkedArmRadioButton.checked = false
  if (!chromosomeDropdown.value) {
    armOptions.forEach(arm => {
      arm.disabled = true
    })
  } else {
    armOptions.forEach(arm => {
      arm.disabled = false
    })
  }
  bandDropdown.disabled = true
}

const clearBreakValue = () => {
  document.querySelector('#break').textContent = '?'
  document.querySelector('#break-phrase').textContent = ''
}

const populateChromosomeDropdown = () => {
  let opt = document.createElement('option')
  opt.value = ''
  opt.innerHTML = ''
  chromosomeDropdown.appendChild(opt)
  Object.keys(bands).forEach((chromosome) => {
    opt = document.createElement('option')
    opt.value = chromosome
    opt.innerHTML = chromosome
    chromosomeDropdown.appendChild(opt)
  })
}

const repopulateBands = (chromosome, arm) => {
  clearBands()
  let opt = document.createElement('option')
  opt.value = ''
  opt.innerHTML = ''
  bandDropdown.appendChild(opt)
  bands[chromosome][arm].forEach((band) => {  
    opt = document.createElement('option')
    opt.value = band.identifier
    opt.innerHTML = band.identifier
    bandDropdown.appendChild(opt)
  })
}

const clearBands = () => {
  Array.from(bandDropdown.children).forEach((opt) => {
    bandDropdown.removeChild(opt)
  })
}

populateChromosomeDropdown()