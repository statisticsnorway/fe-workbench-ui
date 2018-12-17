import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Dropdown, Flag, Icon, Menu } from 'semantic-ui-react'

import { SSBLogo } from '../../media/Logo'
import { LANGUAGES, UI } from '../../utilities/Enum'

class Home extends Component {
  state = {ready: false}

  componentDidMount () {
    this.setState({
      ready: true,
      languageCode: localStorage.hasOwnProperty('languageCode') ? localStorage.getItem('languageCode') : 'en'
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
    const {ready, languageCode} = this.state
    const {user} = this.props

    if (ready) {
      return (
        <div>
          <Menu fixed='top'>
            <Menu.Item as={Link} to='/' content={SSBLogo(180)} />
            <Menu.Menu position='right'>
              <Dropdown item text={user}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to='/' onClick={this.handleLogout}>
                    <Icon name='sign out' />
                    {UI.LOGOUT[languageCode]}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown item text={UI.LANGUAGE[languageCode]}>
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
            </Menu.Menu>
          </Menu>
          <Container fluid style={{marginTop: '5em'}}>

          </Container>
        </div>
      )
    }

    return null
  }
}

export default Home
