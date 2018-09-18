import React from 'react'
import { Form, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { InternalAgent } from './InternalAgent'
import { ExternalAgent } from './ExternalAgent'
import { getDataFromBackend } from "../../utils/Common";

class ContactPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnlyMode: false,
      selectedProvisionAgreement: '',
      createdProvisionAgreement: ''
    };

    console.log(this.props)
    if(this.props.selectedData){
      this.state.selectedProvisionAgreement = this.props.selectedData.selectedProvisionAgreement
    } else {
      this.state.createdProvisionAgreement = this.props.createdPA.id
    }
  }

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })
  }

  render() {
    const {createdPA} = this.props
    return (
      <Form>
        <div>
          <Segment>
            <InternalAgent ref={(InternalAgent => {
              this.InternalAgent = InternalAgent
            })}
                           selectedProvisionAgreement={this.state.selectedProvisionAgreement}
                           createdProvisionAgreement={this.state.createdProvisionAgreement}
                           editMode={this.state.readOnlyMode} />
          </Segment>
          <Segment>
            <ExternalAgent ref={(ExternalAgent => {
              this.ExternalAgent = ExternalAgent
            })}
                           selectedProvisionAgreement={this.state.selectedProvisionAgreement}
                           createdProvisionAgreement={this.state.createdProvisionAgreement}
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
export { connectedContactPerson as ContactPerson }
