import axios from 'axios'
import { enums } from './Enums'

export const getDomainStructure = (domain) => {
  return new Promise((resolve, reject) => {
    let url
    let result

    url = process.env.REACT_APP_BACKENDHOST + domain + enums.URL_AFFIX.SCHEMA

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
          header: enums.CONTENT.CANNOT_FETCH + ' \'' + domain + '\' ' + enums.CONTENT.INFORMATION_FROM_SERVER,
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
        header: enums.CONTENT.CANNOT_FETCH + ' \'' + domain + '\' ' + enums.CONTENT.INFORMATION_FROM_SERVER,
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
          header: text + ' ' + enums.CONTENT.WAS_SAVED,
          text: response.statusText,
          icon: 'check'
        }
      } else if (response.status === 200) {
        newState = {
          color: 'green',
          header: text + ' ' + enums.CONTENT.WAS_UPDATED,
          text: response.statusText,
          icon: 'check'
        }
      } else {
        newState = {
          color: 'orange',
          header: text + ' ' + enums.CONTENT.WAS_NOT_SAVED,
          text: response.statusText + ' (' + url + ')',
          icon: 'warning'
        }
      }
    }).catch((error) => {
      let additionalErrorText

      if (error.response) {
        additionalErrorText = error.response.data
      }

      newState = {
        color: 'red',
        header: text + ' ' + enums.CONTENT.WAS_NOT_SAVED,
        text: error.message + ' (' + url + ')',
        additionalText: additionalErrorText,
        icon: 'warning'
      }
    }).then(() => {
      resolve(newState)
    })
  })
}
