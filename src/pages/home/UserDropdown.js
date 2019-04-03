import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'

import { getData } from '../../utilities/fetch/Fetch'
import { LANGUAGES, UI } from '../../utilities/enum'

class UserDropdown extends Component {
  state = {
    ready: false,
    role: '...'
  }

  componentDidMount () {
    const {languageCode, user} = this.props

    getData(`http://localhost:9090/ns/Role/${user.role}`).then(role => {
      this.setState({
        ready: true,
        role: role.name.filter(name => name.languageCode === languageCode)[0].languageText
      })
    })
  }

  render () {
    const {ready, role} = this.state
    const {handleChange, handleLogout, languageCode, user} = this.props

    return (
      <Dropdown loading={!ready} disabled={!ready}
                trigger={<span><Icon name='user' color='blue' />{`${user.user} (${role})`}</span>}>
        <Dropdown.Menu direction='left'>
          <Dropdown.Item>
            <Dropdown icon={{name: 'dropdown', style: {marginRight: '1em', paddingTop: '0.2em'}}}
                      text={`${UI.LANGUAGE[languageCode]} (${UI.LANGUAGE_CHOICE[languageCode]})`}>
              <Dropdown.Menu>
                {Object.keys(LANGUAGES).map(language =>
                  <Dropdown.Item key={language} name='languageCode' content={UI[language][languageCode]}
                                 value={LANGUAGES[language].languageCode} onClick={handleChange} />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to='/' icon={{name: 'sign out', color: 'red', size: 'large'}}
                         content={UI.LOGOUT[languageCode]} onClick={handleLogout} data-testid='logout-button' />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default UserDropdown
