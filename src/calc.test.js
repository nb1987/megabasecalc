const calc = require('./calc')

test('returns the expected result given chromosome 14 arm p', () => {
  expect(calc.getBreakSize(14, 'p', 11.2)).toBe(16)
})

test('returns the expected result given chromosome 14 arm p even if P is uppercase', () => {
  expect(calc.getBreakSize(14, 'P', 11.2)).toBe(16)
})

test('returns the expected result given chromosome 14 arm q', () => {
  expect(calc.getBreakSize(14, 'q', 32.31)).toBe(6)
})

test('returns the expected result given chromosome 14 arm q even if Q is uppercase', () => {
  expect(calc.getBreakSize(14, 'Q', 32.31)).toBe(6)
})

test('returns the expected description for a very small break', () => {
  expect(calc.getBreakDescription(4)).toBe('This is a very small break')
})

test('returns the expected description for a small break', () => {
  expect(calc.getBreakDescription(15)).toBe('This is a small break')
})

test('returns the expected description for a medium-sized break', () => {
  expect(calc.getBreakDescription(34)).toBe('This is a medium-sized break')
})

test('returns the expected description for a large break', () => {
  expect(calc.getBreakDescription(60)).toBe('This is a large break')
})

test('throws an error if arm is neither p nor q', () => {
  expect(() => calc.getBreakSize(14, 'Z', 21.1)).toThrowError(/^arm must be p or q$/i)
})

test('throws an error if chromosome less than 1', () => {
  expect(() => calc.getBreakSize(0, 'q', 21.1)).toThrowError(/^chromosome must be between 1 and 23$/i)
})

test('throws an error if chromosome greater than 23', () => {
  expect(() => calc.getBreakSize(24, 'q', 21.1)).toThrowError(/^chromosome must be between 1 and 23$/i)
})


// test('returns the expected result given chromosome 14 arm q', () => {
  
// })