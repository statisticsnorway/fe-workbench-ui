import React from 'react'
import { Checkbox, Form, Grid, Segment } from 'semantic-ui-react'
import Agent from '../agent/Agent'
import ProvisionAgreement from './ProvisionAgreement'
import AdministrativeDetails from '../administrativeDetails/AdministrativeDetails'
import Role from '../role/Role'
import { v1 } from 'uuid';


class LeveranseDesription extends React.Component {
  state = {
    readOnlyMode: false
  }

  saveProvisionAgreement = () => {
//    this.administrativeDetails.registerAdministrativeDetails()
    this.agent.registerAgent()
    this.provisionAgreement.registerProvisionAgreement()
    this.role.registerRole()
    this.setState({
      readOnlyMode: true
    })
  }

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field></Form.Field>
            <Form.Field></Form.Field>
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
                  })} editMode={this.state.readOnlyMode}/>
                </Segment>
                <Segment>
                  <Role ref={(role => {this.role = role})} editMode={this.state.readOnlyMode}/>
                </Segment>
                <Segment>
                  <Agent ref={(agent => {this.agent = agent})} editMode={this.state.readOnlyMode}/>
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
          <Form.Group>
            <Form.Button disabled={this.state.readOnlyMode} primary icon='save'
                         onClick={this.saveProvisionAgreement}
                         content='Lagre leveranseavtale'/>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default LeveranseDesription