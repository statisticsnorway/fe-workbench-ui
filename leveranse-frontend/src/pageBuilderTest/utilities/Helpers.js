export function upperCaseFirst (string) {
  return string.toString().charAt(0).toUpperCase() + string.slice(1)
}

export function lowerCaseFirst (string) {
  return string.toString().charAt(0).toLowerCase() + string.slice(1)
}

export function findLastUppercaseWord (string) {
  const words = string.toString().split(/(?=[A-Z])/)

  return words[words.length - 1]
}

export function makeNorwegianWordDefinitive (string) {
  let word = string

  if (string.slice(-1) === 'e') {
    word = string + 'n'
  } else {
    word = string + 'en'
  }

  return word
}

export function makeNorwegianWordPlural (string) {
  let word = string

  if (string.slice(-1) === 'e') {
    word = string + 'r'
  } else {
    word = string + 'er'
  }

  return word
}

export function isNumericOrEmptyString (value) {
  if (value === '') {
    return true
  } else {
    return !isNaN(parseFloat(value)) && isFinite(value)
  }
}
