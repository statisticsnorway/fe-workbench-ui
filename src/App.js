import React, { Component } from 'react'

import { WorkbenchContext } from './context/ContextProvider'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import UserPreferences from './pages/userconfig/UserPreferences'

import Properties from './properties/properties'
import { UserManager } from 'oidc-client'
import OidcSettings from './utilities/security/OidcSettings'

class App extends Component {
  static contextType = WorkbenchContext

  handleLogin = this.handleLogin.bind(this)
  onUserLoaded = this.onUserLoaded.bind(this)
  state = {
    user: null,
    isAuthenticated: false,
    error: false
  }

  componentDidMount() {
    if (!Properties.mock.auth) {
      this.initAuthentication()
    }
  }

  initAuthentication() {
    this.userManager = new UserManager(OidcSettings)
    this.userManager.events.addUserLoaded(this.onUserLoaded)
    this.userManager.events.addUserUnloaded(this.onUserUnloaded)
    this.userManager.getUser().then((user) => {
      if (user !== null && user !== undefined) {
        this.onUserLoaded(user)
      } else  {
        let hash = window.location.hash // returns a string
        hash = hash.length > 0 ? hash.substr(1) : '' // remove the # character
        let searchParams = new URLSearchParams(hash)
        if (searchParams.has('access_token')) {
          this.userManager.signinRedirectCallback().then(() => {
            window.history.replaceState({}, "", "/")
          }).catch(function (err) {
            console.log("Error signinRedirectCallback: ", err)
          })
        }
      }
    })
  }

  // Callback from UserManager
  onUserLoaded(user) {
    console.log("User loaded", user)
    this.setState({
      isAuthenticated: true,
      user : {
        id: user.profile.sub,
        name: user.profile.name,
        access_token: user.access_token
      }
    })
    this.handleUserPreferences(this.state.user.id)
  }

  onUserUnloaded() {
    this.setState({
      isAuthenticated: false,
      user: null,
      userPrefs: null
    })
  }

  handleLogin(username) {
    if (Properties.mock.auth) {
      this.setState({
        isAuthenticated: true,
        user : {
          id: username,
          name: username
        }
      })
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
      this.setState({ userPrefs: resolved[0] })
    ).catch( (error) => {
      console.error('Error logging in: ', error)
      this.setState({error: true})
    })
  }

  handlePreferenceUpdate = (userPrefs) => {
    let context = this.context
    return new Promise( (resolve, reject ) => {
      context.backendService.createOrUpdateUserPreferences(this.state.user.id, userPrefs)
        .then( () => this.setState({userPrefs: userPrefs}))
        .catch((error) => reject(error))
    })
  }

  handleLogout = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      userPrefs: null
    })
  }

  validateUserPrefs = (userPrefs) => {
    return userPrefs
      && userPrefs.preferences
      && userPrefs.preferences.language
      && userPrefs.preferences.role
      && userPrefs.preferences.dataResource
  }

  render() {
    const { error, ...user } = this.state

    if (!this.state.isAuthenticated || error) {
      return (
        <Login handleLogin={this.handleLogin} {...this.state} error={error}/>
      )
    } else if (!this.validateUserPrefs(user.userPrefs)) {
      return (
        <UserPreferences handleChange={this.handleChange} handleUpdate={this.handlePreferenceUpdate} user={user} />
        )
    } else {
      return (
        <Home handleLogout={this.handleLogout} {...user} />
      )
    }
  }
}

export default App
