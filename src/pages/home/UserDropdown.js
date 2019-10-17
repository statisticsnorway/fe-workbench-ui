import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Header, Icon, List, Modal } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { UI } from '../../utilities/enum'
import UserPreferences from '../userconfig/UserPreferences'

class UserDropdown extends Component {
  static contextType = WorkbenchContext

  state = {
    showPreferences: this.props.showPreferences
  }

  render () {
    const { handleLogout, handlePreferenceUpdate } = this.props
    const handleCancel = () => this.setState({showPreferences: false})

    let context = this.context

    return (
      <>
        <Dropdown trigger={<span><Icon name='user' color='blue'/>{`${context.user.name}`}</span>}>
          <Dropdown.Menu direction='left'>
            <Dropdown.Item onClick={() => this.setState({showPreferences: true})}
                           icon={{ name: 'setting', color: 'blue', size: 'large' }}
                           content={context.getLocalizedText(UI.PREFERENCES)} data-testid='preferences-button'/>
            <Dropdown.Item as={Link} to='/' icon={{ name: 'sign out', color: 'red', size: 'large' }}
                           content={context.getLocalizedText(UI.LOGOUT)} onClick={handleLogout}
                           data-testid='logout-button'/>
            <Dropdown.Divider/>
            <Dropdown.Item as={List} horizontal divided link size='small'>
              <List.Item as='a' href={`${process.env.REACT_APP_SOURCE_URL}`} icon={{ fitted: true, name: 'github' }}/>
              <List.Item content={`${context.getLocalizedText(UI.APP_VERSION)}: ${process.env.REACT_APP_VERSION}`}/>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Modal open={this.state.showPreferences} closeIcon onClose={handleCancel} size='mini'>
          <Header icon='setting' color='blue' content='Brukerinstillinger' />
          <Modal.Content>
            <UserPreferences handleCancel={handleCancel} handleUpdate={handlePreferenceUpdate}/>
          </Modal.Content>
        </Modal>
      </>
    )
  }
}

export default UserDropdown
