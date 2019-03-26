import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'

import SearchField from '../search/SearchField'
import { SSBLogo } from '../../media/Logo'
import { LANGUAGES, UI } from '../../utilities/enum'

class HomeMenu extends Component {
  render () {
    const {handleChange, handleLogout, languageCode} = this.props

    return (
      <Menu fixed='top'>
        <Menu.Item as={Link} to='/' content={SSBLogo(180)} />
        <Menu.Menu position='right'>
          <Menu.Item><SearchField /></Menu.Item>
          <Dropdown item text={`${UI.LANGUAGE[languageCode]} (${UI.LANGUAGE_CHOICE[languageCode]})`}>
            <Dropdown.Menu>
              {Object.keys(LANGUAGES).map(language =>
                <Dropdown.Item key={language} name='languageCode' content={UI[language][languageCode]}
                               value={LANGUAGES[language].languageCode} onClick={handleChange} />
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item as={Link} to='/' icon={{name: 'sign out', color: 'red', size: 'large'}}
                     content={UI.LOGOUT[languageCode]} onClick={handleLogout} data-testid='logout-button' />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default HomeMenu
