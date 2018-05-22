import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'
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
  }

  render() {

    return (
      <Form>
        <div>
          <Segment>
            <InternalAgent ref={(InternalAgent => {this.InternalAgent = InternalAgent})}/>
          </Segment>
          <Segment>
            <ExternalAgent ref={(ExternalAgent => {this.ExternalAgent = ExternalAgent})}/>
          </Segment>
          <Segment>
          <Button primary icon='save'
                       onClick={this.saveContactPerson}
                       content='Lagre kontaktperson'/>
          </Segment>
        </div>
      </Form>
    );

  }
}
export default ContactPerson;


