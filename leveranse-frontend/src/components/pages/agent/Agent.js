import React, { Component } from 'react'
import axios from 'axios'
import { Form, Header, Input, Segment } from 'semantic-ui-react'

class Agent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      agent: {
        description: '',
        id: '',
        localeId: '',
        name: '',
        version: '',
        versionDate: '',
        versionRationale: '',
        administrativeDetailsId: '',
        individualId: '',
        organizationId: '',
        internalExternal: ''
      },
      response: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    this.setState({
      agent: {
        ...this.state.agent,
        [event.target.name]: event.target.value
      }
    })
  }

  prepareDataForBackend (id) {
    let data = {...this.state.agent}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }

    data['id'] = id

    JSON.stringify(data)

    return data
  }

  registerAgent () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url
    let data

    const uuidv1 = require('uuid/v1')
    let agent_uuid = uuidv1()

    data = this.prepareDataForBackend(agent_uuid)
    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/agent'

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
              text: 'Aktøren ble lagret: ' + [responseMessage]
            }
          })
        } else if (responseStatus === 'Error') {
          this.setState({
            response: {
              color: 'red',
              text: 'Aktøren ble ikke lagret: ' + [errorMessage]
            }
          })
        } else {
          this.setState({
            response: {
              color: 'yellow',
              text: 'Aktøren ble ikke lagret: ' + [responseMessage]
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
        <Form onSubmit={this.handleSubmit}>
          <Header as='h3'>
            Aktør
          </Header>
          <Form.Field>
            <label>Navn</label>
            <Input placeholder='Navn' name='name' value={this.state.agent.name}
                   onChange={this.handleInputChange} readOnly={editMode} />
          </Form.Field>
          <Form.Field>
            <label>Beskrivelse</label>
            <Input placeholder='Beskrivelse' name='description' value={this.state.agent.description}
                   onChange={this.handleInputChange} readOnly={editMode} />
          </Form.Field>
          <Form.Field>
            <label>Versjon</label>
            <Input placeholder='Versjon' name='version' value={this.state.agent.version}
                   onChange={this.handleInputChange} readOnly={editMode} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}

export default Agent