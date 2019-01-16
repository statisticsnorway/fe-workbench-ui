export function splitOnUppercase (string) {
  if (typeof string === 'string') {
    return string.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')
  } else {
    return string
  }
}

export function extractName (string) {
  if (typeof string === 'string') {
    return string.replace('#/definitions/', '')
  } else {
    return string
  }
}

export function handleRoute (route) {
  if (typeof route === 'string') {
    if (route.endsWith('/')) {
      return route.substring(0, route.length - 1)
    } else {
      return route
    }
  }
}
