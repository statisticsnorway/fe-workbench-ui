import React from 'react'
import { Form, Segment } from 'semantic-ui-react'
import InternalAgent from './InternalAgent'
import ExternalAgent from './ExternalAgent'

class ContactPerson extends React.Component {

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
        </div>
      </Form>
    );

  }
}

export  default ContactPerson;