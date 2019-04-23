import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { getData } from '../../utilities/fetch/Fetch'
import { LANGUAGES, UI } from '../../utilities/enum'

import Roles from '../../__tests__/test-data/Roles'

class UserDropdown extends Component {
  static contextType = WorkbenchContext

  state = {
    ready: false,
    role: '...'
  }

  componentDidMount () {
    const { user } = this.props

    let context = this.context

    if (process.env.NODE_ENV !== 'development') {
      getData(`${process.env.REACT_APP_ROLES}${user.role}`).then(role => {
        this.setState({
          ready: true,
          role: role.name.filter(name => name.languageCode === context.languageCode)[0].languageText
        })
      })
    } else {
      this.setState({
        ready: true,
        role: Roles.filter(role => role.id === user.role)[0].name
          .filter(name => name.languageCode === context.languageCode)[0].languageText
      })
    }
  }

  render () {
    const { ready, role } = this.state
    const { handleLogout, user } = this.props

    let context = this.context

    return (
      <Dropdown loading={!ready} disabled={!ready}
                trigger={<span><Icon name='user' color='blue' />{`${user.user} (${role})`}</span>}>
        <Dropdown.Menu direction='left'>
          <Dropdown.Item>
            <Dropdown icon={{ name: 'dropdown', style: { marginRight: '1em', paddingTop: '0.2em' } }}
                      text={`${UI.LANGUAGE[context.languageCode]} (${UI.LANGUAGE_CHOICE[context.languageCode]})`}>
              <Dropdown.Menu>
                {Object.keys(LANGUAGES).map(language =>
                  <Dropdown.Item key={language} name='languageCode' content={UI[language][context.languageCode]}
                                 value={LANGUAGES[language].languageCode}
                                 onClick={(event, data) => context.setLanguage(data.value)} />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to='/' icon={{ name: 'sign out', color: 'red', size: 'large' }}
                         content={UI.LOGOUT[context.languageCode]} onClick={handleLogout} data-testid='logout-button' />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default UserDropdown
