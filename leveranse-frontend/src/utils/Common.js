import axios from 'axios'

export const fetchMainSubjectsFromExternalApi = () => {
  let mainSubjectsOptions = []
  let mainSubjects
  let url

  url = process.env.REACT_APP_SSB_SUBJECTS

  axios.get(url).then((response) => {
    mainSubjects = response.data
  }).catch((error) => {
    console.log(error)
  }).then(() => {
    for (let key in mainSubjects) {
      mainSubjectsOptions.push({
        key: mainSubjects[key]['id'],
        text: mainSubjects[key]['text'],
        value: mainSubjects[key]['text']
      })
    }
  })

  return mainSubjectsOptions
}

export const fetchAllSubjectsFromExternalApi = () => {
  let mainSubjects
  let subSubjects
  let organizedSubSubjects
  let organizedSubjectsOptions = []
  let allSubjectsOptions = []
  let url

  url = process.env.REACT_APP_SSB_SUBJECTS

  axios.get(url).then((response) => {
    mainSubjects = response.data
  }).catch((error) => {
    console.log(error)
  }).then(() => {
    for (let mainSubjectsKey in mainSubjects) {
      // eslint-disable-next-line
      axios.get(url + mainSubjects[mainSubjectsKey]['id']).then((response) => {
        subSubjects = response.data

        for (let subSubjectsKey in subSubjects) {
          let key = mainSubjectsKey + subSubjectsKey
          let text = mainSubjects[mainSubjectsKey]['text'] + ' - ' + subSubjects[subSubjectsKey]['text']

          allSubjectsOptions.push({key: key, text: text, value: text})

          organizedSubSubjects = {
            ...organizedSubSubjects,
            [subSubjects[subSubjectsKey]['text']]: [subSubjects[subSubjectsKey]['text']]
          }
        }

        organizedSubjectsOptions.push({
          mainSubject: mainSubjects[mainSubjectsKey]['text'], subSubjects: organizedSubSubjects
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  })

//  Organized all subsubjects per mainsubject (might be useful for a cleaner dropdown at a later stage
//  console.log(organizedSubjects)

  return allSubjectsOptions
}

export const fetchListOptions  = (url) => {
  let theRespons
  let theList = []

  axios.get(url).then((response) => {
    console.log(response)
    if (response.status === 200) {
      theRespons = response.data
      console.log('response.data')
      console.log(response.data)
      for (let key in theRespons) {
        theList.push({
          key: theRespons[key]['id'],
          text: theRespons[key]['name'],
          value: theRespons[key]['id']
        })
      }
    } else {
      console.log ('Noe gikk galt ved henting av data')
    }
  }).catch((error) => {
    console.log(error)
  })

  return theList
}

function prepareDataForBackend (state) {
  let data = state

  for (let attribute in data) {
    if (data[attribute] === '') {
      data[attribute] = null
    }
  }

  JSON.stringify(data)

  return data
}

export const sendDataToBackend = (path, text, state) => {
  return new Promise((resolve) => {
    let url
    let data
    let newState = {}

    data = prepareDataForBackend(state)
    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + path

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 201) {
        newState = {
          color: 'green',
          header: text + ' ble lagret',
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
      console.log(error)

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

export const deleteDataInBackend = (path, text, id) => {
  return new Promise((resolve) => {
    let url
    let newState = {}

    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + path + id

    axios.delete(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 204) {
        newState = {
          color: 'green',
          header: text + ' ble slettet',
          text: response.statusText,
          icon: 'check',
          status: response.status
        }
      } else {
        newState = {
          color: 'orange',
          header: text + ' ble ikke slettet',
          text: response.statusText + ' (' + url + ')',
          icon: 'warning',
          status: response.status
        }
      }
    }).catch((error) => {
      console.log(error)

      newState = {
        color: 'red',
        header: text + ' ble ikke slettet',
        text: error.message + ' (' + url + ')',
        icon: 'warning',
        status: 'error'
      }
    }).then(() => {
      resolve(newState)
    })
  })
}