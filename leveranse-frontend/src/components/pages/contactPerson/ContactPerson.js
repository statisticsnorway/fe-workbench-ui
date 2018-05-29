import React from 'react'
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'
import InternalAgent from './InternalAgent'
import ExternalAgent from './ExternalAgent'

class ContactPerson extends React.Component {
  state = {
    readOnlyMode: false
  }

  saveContactPerson = () => {
    this.setState({
      readOnlyMode: true
    })
    this.InternalAgent.registerInternalAgents()
    this.ExternalAgent.registerExternalAgents()
  }

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })
  }

  render () {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field />
          <Form.Field />
          <Form.Field>
            <Checkbox slider checked={!this.state.readOnlyMode} onClick={this.editModeHandleClick} icon='edit'
                      label='Redigeringsmodus' readOnly={!this.state.readOnlyMode} />
          </Form.Field>
        </Form.Group>
        <div>
          <Segment>
            <InternalAgent ref={(InternalAgent => {this.InternalAgent = InternalAgent})}
                           editMode={this.state.readOnlyMode} />
          </Segment>
          <Segment>
            <ExternalAgent ref={(ExternalAgent => {this.ExternalAgent = ExternalAgent})}
                           editMode={this.state.readOnlyMode} />
          </Segment>
          <Segment>
            <Button primary icon='save'
                    onClick={this.saveContactPerson}
                    content='Lagre kontaktperson' />
          </Segment>
        </div>
      </Form>
    )
  }
}

export default ContactPerson


