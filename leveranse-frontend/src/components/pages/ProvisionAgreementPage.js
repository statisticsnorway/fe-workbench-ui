import React from 'react'
import { Button, Dropdown, Form, Grid, Icon, Input, Menu, Segment } from 'semantic-ui-react'
import Agent from './agent/Agent'
import ProvisionAgreement from './provisionAgreement/ProvisionAgreement'
import AdministrativeDetails from './administrativeDetails/AdministrativeDetails'
import TopNavigation from '../navigation/TopNavigation'
import Role from './role/Role'

class LevranseAvtale extends React.Component {
  state = {
    readOnlyMode: true
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleSubmit (event) {
    event.preventDefault()
  }

  onClick = () => {
    this.administrativeDetails.registerAdministrativeDetails()
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

  render () {
    const {activeItem} = this.state

    const enableSubmitButton = this.state.readOnlyMode ?
      <Form.Button disabled primary icon='save' onClick={this.onClick} content='Lagre leveranseavtale'/> :
      <Form.Button primary icon='save' onClick={this.onClick} content='Lagre leveranseavtale'/>

    return (
      <div>
        <Grid stackable>
          <Grid.Column width={3}>
            <Segment size='large' textAlign='center' color='blue'>Arbeidsbenk</Segment>
          </Grid.Column>
          <Grid.Column width={13}>
            <TopNavigation/>
          </Grid.Column>
          <Grid.Column width={3}>
            <Menu vertical>
              <Menu.Item>
                <Input icon='search' placeholder='Finn avtale'/>
              </Menu.Item>
              <Menu.Item name='newProvisionAgreement' active={activeItem === 'newProvisionAgreement'}
                         onClick={this.handleItemClick}>
                <Icon name="compose"/>
                Opprett ny avtale
              </Menu.Item>
              <Menu.Item name='copyProvisionAgreement' active={activeItem === 'copyProvisionAgreement'}
                         onClick={this.handleItemClick}>
                <Icon name='copy'/>
                Kopier avtale
              </Menu.Item>
              <Menu.Item name='deleteProvisionAgreement'
                         active={activeItem === 'deleteProvisionAgreement'}
                         onClick={this.handleItemClick}>
                <Icon name='trash'/>
                Slett avtale
              </Menu.Item>
              <Dropdown item text='Annet'>
                <Dropdown.Menu>
                  <Dropdown.Item icon='edit' text='Endre profil'/>
                  <Dropdown.Item icon='globe' text='Velg språk'/>
                  <Dropdown.Item icon='settings' text='Kontoinstillinger'/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </Grid.Column>
          <Grid.Column width={13}>
            <Segment className='editModeBorder'>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                  <Form.Field>

                  </Form.Field>
                  <Form.Field>

                  </Form.Field>
                  <Form.Field>
                    <Button toggle active={!this.state.readOnlyMode} onClick={this.editModeHandleClick} icon='edit'
                            floated='right' content='Redigeringsmodus'/>
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
                  {enableSubmitButton}
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LevranseAvtale