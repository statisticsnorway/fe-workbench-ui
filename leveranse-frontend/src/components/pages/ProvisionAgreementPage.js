import React from 'react'
import { Dropdown, Form, Grid, Icon, Input, Menu, Segment } from 'semantic-ui-react'
import Agent from './agent/Agent'
import ProvisionAgreement from './provisionAgreement/ProvisionAgreement'
import AdministrativeDetails from './administrativeDetails/AdministrativeDetails'
import TopNavigation from '../navigation/TopNavigation'
import Role from './role/Role'

class LevranseAvtale extends React.Component {
  state = {}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleSubmit (event) {
    event.preventDefault()
  }

  onClick = () => {
    this.administrativeDetails.registerAdministrativeDetails()
    this.agent.registerAgent()
    this.provisionAgreement.registerProvisionAgreement()
    this.role.registerRole()
  }

  render () {
    const {activeItem} = this.state

    return (
      <div>
        <Grid stackable>
          <Grid.Column width={3} centered>
            <Segment size='large' textAlign='center'  color='blue' >Arbeidsbenk</Segment>
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
            <Segment>
             <Form onSubmit={this.handleSubmit}>
                  <Grid container stackable>
                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <Segment>
                          <ProvisionAgreement ref={(provisionAgreement => {this.provisionAgreement = provisionAgreement
                          })}/>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment>
                          <Role ref={(role => {this.role = role})}/>
                        </Segment>
                        <Segment>
                          <Agent ref={(agent => {this.agent = agent})}/>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment><AdministrativeDetails
                          ref={(administrativeDetails => {this.administrativeDetails = administrativeDetails})}/>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form.Group>
                    <Form.Button primary icon='save' onClick={this.onClick} content='Lagre leveranseavtale'/>
                  </Form.Group>
             </Form></Segment>


          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LevranseAvtale