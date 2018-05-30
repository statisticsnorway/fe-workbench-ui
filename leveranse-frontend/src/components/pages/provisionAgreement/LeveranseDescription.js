import React from 'react'
import { Checkbox, Form, Grid, Segment } from 'semantic-ui-react'
import ProvisionAgreement from './ProvisionAgreement'
import AdministrativeDetails from '../administrativeDetails/AdministrativeDetails'

class LeveranseDescription extends React.Component {
  state = {
    readOnlyMode: false
  }

  saveProvisionAgreement = () => {
//    this.administrativeDetails.registerAdministrativeDetails()
    this.provisionAgreement.registerProvisionAgreement()
    this.setState({
      readOnlyMode: true
    })
  }

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })

    this.provisionAgreement.setState({
      response: {}
    })

    /*
    this.administrativeDetails.setState({
      response: {}
    })
    */
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field/>
            <Form.Field/>
            <Form.Field>
              <Checkbox slider checked={!this.state.readOnlyMode} onClick={this.editModeHandleClick} icon='edit'
                        label='Redigeringsmodus' readOnly={!this.state.readOnlyMode}/>
            </Form.Field>
          </Form.Group>
          <Grid container stackable>
            <Grid.Row columns={3}>
              <Grid.Column width={10}>
                <Segment>
                  <ProvisionAgreement ref={(provisionAgreement => {
                    this.provisionAgreement = provisionAgreement
                  })} editMode={this.state.readOnlyMode} isNewProvisionAgreement={this.props.isNewProvisionAgreement}/>
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment><AdministrativeDetails
                  ref={(administrativeDetails => {this.administrativeDetails = administrativeDetails})}
                  editMode={this.state.readOnlyMode}/>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment>
            <Form.Button disabled={this.state.readOnlyMode} primary icon='save'
                         onClick={this.saveProvisionAgreement}
                         content='Lagre leveranseavtale'/>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default LeveranseDescription