import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'

import SearchField from '../search/SearchField'
import { SSBLogo } from '../../media/Logo'
import { LANGUAGES, UI } from '../../utilities/enum'
import { WorkbenchContext } from '../../context/ContextProvider'

class HomeMenu extends Component {
  static contextType = WorkbenchContext

  render () {
    const { handleLogout, client } = this.props
    let context = this.context

    return (
        <Menu fixed='top'>
          <Menu.Item as={Link} to='/' content={SSBLogo(180)}/>
          <Menu.Menu position='right'>
            <Menu.Item><SearchField client={client}/></Menu.Item>
            <Dropdown item text={`${UI.LANGUAGE[context.languageCode]} (${UI.LANGUAGE_CHOICE[context.languageCode]})`}>
              <Dropdown.Menu>
                {Object.keys(LANGUAGES).map(language =>
                  <Dropdown.Item key={language} name='languageCode' content={UI[language][context.languageCode]}
                                 value={LANGUAGES[language].languageCode} onClick={(event, data) => {
                    context.setLanguage(data.value)
                  }}/>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item as={Link} to='/' icon={{ name: 'sign out', color: 'red', size: 'large' }}
                       content={UI.LOGOUT[context.languageCode]} onClick={handleLogout} data-testid='logout-button'/>
          </Menu.Menu>
        </Menu>
    )
  }
}

export default HomeMenu
