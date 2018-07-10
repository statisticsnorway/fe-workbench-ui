import axios from 'axios'

export const getDomainStructure = (domain) => {
  return new Promise((resolve, reject) => {
    let url
    let result

    url = process.env.REACT_APP_BACKENDHOST + domain + '?schema'

    axios.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        result = {
          color: 'orange',
          header: 'Kan ikke hente \'' + domain + '\' informasjon fra server',
          text: response.statusText + ' (' + url + ')',
          icon: 'error'
        }

        reject(result)
      }
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data)
      }

      result = {
        color: 'red',
        header: 'Kan ikke hente \'' + domain + '\' informasjon fra server',
        text: error.message + ' (' + url + ')',
        icon: 'warning'
      }

      reject(result)
    })
  })
}

export const sendDomainData = (path, text, data) => {
  return new Promise((resolve) => {
    let url
    let newState = {}

    JSON.stringify(data)
    url = process.env.REACT_APP_BACKENDHOST + path

    axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // Right now dc-metadata returns 200 regardless of updated og created
      if (response.status === 201) {
        newState = {
          color: 'green',
          header: text + ' ble lagret',
          text: response.statusText,
          icon: 'check'
        }
      } else if (response.status === 200) {
        newState = {
          color: 'green',
          header: text + ' ble oppdatert',
          text: response.statusText,
          icon: 'check'
        }
      } else {
        newState = {
          color: 'orange',
          header: text + ' ble ikke lagret',
          text: response.statusText + ' (' + url + ')',
          icon: 'warning'
        }
      }
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data)
      }

      newState = {
        color: 'red',
        header: text + ' ble ikke lagret',
        text: error.message + ' (' + url + ')',
        icon: 'warning'
      }
    }).then(() => {
      resolve(newState)
    })
  })
}