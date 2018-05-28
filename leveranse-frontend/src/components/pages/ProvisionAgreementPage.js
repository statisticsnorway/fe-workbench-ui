import React from 'react'
import { Dropdown, Grid, Icon, Input, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, NavLink, Route } from "react-router-dom"
import NewProvisionAgreement from './provisionalAgreement/NewProvisionAgreement'
import Variable from './variable/Variable'

class ProvisionAgreementPage extends React.Component {
  state = {}

  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    const {activeItem} = this.state

    return (
      <BrowserRouter>
        <div>
          <Grid stackable>
            <Grid.Column width={3}>
              <Menu vertical>
                <Menu.Item header>Leveranseavtale</Menu.Item>
                <Menu.Item>
                  <Input icon='search' placeholder='Finn avtale'/>
                </Menu.Item>
                <Menu.Item name='newProvisionAgreement' active={activeItem === 'newProvisionAgreement'}>
                  <NavLink to="/newProvisionAgreement">
                    <Icon name="compose"/>
                    Opprett ny avtale
                  </NavLink>
                </Menu.Item>
                <Menu.Item name='copyProvisionAgreement' active={activeItem === 'copyProvisionAgreement'}>
                  <NavLink to="/copyProvisionAgreement">
                    <Icon name='copy'/>
                    Kopier avtale
                  </NavLink>
                </Menu.Item>
                <Menu.Item name='deleteProvisionAgreement'
                           active={activeItem === 'deleteProvisionAgreement'}>
                  <NavLink to="/deleteProvisionAgreement">
                    <Icon name='trash'/>
                    Slett avtale
                  </NavLink>
                </Menu.Item>
              </Menu>
              <Menu vertical>
                <Menu.Item header>Variabel</Menu.Item>
                <Menu.Item name='newVariable' active={activeItem === 'newVariable'}>
                  <NavLink to='/Variable'>
                    <Icon name="compose"/>
                    Opprett ny variabel
                  </NavLink>
                </Menu.Item>
              </Menu>
              <Menu vertical>
                <Dropdown item text='Annet'>
                  <Dropdown.Menu>
                    <Dropdown.Item icon='edit' text='Endre profil'/>
                    <Dropdown.Item icon='globe' text='Velg språk'/>
                    <Dropdown.Item icon='settings' text='Kontoinnstillinger'/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
            </Grid.Column>
            <Grid.Column width={13}>
              <Segment>
                <Route path="/newProvisionAgreement" render={(props) => <NewProvisionAgreement {...props} isNewProvisionAgreement={true}/>}/>
                <Route path='/Variable' component={Variable}/>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default ProvisionAgreementPage