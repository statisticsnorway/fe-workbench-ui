import React from 'react'
import { Divider, Grid, Segment, Transition } from 'semantic-ui-react'

import Status from '../status/Status'
import UserDropdown from '../UserDropdown'
import SearchField from '../../search/SearchField'
import { SSBLogo } from '../../../media/Logo'

const TopMenu = (props) => {
  const { handleLogout, toggleLeftMenuCallback, topMenuVisible, user, handlePreferenceUpdate } = props

  return (
      <Transition visible={topMenuVisible} animation='fade down' duration={200}>
        <Segment data-testid='topMenu' style={{ marginBottom: 0 }} attached onMouseEnter={toggleLeftMenuCallback}>
          <Grid stackable reversed='mobile'>
            <Grid.Column only='tablet computer' tablet={11} computer={13}>
              <Status user={user} />
            </Grid.Column>
            <Grid.Column only='tablet computer' tablet={5} computer={3} textAlign='right'>
              <UserDropdown handleLogout={handleLogout} user={user} handlePreferenceUpdate={handlePreferenceUpdate}/>
              <Divider hidden />
              {SSBLogo('100%')}
              <Divider hidden />
              <SearchField alignment='right' />
            </Grid.Column>
          </Grid>
        </Segment>
      </Transition>
  )
}

export default TopMenu
