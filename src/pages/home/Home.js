import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Container, Dropdown, Flag, Menu } from 'semantic-ui-react'

import Cards from './cards/Cards'
import GSIM from '../gsim/GSIM'
import NotFound from '../404/NotFound'
import Workflow from '../workflow/Workflow'
import { SSBLogo } from '../../media/Logo'
import { LANGUAGES, UI } from '../../utilities/Enum'

class Home extends Component {
  state = {ready: false}

  componentDidMount () {
    this.setState({
      ready: true,
      languageCode: localStorage.hasOwnProperty('languageCode') ? localStorage.getItem('languageCode') : 'en',
      gsim: {
        producer: 'GSIM',
        endpoint: this.props.lds,
        namespace: 'data/',
        route: '/home/gsim/'
      }
    })
  }

  changeLanguage = (languageCode) => {
    localStorage.setItem('languageCode', languageCode)

    this.setState({ready: false}, () => this.setState({
      ready: true,
      languageCode: languageCode
    }))
  }

  handleLogout = () => {
    this.props.handleLogout()
  }

  render () {
    const {ready, languageCode, gsim} = this.state
    const {user} = this.props

    if (ready) {
      return (
        <div>
          <Menu fixed='top'>
            <Menu.Item as={Link} to='/' content={SSBLogo(180)} />
            <Menu.Menu position='right'>
              <Dropdown item text={UI.LANGUAGE[languageCode] + ' (' + UI.LANGUAGE_CHOICE[languageCode] + ')'}>
                <Dropdown.Menu>
                  {Object.keys(LANGUAGES).map(language => {
                    return (
                      <Dropdown.Item key={language}
                                     onClick={this.changeLanguage.bind(this, LANGUAGES[language].languageCode)}>
                        <Flag name={LANGUAGES[language].flag} /> {UI[language.toUpperCase()][languageCode]}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item as={Link} to='/' icon={{name: 'sign out', color: 'red', size: 'large'}}
                         content={UI.LOGOUT[languageCode]} onClick={this.handleLogout} />
            </Menu.Menu>
          </Menu>
          <Container fluid style={{marginTop: '5em'}}>
            <Switch>
              <Route path='/home' exact render={() => <Cards languageCode={languageCode} />} />
              <Route path='/home/gsim' render={() => <GSIM languageCode={languageCode} user={user} {...gsim} />} />
              <Route path='/home/tasks' render={() => <Workflow languageCode={languageCode} />} />
              <Route component={({location}) => <NotFound location={location} languageCode={languageCode} />} />
            </Switch>
          </Container>
        </div>
      )
    }

    return null
  }
}

export default Home
