import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { LANGUAGES, UI } from '../../utilities/enum'

class UserDropdown extends Component {
  static contextType = WorkbenchContext

  render () {
    const { handleLogout, user } = this.props

    let context = this.context

    return (
      <Dropdown trigger={<span><Icon name='user' color='blue' />{`${user.user}`}</span>}>
        <Dropdown.Menu direction='left'>
          <Dropdown.Item>
            <Dropdown icon={{ name: 'dropdown', style: { marginRight: '1em', paddingTop: '0.2em' } }}
                      text={`${UI.LANGUAGE[context.languageCode]} (${UI.LANGUAGE_CHOICE[context.languageCode]})`}>
              <Dropdown.Menu>
                {Object.keys(LANGUAGES).map(language =>
                  <Dropdown.Item key={language} name='languageCode' content={UI[LANGUAGES[language].name][context.languageCode]}
                                 value={LANGUAGES[language].languageCode}
                                 onClick={(event, data) => context.setLanguage(data.value)} />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to='/preferences' icon={{ name: 'setting', color: 'blue', size: 'large' }}
                         content={UI.PREFERENCES[context.languageCode]} data-testid='preferences-button'/>
          <Dropdown.Item as={Link} to='/' icon={{ name: 'sign out', color: 'red', size: 'large' }}
                         content={UI.LOGOUT[context.languageCode]} onClick={handleLogout} data-testid='logout-button' />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default UserDropdown
