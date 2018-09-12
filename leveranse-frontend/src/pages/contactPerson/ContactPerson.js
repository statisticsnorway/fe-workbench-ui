import React from 'react'
import { Form, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { InternalAgent } from './InternalAgent'
import { ExternalAgent } from './ExternalAgent'
import { getDataFromBackend } from "../../utils/Common";

class ContactPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnlyMode: false,
      linkedProvisionAgreement: ''
    };
  }

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })
  }

  componentDidMount() {
    getDataFromBackend('ProvisionAgreement/'+this.props.createdPA.id, this.state.linkedProvisionAgreement).then((result) => {
      this.setState(prevState => ({
        linkedProvisionAgreement: [...prevState.linkedProvisionAgreement, result.data],
        waitingForResponse: false
      }))
    })
  }

  render () {
    const { createdPA } = this.props
    console.log("PA to be link to contact person::", this.state.linkedProvisionAgreement)
    return (
      <Form>
        <div>
          <Segment>
            <InternalAgent ref={(InternalAgent => {this.InternalAgent = InternalAgent})}
                           linkedPA = {this.state.linkedProvisionAgreement}
                           editMode={this.state.readOnlyMode} />
          </Segment>
          <Segment>
            <ExternalAgent ref={(ExternalAgent => {this.ExternalAgent = ExternalAgent})}
                           linkedPA = {this.state.linkedProvisionAgreement}
                           editMode={this.state.readOnlyMode} />
          </Segment>
        </div>
      </Form>
    )
  }
}

function mapStateToProps(state) {
  const {authentication, createdPA} = state
  return {
    authentication,
    createdPA
  }
}
const connectedContactPerson = connect(mapStateToProps)(ContactPerson)
export {connectedContactPerson as ContactPerson}
