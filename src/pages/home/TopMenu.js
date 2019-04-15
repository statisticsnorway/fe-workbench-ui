import React, { Component } from 'react'
import { Button, Divider, Grid, Segment, Transition } from 'semantic-ui-react'

import Status from './status/Status'
import UserDropdown from './UserDropdown'
import SearchField from '../../pages/search/SearchField'
import { SSBLogo } from '../../media/Logo'

class TopMenu extends Component {
  state = { visible: true }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render () {
    const { client, handleLogout, user } = this.props
    const { visible } = this.state

    return (
      <div>
        <Transition visible={visible} animation='fade down' duration={200}>
          <Segment style={{ marginBottom: 0 }} attached>
            <Grid stackable reversed='mobile'>
              <Grid.Column only='tablet computer' tablet={11} computer={13}>
                <Status user={user} />
              </Grid.Column>
              <Grid.Column only='tablet computer' tablet={5} computer={3} textAlign='right'>
                <UserDropdown handleLogout={handleLogout} user={user} />
                <Divider hidden />
                {SSBLogo('100%')}
                <Divider hidden />
                <SearchField alignement='right' client={client} />
              </Grid.Column>
            </Grid>
          </Segment>
        </Transition>
        <Button attached='bottom' basic icon={visible ? 'chevron up' : 'chevron down'}
                onClick={this.toggleVisibility} data-testid='topMenu-toggle' />
      </div>
    )
  }
}

export default TopMenu
