export const getDomainData = (domain, type, id = '') => {
  return new Promise((reject) => {
    const rejectResult = {
      color: 'red',
      header: 'Problem',
      text: 'This is a problem',
      additionalText: 'A really big problem',
      icon: 'warning'
    }

    reject(rejectResult)
  })
}
