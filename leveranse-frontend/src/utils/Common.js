import axios from 'axios'

export const fetchMainSubjectsFromExternalApi = () => {
  let mainSubjectsOptions = []
  let mainSubjects
  let url

  url = process.env.REACT_APP_SSB_SUBJECTS

  axios.get(url)
    .then((response) => {
      mainSubjects = response.data
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
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

  axios.get(url)
    .then((response) => {
      mainSubjects = response.data
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      for (let mainSubjectsKey in mainSubjects) {
        axios.get(url + mainSubjects[mainSubjectsKey]['id'])
        // eslint-disable-next-line
          .then((response) => {
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
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })

//  Organized all subsubjects per mainsubject (might be useful for a cleaner dropdown at a later stage
//  console.log(organizedSubjects)

  return allSubjectsOptions
}