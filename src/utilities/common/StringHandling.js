export const lowerCaseFirst = (string) => {
  if (typeof string === 'string') {
    return string.charAt(0).toLowerCase() + string.slice(1)
  } else {
    return string
  }
}
