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