import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { Grid } from 'semantic-ui-react'

import DatasetView from '../dataset/DatasetView'
import SearchPage from '../search/SearchPage'
import Dashboard from '../collection/Dashboard'
import CollectionSetup from '../collection/CollectionSetup'
import PrepAnalsysis from '../prep_and_analysis/PrepAnalsysis'
import PrepAnalysisSetup from '../prep_and_analysis/PrepAnalysisSetup'
import MethodLibrary from '../prep_and_analysis/MethodLibrary'
import Import from '../metadata/Import'
import GsimBrowser from '../metadata/GsimBrowser'
import AccessControlRoute from '../../utilities/security/AccessControlRoute'
import NoAccess from '../../utilities/security/NoAccess'
import UserPreferences from '../userconfig/UserPreferences'
import { WorkbenchContext } from '../../context/ContextProvider'
import { LANGUAGES } from '../../utilities/enum/LANGUAGES'
import NotebookAdmin from '../prep_and_analysis/NotebookAdmin'
import DatasetPreview from '../dataset/DatasetPreview'
import NotificationPopup from "../../utilities/NotificationPopup"
import Variable from '../variable/Variable'
import './homeStyles.css'
import MenuComponent from "./menu/MenuComponent"

class Home extends Component {
  static contextType = WorkbenchContext
  state = {
    animation: 'scale down',
    direction: 'left',
    leftMenuVisible: false,
    topMenuVisible: true,
    topMenuHeight: '238px'
  }

  // TODO see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillMount () {
    // Set initial language based on user prefs
    this.context.setLanguage(LANGUAGES[this.props.userPrefs !== undefined
      ? this.props.userPrefs.preferences.language
      : this.context.languageCode].languageCode)
    // Prevent scrollbar for main window
    document.body.style.overflow = 'hidden'
  }

  toggleLeftMenuVisibility = (visible) => {
    this.setState({ leftMenuVisible: visible })
  }

  toggleTopMenuVisibility = (visible) => {
    this.setState({ topMenuVisible: visible })
    this.setTopMenuHeight(visible)
  }

  handleSubmit = (userPrefs) => {
    let context = this.context
    return context.backendService.createOrUpdateUserPreferences(this.props.user, userPrefs)
  }

  // TODO should be a better way to solve this (TopMenu is not considered in the size of the main
  // component, but the size of the scrollbar is, which means that it is not possible to scroll to
  // rock bottom without calculating the height on render
  setTopMenuHeight = (visible) => {
    this.setState({
      topMenuHeight: visible ? '238px' : '36px'
    })
  }

  render () {
    const { handleLogout, ...user } = this.props
    const { topMenuVisible, leftMenuVisible, topMenuHeight } = this.state
    const context = this.context

    return (
      <div>
        {context.notification &&
        <NotificationPopup open={context.notification}
                           type={context.notificationType}
                           text={context.notificationMessage}/>}
        <MenuComponent
          topMenuVisible={topMenuVisible}
          leftMenuVisible={leftMenuVisible}
          toggleTopMenuCallback={this.toggleTopMenuVisibility}
          toggleLeftMenuCallback={this.toggleLeftMenuVisibility}
          handleLogout={handleLogout}
          user={user}
        />
        <div style={{ height: `calc(100vh - ${topMenuHeight}` }}>
          <div>
            <Grid stretched centered style={{ paddingTop: '15px', paddingLeft: '10px' }}>
              <Grid.Row>  {/*Main row for layout*/}
                <Grid.Column style={{ transition: 'all 1s' }} width={16}>
                  <AccessControlRoute user={user} path='/search' component={SearchPage}/>
                  <AccessControlRoute user={user} path='/variable/:id' component={Variable}/>
                  <AccessControlRoute user={user} path='/dataset/:id' component={DatasetPreview}/>
                  <AccessControlRoute user={user} path='/dataset/:id/data' component={DatasetView}/>
                  <AccessControlRoute user={user} path='/collection/dashboard' component={Dashboard}/>
                  <AccessControlRoute user={user} path='/collection/setup' component={CollectionSetup}/>
                  <AccessControlRoute user={user} path='/prep/notebooks' component={NotebookAdmin}/>
                  <AccessControlRoute user={user} path='/prep/analysis' component={PrepAnalsysis}/>
                  <AccessControlRoute user={user} path='/prep/setup' component={PrepAnalysisSetup}/>
                  <AccessControlRoute user={user} path='/prep/methodlibrary' component={MethodLibrary}/>
                  <AccessControlRoute user={user} path='/metadata/import' component={Import}/>
                  <AccessControlRoute user={user} path='/metadata/gsimbrowser' component={GsimBrowser}/>
                  <AccessControlRoute user={user} path='/preferences' component={UserPreferences}
                                      handleUpdate={this.handleSubmit}/>
                  <Route user={user} path='/noaccess' component={NoAccess}/>
                </Grid.Column>
                <Grid.Column floated='right' width={1}> {/*Right padding column*/}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
