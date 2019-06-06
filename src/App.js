import React, { Component } from 'react'

import { WorkbenchContext } from './context/ContextProvider'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import UserPreferences from './pages/userconfig/UserPreferences'

class App extends Component {
  static contextType = WorkbenchContext

  state = {
    user: null,
    error: false
  }

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleLogin = (username) => {
    let context = this.context
    let prefs = context.backendService.searchUserPreferences(username)

    prefs.then(resolved =>
      this.setState({ user: username, userPrefs: resolved[0] })
    ).catch( (error) => {
      console.error('Error logging in: ', error)
      this.setState({error: true})
    })
  }

  handlePreferenceUpdate = (userPrefs) => {
    let context = this.context
    return new Promise( (resolve, reject ) => {
      context.backendService.createOrUpdateUserPreferences(this.state.user, userPrefs)
        .then( () => this.setState({userPrefs: userPrefs}))
        .catch((error) => reject(error))
    })
  }

  handleLogout = () => {
    this.setState({
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

  render () {
    const { error, ...user } = this.state

    if (!user.user) {
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
