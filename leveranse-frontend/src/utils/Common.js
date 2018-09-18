import React from 'react'
import axios from 'axios'
import { Checkbox, Container, Message } from 'semantic-ui-react'

export const fetchListOptions = (url) => {
  let theRespons
  let theList = []

  axios.get(url).then((response) => {
     if (response.status === 200) {
      theRespons = response.data
      console.log('response.data')
      console.log(response.data)
      for (let key in theRespons) {
        theList.push({
          key: theRespons[key]['id'],
          text: theRespons[key]['name'][0].languageText,
          value: theRespons[key]['id']
        })
      }
    } else {
      console.log('Noe gikk galt ved henting av data')
    }
  }).catch((error) => {
    //console.log(error)
  })

  return theList
}

function prepareDataForBackend (state) {
  let data = state

  /*  for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }*/

  JSON.stringify(data)

  return data
}

export const getDataFromBackend = (path, state) => {
  return new Promise((resolve) => {
    let url
    let newState = {}
    url = process.env.REACT_APP_BACKENDHOST + path

    axios.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        newState = {
          data: response.data
        }
      } else {
        newState = {
          color: 'orange',
          header: 'kan ikke hente ' + path + ' fra server',
          text: response.statusText + ' (' + url + ')',
          icon: 'error'
        }
      }
    }).catch((error) => {
      if (error.response) {
        console.log("EEROR: ",error.response.data)
      }
      newState = {
        color: 'red',
        header: 'kan ikke hente ' + path + ' fra server',
        text: error.message + ' (' + url + ')',
        icon: 'warning'
      }
    }).then(() => {
      resolve(newState)
    })
  })
}

export const sendDataToBackend = (path, text, state) => {
  return new Promise((resolve) => {
    let url
    let data
    let newState = {}

    data = prepareDataForBackend(state)
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
          icon: 'check',
          status: response.status
        }
      } else if (response.status === 200) {
        newState = {
          color: 'green',
          header: text + ' ble oppdatert',
          text: response.statusText,
          icon: 'check',
          status: response.status
        }
      } else {
        newState = {
          color: 'orange',
          header: text + ' ble ikke lagret',
          text: response.statusText + ' (' + url + ')',
          icon: 'warning',
          status: response.status
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
        icon: 'warning',
        status: error.response
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

export const editModeCheckbox = (readOnlyMode, action) => {
  return (
    <Container textAlign='right' fluid>
      <Checkbox toggle checked={!readOnlyMode} onClick={action} icon='edit' label='Redigeringsmodus' />
    </Container>
  )
}

export const errorMessages = (errors, name) => {
  return (
    Object.keys(errors).length !== 0 && !Object.values(errors).every(i => (i === '')) ?
      <Message icon='warning' header={name + ' ble ikke lagret'} content={'Rett opp i feilene og prøv igjen'}
               color='yellow' /> : null
  )
}

export const responseMessages = (readOnlyMode, response) => {
  return (
    Object.keys(response).length !== 0 && readOnlyMode ?
      <Message icon={response.icon} header={response.header} content={response.text} color={response.color} /> : null
  )
}