import React from 'react'
import { Dropdown, Grid, Icon, Input, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import NewProvisionAgreement from './provisionAgreement/NewProvisionAgreement'
import Variable from './variable/Variable'
import ProvisionAgreementsList from './provisionAgreement/ProvisionAgreementsList'
import '../../assets/css/site.css'

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
              <Segment inverted tertiary>
                <Menu fluid vertical>
                  <Menu.Item header>Leveranseavtale</Menu.Item>
                  <Menu.Item>
                    <Input icon='search' placeholder='Finn avtale' />
                  </Menu.Item>
                  <Menu.Item name='newProvisionAgreement' active={activeItem === 'newProvisionAgreement'}>
                    <NavLink to='/newProvisionAgreement'>
                      <Icon name='compose' />
                      Opprett ny
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item name='copyProvisionAgreement' active={activeItem === 'copyProvisionAgreement'}>
                    <NavLink to='/copyProvisionAgreement'>
                      <Icon name='copy' />
                      Kopier
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item name='deleteProvisionAgreement'
                             active={activeItem === 'deleteProvisionAgreement'}>
                    <NavLink to='/deleteProvisionAgreement'>
                      <Icon name='trash' />
                      Slett
                    </NavLink>
                  </Menu.Item>
                </Menu>
                <Menu fluid vertical>
                  <Menu.Item header>Variabel</Menu.Item>
                  <Menu.Item name='newVariable' active={activeItem === 'newVariable'}>
                    <NavLink to='/variable'>
                      <Icon name="compose" />
                      Opprett ny
                    </NavLink>
                  </Menu.Item>
                </Menu>
                <Menu fluid vertical>
                  <Dropdown item text='Annet'>
                    <Dropdown.Menu>
                      <Dropdown.Item icon='edit' text='Endre profil' />
                      <Dropdown.Item icon='globe' text='Velg språk' />
                      <Dropdown.Item icon='settings' text='Kontoinnstillinger' />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>
              </Segment>

            </Grid.Column>

            <Grid.Column width={12}>
              <Segment inverted tertiary>
                <Route path='/newProvisionAgreement'
                       render={(props) => <NewProvisionAgreement {...props} isNewProvisionAgreement={true} />} />
                <Route path='/variable' component={Variable} />
                <Route path='/home' component={ProvisionAgreementsList} />
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default ProvisionAgreementPage