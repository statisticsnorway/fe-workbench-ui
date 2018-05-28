import React, { Component } from 'react'
import { Form, Header, Input, Segment } from "semantic-ui-react"
import axios from 'axios'

class Role extends Component {
  constructor (props) {
    super(props)
    this.state = {
      role: {
        description: '',
        id: '',
        localeId: '',
        name: '',
        version: '',
        versionDate: '',
        versionRationale: '',
        administrativeDetailsId: ''
      },
      response: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    this.setState({
      role: {
        ...this.state.role,
        [event.target.name]: event.target.value
      }
    })
  }

  prepareDataForBackend (id) {
    let data = {...this.state.role}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }

    data['id'] = id

    JSON.stringify(data)

    return data
  }

  registerRole () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url
    let data

    const uuidv1 = require('uuid/v1')
    let role_uuid = uuidv1()

    data = this.prepareDataForBackend(role_uuid)
    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/role'

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response)
        responseStatus = response.status
        responseMessage = response.statusText
      })
      .catch(function (error) {
        console.log(error)
        responseStatus = 'Error'
        errorMessage = error.message
      })
      .then(() => {
        if (responseStatus === 201) {
          this.setState({
            response: {
              color: 'green',
              text: 'Rollen ble lagret: ' + [responseMessage]
            }
          })
        } else if (responseStatus === 'Error') {
          this.setState({
            response: {
              color: 'red',
              text: 'Rollen ble ikke lagret: ' + [errorMessage]
            }
          })
        } else {
          this.setState({
            response: {
              color: 'yellow',
              text: 'Rollen ble ikke lagret: ' + [responseMessage]
            }
          })
        }
      })
  }

  render () {
    const editMode = this.props.editMode
    const {response} = this.state

    return (
      <div>
        {Object.keys(response).length !== 0 && editMode ?
          <Segment inverted color={response.color}>{response.text}</Segment> : null}
        <Header as='h3'>
          Rolle
        </Header>
        <Form.Field>
          <label>Navn</label>
          <Input placeholder='Navn' name="name" value={this.state.role.name} onChange={this.handleInputChange}
                 readOnly={editMode}/>
        </Form.Field>
      </div>
    )
  }
}

export default Role