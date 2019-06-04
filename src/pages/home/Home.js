import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Button, Container, Grid, Icon, Sidebar } from 'semantic-ui-react'

import DatasetView from '../dataset/DatasetView'
import TopMenu from './TopMenu'
import SearchPage from '../search/SearchPage'
import Dashboard from '../collection/Dashboard'
import CollectionSetup from '../collection/CollectionSetup'
import PrepAnalsysis from '../prep_and_analysis/PrepAnalsysis'
import PrepAnalysisSetup from '../prep_and_analysis/PrepAnalysisSetup'
import MethodLibrary from '../prep_and_analysis/MethodLibrary'
import Import from '../metadata/Import'
import GsimBrowser from '../metadata/GsimBrowser'
import WorkbenchSidebar from '../../menu/WorkbenchSidebar'
import AccessControlRoute from '../../utilities/security/AccessControlRoute'
import NoAccess from '../../utilities/security/NoAccess'
import UserPreferences from '../userconfig/UserPreferences'
import { WorkbenchContext } from '../../context/ContextProvider'
import { LANGUAGES } from '../../utilities/enum/LANGUAGES'

class Home extends Component {
  static contextType = WorkbenchContext
  state = {
    animation: 'push',
    direction: 'left',
    visible: true
  }

  componentWillMount () {
    // Set initial language based on user prefs
    this.context.setLanguage(LANGUAGES[this.props.userPrefs !== undefined
      ? this.props.userPrefs.preferences.language
      : this.context.languageCode].languageCode)
    // Prevent scrollbar for main window
    document.body.style.overflow = 'hidden'
  }

  handleAnimationChange = () => () => {
    this.setState({ visible: !this.state.visible })
  }

  handleSubmit = (userPrefs) => {
    let context = this.context
    return context.backendService.createOrUpdateUserPreferences(this.props.user, userPrefs)
  }

  render () {
    const { handleLogout, ...user } = this.props
    const { animation, direction, visible } = this.state

    return (
      <div>
        <TopMenu handleLogout={handleLogout} user={user} />
        <div style={{ height: '100vh' }}>
          <Sidebar.Pushable as={Container} fluid>
            <Button style={{ position: 'fixed', top: '15px', left: '15px', zIndex: 3 }} fixed='top' icon
                    onClick={this.handleAnimationChange()} data-testid='leftMenu-show'>
              <Icon name='bars' />
            </Button>
            <WorkbenchSidebar
              style={{ zIndex: 4 }}
              animation={animation}
              direction={direction}
              visible={visible}
              closeCallback={this.handleAnimationChange()}
              user={user}
            />
            <Sidebar.Pusher dimmed={false}>
              <Grid stretched centered style={{ paddingTop: '15px' }}>
                <Grid.Row>  {/*Main row for layout*/}
                  <Grid.Column floated='left' width={1}> {/*Left padding column*/}
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <AccessControlRoute user={user} path='/search' component={SearchPage} />
                    <AccessControlRoute user={user} path='/dataset/:id' component={DatasetView} />
                    <AccessControlRoute user={user} path='/collection/dashboard' component={Dashboard} />
                    <AccessControlRoute user={user} path='/collection/setup' component={CollectionSetup} />
                    <AccessControlRoute user={user} path='/prep/analysis' component={PrepAnalsysis} />
                    <AccessControlRoute user={user} path='/prep/setup' component={PrepAnalysisSetup} />
                    <AccessControlRoute user={user} path='/prep/methodlibrary' component={MethodLibrary} />
                    <AccessControlRoute user={user} path='/metadata/import' component={Import} />
                    <AccessControlRoute user={user} path='/metadata/gsimbrowser' component={GsimBrowser} />
                    <AccessControlRoute user={user} path='/preferences' component={UserPreferences} handleUpdate={this.handleSubmit}/>
                    <Route user={user} path='/noaccess' component={NoAccess} />
                  </Grid.Column>
                  <Grid.Column floated='right' width={1}> {/*Right padding column*/}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    )
  }
}

export default Home
