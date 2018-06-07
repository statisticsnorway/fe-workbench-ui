import React, { Component } from 'react'
import { Form, Header, Input, Message } from 'semantic-ui-react'
import { sendDataToBackend } from '../../utils/Common'

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

    const uuidv1 = require('uuid/v1')
    this.state.role.id = uuidv1()

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

  registerRole () {
    this.setState({
      readOnlyMode: true,
      waitingForResponse: true
    })

    sendDataToBackend('/role', 'Rollen', this.state.role).then((result) => {
      this.setState({
        response: result,
        waitingForResponse: false
      })
    })
  }

  render () {
    const editMode = this.props.editMode
    const {response, role} = this.state

    return (
      <div>
        {Object.keys(response).length !== 0 && editMode ?
          <Message icon={response.icon} color={response.color} header={response.header}
                   content={response.text} /> : null}
        <Header as='h3' content='Rolle' />
        <Form.Field>
          <label>Navn</label>
          <Input placeholder='Navn' name='name' value={role.name} onChange={this.handleInputChange}
                 readOnly={editMode} />
        </Form.Field>
      </div>
    )
  }
}

export default Role