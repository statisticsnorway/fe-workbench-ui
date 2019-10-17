import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { WorkbenchContext } from './context/ContextProvider'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import UserPreferences from './pages/userconfig/UserPreferences'

import Properties from './properties/properties'
import { UserManager } from 'oidc-client'
import OidcSettings from './utilities/security/OidcSettings'
import { Segment } from 'semantic-ui-react'
import { LANGUAGES } from './utilities/enum'

class App extends Component {
  static contextType = WorkbenchContext

  state = {
    isAuthenticated: false,
    error: false,
    userPrefsReady: false
  }

  componentDidMount () {
    if (!Properties.mock.auth) {
      this.initAuthentication()
    }
    if (Properties.mock.user) {
      this.handleLogin(Properties.mock.user)
    }
  }

  initAuthentication () {
    this.userManager = new UserManager(OidcSettings)
    this.userManager.events.addUserLoaded(() => this.onUserLoaded)
    this.userManager.events.addUserUnloaded(this.onUserUnloaded)
    this.userManager.getUser().then((user) => {
      if (user !== null && user !== undefined && !user.expired) {
        this.onUserLoaded(user)
      } else {
        let hash = window.location.hash // returns a string
        hash = hash.length > 0 ? hash.substr(1) : '' // remove the # character
        let searchParams = new URLSearchParams(hash)
        if (searchParams.has('access_token')) {
          this.userManager.signinRedirectCallback().then(() => {
            this.props.history.replace({
              pathname: '/',
            })
            // Go back to the previous url (before login)
            this.props.history.goBack()
          }).catch(function (err) {
            console.log('Error signinRedirectCallback: ', err)
          })
        }
      }
    })
  }

// Callback from UserManager
  onUserLoaded(user) {
    const context = this.context
    console.log("User loaded", user.profile)
    this.setState({
      isAuthenticated: true,
    }, () => {
      context.setUser({
        id: user.profile.sub,
        name: user.profile.name,
        access_token: user.access_token
      })
      this.handleUserPreferences(user.profile.sub)
    })
  }

  onUserUnloaded() {
    const context = this.context
    this.setState({
      isAuthenticated: false,
      userPrefsReady: false
    }, () =>
      context.setUser(null))
  }

  handleLogin (username) {
    if (Properties.mock.auth) {
      const context = this.context
      this.setState({
        isAuthenticated: true,
      }, () => context.setUser({
        id: username,
        name: username
      }))
      this.handleUserPreferences(username)
    } else {
      this.userManager.signinRedirect().then(function () {
        console.log('signinRedirect ok')
      }).catch(function (err) {
        console.log('signinRedirect error:', err)
      })
    }
  }

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleUserPreferences = (userId) => {
    let context = this.context
    let prefs = context.backendService.searchUserPreferences(userId)

    prefs.then(resolved =>
      this.setState({ userPrefsReady: true },
        () => context.updateUserPrefs(resolved[0]))
    ).catch((error) => {
      console.error('Error logging in: ', error)
      this.setState({ error: true })
    })
  }

  handlePreferenceUpdate = (userPrefs) => {
    let context = this.context
    return new Promise( (resolve, reject ) => {
      context.backendService.createOrUpdateUserPreferences(context.user.id, userPrefs)
        .then( () => {
          let context = this.context
          // Update language
          context.setLanguage(LANGUAGES[userPrefs.preferences.language].languageCode)
          resolve(context.updateUserPrefs(userPrefs))
        })
        .catch((error) => reject(error))
    })
  }

  handleLogout = () => {
    const context = this.context
    this.setState({
      isAuthenticated: false,
      userPrefsReady: false
    }, () => context.setUser(null))
  }

  validateUserPrefs = (userPrefs) => {
    return userPrefs
      && userPrefs.preferences
      && userPrefs.preferences.language
      && userPrefs.preferences.role
      && userPrefs.preferences.dataResource
      && userPrefs.preferences.lds
  }

  render() {
    const context = this.context
    const { error, userPrefsReady } = this.state

    if (!this.state.isAuthenticated || error) {
      return (
        <Login handleLogin={(username) => this.handleLogin(username)} {...this.state} error={error}/>
      )
    } else if (!userPrefsReady) {
      return (
        <Segment basic loading style={{ paddingTop: '500px' }} data-testid='userprefs-spinner'/>
      )
    } else if (!this.validateUserPrefs(context.user.userPrefs)) {
      return (
        <UserPreferences fullscreen={true} handleUpdate={this.handlePreferenceUpdate}/>
        )
    } else {
      return (
        <Home handleLogout={this.handleLogout} handlePreferenceUpdate={this.handlePreferenceUpdate} />
      )
    }
  }
}

export default withRouter(App)
