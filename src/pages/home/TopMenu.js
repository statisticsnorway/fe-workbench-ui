import React, { Component } from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'

import Status from './status/Status'
import UserDropdown from './UserDropdown'
import SearchField from '../../pages/search/SearchField'
import { SSBLogo } from '../../media/Logo'

class TopMenu extends Component {
  render () {
    const {languageCode, user} = this.props

    return (
      <Segment>
        <Grid stackable reversed='mobile'>
          <Grid.Column mobile={16} tablet={10} computer={12}>
            <Status languageCode={languageCode} user={user} />
          </Grid.Column>
          <Grid.Column only='tablet computer' tablet={6} computer={4} textAlign='right'>
            <UserDropdown {...this.props} />
            <Divider hidden />
            {SSBLogo('100%')}
            <Divider hidden />
            <SearchField alignement='right' languageCode={languageCode} />
          </Grid.Column>
          <Grid.Column only='mobile' width={16} textAlign='center'>
            {/* TODO: Fix <UserDropdown /> to be more fancy on mobile */}
            {SSBLogo('80%')}
            <Divider hidden />
            <SearchField alignement='left' languageCode={languageCode} />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default TopMenu
