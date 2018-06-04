import React, { Component } from 'react'
import { Form, Header, Input, Message } from 'semantic-ui-react'
import { sendDataToBackend } from '../../../utils/Common'

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

    const uuidv1 = require('uuid/v1')
    this.state.agent.id = uuidv1()

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

  registerAgent () {
    this.setState({
      readOnlyMode: true,
      waitingForResponse: true
    })

    sendDataToBackend('/agent', 'Aktøren', this.state.agent).then((result) => {
      this.setState({
        response: result,
        waitingForResponse: false
      })
    })
  }

  render () {
    const editMode = this.props.editMode
    const {response, agent} = this.state

    return (
      <div>
        {Object.keys(response).length !== 0 && editMode ?
          <Message icon={response.icon} color={response.color} header={response.header}
                   content={response.text} /> : null}
        <Form onSubmit={this.handleSubmit}>
          <Header as='h3' content='Aktør' />
          <Form.Field>
            <label>Navn</label>
            <Input placeholder='Navn' name='name' value={agent.name}
                   onChange={this.handleInputChange} readOnly={editMode} />
          </Form.Field>
          <Form.Field>
            <label>Beskrivelse</label>
            <Input placeholder='Beskrivelse' name='description' value={agent.description}
                   onChange={this.handleInputChange} readOnly={editMode} />
          </Form.Field>
          <Form.Field>
            <label>Versjon</label>
            <Input placeholder='Versjon' name='version' value={agent.version}
                   onChange={this.handleInputChange} readOnly={editMode} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}

export default Agent