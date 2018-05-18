import React from 'react'
import { Checkbox, Dropdown, Form, Grid, Icon, Input, Menu, Segment } from 'semantic-ui-react'
import Agent from '../agent/Agent'
import ProvisionAgreement from './ProvisionAgreement'
import AdministrativeDetails from '../administrativeDetails/AdministrativeDetails'
import Role from '../role/Role'
import TopNavigation from '../../navigation/TopNavigation'

class NewProvisionAgreement extends React.Component {
  state = {
    readOnlyMode: false
  }
  createNewProvisionAgreement = (e, {name}) => {
    this.setState({
      activeItem: name,
      readOnlyMode: false
    })
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


  render(){
    return(
      <div>
        <Grid stackable>
          <Grid.Column width={13}>
            <TopNavigation/>
          </Grid.Column>
          <Grid.Column width={16}>
            <Segment>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                  <Form.Field>

                  </Form.Field>
                  <Form.Field>

                  </Form.Field>
                  <Form.Field>
                    <Checkbox slider checked={!this.state.readOnlyMode} onClick={this.editModeHandleClick} icon='edit'
                              label='Redigeringsmodus' readOnly={!this.state.readOnlyMode}/>
                  </Form.Field>
                </Form.Group>
                <Grid container stackable>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <Segment>
                        <ProvisionAgreement ref={(provisionAgreement => {
                          this.provisionAgreement = provisionAgreement
                        })} editMode={this.state.readOnlyMode}/>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment>
                        <Role ref={(role => {this.role = role})} editMode={this.state.readOnlyMode}/>
                      </Segment>
                      <Segment>
                        <Agent ref={(agent => {this.agent = agent})} editMode={this.state.readOnlyMode}/>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column>
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
            </Segment>
          </Grid.Column>
        </Grid>

      </div>
    )
  }
}

export default NewProvisionAgreement