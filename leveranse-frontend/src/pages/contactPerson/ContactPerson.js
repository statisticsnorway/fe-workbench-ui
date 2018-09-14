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
   if(this.props.selectedData){
      this.setState(prevState => ({
        linkedProvisionAgreement: [...prevState.linkedProvisionAgreement,this.props.selectedData.selectedProvisionAgreement],
        waitingForResponse: false
      }))
    }else{
      getDataFromBackend('ProvisionAgreement/'+this.props.createdPA.id, this.state.linkedProvisionAgreement).then((result) => {
        this.setState(prevState => ({
          linkedProvisionAgreement: [...prevState.linkedProvisionAgreement, result.data],
          waitingForResponse: false
        }))
      })
    }

  }

  render () {
    const { createdPA } = this.props
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
