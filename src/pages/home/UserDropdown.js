import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, List } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { UI } from '../../utilities/enum'

class UserDropdown extends Component {
  static contextType = WorkbenchContext

  render () {
    const { handleLogout, user } = this.props

    let context = this.context

    return (
      <Dropdown trigger={<span><Icon name='user' color='blue' />{`${user.user.name}`}</span>}>
        <Dropdown.Menu direction='left'>
          <Dropdown.Item as={Link} to='/preferences' icon={{ name: 'setting', color: 'blue', size: 'large' }}
                         content={UI.PREFERENCES[context.languageCode]} data-testid='preferences-button' />
          <Dropdown.Item as={Link} to='/' icon={{ name: 'sign out', color: 'red', size: 'large' }}
                         content={UI.LOGOUT[context.languageCode]} onClick={handleLogout} data-testid='logout-button' />
          <Dropdown.Divider />
          <Dropdown.Item as={List} horizontal divided link size='small'>
            <List.Item as='a' href={`${process.env.REACT_APP_SOURCE_URL}`} icon={{ fitted: true, name: 'github' }} />
            <List.Item content={`${UI.APP_VERSION[context.languageCode]}: ${process.env.REACT_APP_VERSION}`} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default UserDropdown
