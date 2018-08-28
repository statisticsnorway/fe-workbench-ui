import React from 'react'
import { Dropdown, Grid, Icon, Input, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, Link, NavLink, Route } from 'react-router-dom'
import ProvisionAgreement from './provisionAgreement/ProvisionAgreement'
import Variable from './variable/Variable'
import ProvisionAgreementsList from './provisionAgreement/ProvisionAgreementsList'
import UnitType from './unitType/UnitType'
import '../assets/css/site.css'
import TargetPopulation from './population/TargetPopulation'
import SurveyPopulation from './population/SurveyPopulation'
import ValueDomainList from './valueDomain/ValueDomainList'
import { Domains, DomainTables, PageBuilder, TableBuilder } from 'dc-jsonschema-react-page-builder'

class WorkbenchPage extends React.Component {
  state = {}

  render () {
    const {activeItem} = this.state

    return (
      <BrowserRouter>
        <div>
          <Grid stackable padded>
            <Grid.Column width={3}>
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
                  <Menu.Item header>Generisk testing</Menu.Item>
                  <Dropdown item text='Opprett ny' scrolling>
                    <Dropdown.Menu>
                      {Object.keys(Domains).map((item, index) => {
                        return (
                          <Dropdown.Item key={index}>
                            <Link to={'/generic/' + item + '/new'}>
                              {Domains[item].nameInNorwegian}
                            </Link>
                          </Dropdown.Item>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown item text='Vis alle'>
                    <Dropdown.Menu>
                      {Object.keys(DomainTables).map((item, index) => {
                        return (
                          <Dropdown.Item key={index}>
                            <NavLink to={'/generic/' + item}>
                              {DomainTables[item].namePlural}
                            </NavLink>
                          </Dropdown.Item>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>
              </Segment>
            </Grid.Column>
            <Grid.Column width={13}>
              <Segment inverted tertiary>
                <Route path='/home' component={ProvisionAgreementsList} />
                <Route path='/provisionAgreement'
                       render={(props) => <ProvisionAgreement {...props} isNewProvisionAgreement={true} />} />
                <Route path='/variable' component={Variable} />
                <Route path='/unitType' component={UnitType} />
                <Route path='/valueDomain' component={ValueDomainList} />
                <Route path='/population/targetPopulation' component={TargetPopulation} />
                <Route path='/population/surveyPopulation' component={SurveyPopulation} />
                {Object.keys(Domains).map((item) => {
                  let madePath = '/generic/' + item + '/:id'
                  return (
                    <Route key={item} path={madePath} exact
                           render={({match}) => (<PageBuilder domain={Domains[item]} params={match.params} />)} />
                  )
                })}
                {Object.keys(DomainTables).map((item) => {
                  let madePath = '/generic/' + item
                  let key = item + 'Table'
                  return (
                    <Route key={key} path={madePath} exact render={() => <TableBuilder table={DomainTables[item]} />} />
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

export default WorkbenchPage
