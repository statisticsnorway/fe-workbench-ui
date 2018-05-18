import React from 'react'
import { Dropdown, Grid, Icon, Input, Menu, Segment } from 'semantic-ui-react'
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import NewProvisionAgreement from './provisionalAgreement/NewProvisionAgreement'

class ArbeidsbenkPage extends React.Component {
  state = {}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleSubmit (event) {
    event.preventDefault()
  }

  editModeHandleClick = () => {
    this.setState({})
  }

  NewProvisionAgreement = data => this.props.login(data).then(() => this.props.history.push("/home"));

  render () {
    const {activeItem} = this.state

    return (
      <BrowserRouter>
       <div>
          <Grid stackable>
            <Grid.Column width={3}>
              <Menu vertical>
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
                <Route path="/newProvisionAgreement" component={NewProvisionAgreement}/>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default ArbeidsbenkPage