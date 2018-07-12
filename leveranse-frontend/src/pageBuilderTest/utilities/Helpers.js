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
