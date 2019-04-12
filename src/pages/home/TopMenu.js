import React, { Component } from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'

import Status from './status/Status'
import UserDropdown from './UserDropdown'
import SearchField from '../../pages/search/SearchField'
import { SSBLogo } from '../../media/Logo'

class TopMenu extends Component {
  render () {
    const {client, handleLogout, user} = this.props

    return (
      <Segment style={{marginBottom: 0}}>
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
    )
  }
}

export default TopMenu
