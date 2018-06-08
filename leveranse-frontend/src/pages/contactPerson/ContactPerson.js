import React from 'react'
import { Form, Segment } from 'semantic-ui-react'
import InternalAgent from './InternalAgent'
import ExternalAgent from './ExternalAgent'

class ContactPerson extends React.Component {
  state = {
    readOnlyMode: false
  }

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })
  }

  render () {
    return (
      <Form>
        <div>
          <Segment>
            <InternalAgent ref={(InternalAgent => {this.InternalAgent = InternalAgent})}
                           editMode={this.state.readOnlyMode} />
          </Segment>
          <Segment>
            <ExternalAgent ref={(ExternalAgent => {this.ExternalAgent = ExternalAgent})}
                           editMode={this.state.readOnlyMode} />
          </Segment>
        </div>
      </Form>
    )
  }
}

export default ContactPerson


