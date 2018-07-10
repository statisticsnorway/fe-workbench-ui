import React from 'react'
import { Dropdown, Grid, Icon, Input, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import ProvisionAgreement from './provisionAgreement/ProvisionAgreement'
import Variable from './variable/Variable'
import ProvisionAgreementsList from './provisionAgreement/ProvisionAgreementsList'
import UnitType from './unitType/UnitType'
import '../assets/css/site.css'
import TargetPopulation from './population/TargetPopulation'
import SurveyPopulation from './population/SurveyPopulation'
import ValueDomainList from './valueDomain/ValueDomainList'
import { domains } from '../pageBuilderTest/utilities/DomainConfigurations'
import PageBuilder from '../pageBuilderTest/builders/PageBuilder'

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
          <Grid stackable padded>
            <Grid.Column width={4}>
              <Segment inverted tertiary>
                <Menu fluid vertical>
                  <Menu.Item header>Leveranseavtale</Menu.Item>
                  <Menu.Item>
                    <Input icon='search' placeholder='Finn avtale' />
                  </Menu.Item>
                  <Menu.Item name='home' active={activeItem === 'home'}>
                    <NavLink to='/home'>
                      <Icon name='home' />
                      Hjem
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item name='provisionAgreement' active={activeItem === 'provisionAgreement'}>
                    <NavLink to='/provisionAgreement'>
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
                  <Menu.Item name='variable' active={activeItem === 'variable'}>
                    <NavLink to='/variable'>
                      <Icon name='compose' />
                      Opprett ny
                    </NavLink>
                  </Menu.Item>
                </Menu>
                <Menu fluid vertical>
                  <Menu.Item header>Verdiområde</Menu.Item>
                  <Menu.Item name='valueDomain' active={activeItem === 'valueDomain'}>
                    <NavLink to='/valueDomain'>
                      <Icon name='tasks' />
                      Administrer
                    </NavLink>
                  </Menu.Item>
                </Menu>
                <Menu fluid vertical>
                  <Menu.Item header content='Enhetstyper' />
                  <Menu.Item name='unitType' active={activeItem === 'unitType'}>
                    <NavLink to='/unitType'>
                      <Icon name='tasks' />
                      Administrer
                    </NavLink>
                  </Menu.Item>
                </Menu>
                <Menu fluid vertical>
                  <Menu.Item header>Populasjoner</Menu.Item>
                  <Dropdown item text='Valg'>
                    <Dropdown.Menu>
                      <Dropdown.Header>Målpopulasjon</Dropdown.Header>
                      <Dropdown.Item>
                        <NavLink to='/population/targetPopulation'>
                          <Icon name='compose' />
                          Opprett ny
                        </NavLink>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Undersøkelsespopulasjon</Dropdown.Header>
                      <Dropdown.Item>
                        <NavLink to='/population/surveyPopulation'>
                          <Icon name='compose' />
                          Opprett ny
                        </NavLink>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
                <Menu fluid vertical>
                  <Menu.Item header>Generisk testing</Menu.Item>
                  <Dropdown item text='Test'>
                    <Dropdown.Menu>
                      {Object.keys(domains).map((item, index) => {
                        return (
                          <Dropdown.Item key={index}>
                            <NavLink to={'/generic/' + item}>
                              {domains[item].name_NO}
                            </NavLink>
                          </Dropdown.Item>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12} floated='right'>
              <Segment inverted tertiary>
                <Route path='/home' component={ProvisionAgreementsList} />
                <Route path='/provisionAgreement'
                       render={(props) => <ProvisionAgreement {...props} isNewProvisionAgreement={true} />} />
                <Route path='/variable' component={Variable} />
                <Route path='/unitType' component={UnitType} />
                <Route path='/valueDomain' component={ValueDomainList} />
                <Route path='/population/targetPopulation' component={TargetPopulation} />
                <Route path='/population/surveyPopulation' component={SurveyPopulation} />
                {Object.keys(domains).map((item) => {
                  let madePath = '/generic/' + item
                  return (
                    <Route path={madePath} render={() => <PageBuilder domain={domains[item]}/>} />
                  )
                })}
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default ProvisionAgreementPage