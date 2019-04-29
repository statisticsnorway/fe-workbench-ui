import React, { Component } from 'react'

import { ContextProvider } from './context/ContextProvider'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import UserPreferences from './pages/userconfig/UserPreferences'

class App extends Component {
  state = {
    dataResource: [],
    loggedIn: false,
    role: '',
    user: '',
    preferencesSet: false,
    service: null
  }

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleUpdate = (event) => {
    event.preventDefault()

    this.setState({ loggedIn: true })
    // TODO get preferences from backend, set this.state.preferencesSet if present
  }

  handlePreferenceUpdate = (event) => {
    event.preventDefault()
    this.setState({preferencesSet: true})
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      preferencesSet: false
    })
  }

  render () {
    const { ldsURL } = this.props
    const { loggedIn, preferencesSet, ...user } = this.state

    if (!loggedIn) {
      return (
        <Login handleChange={this.handleChange} handleLogin={this.handleUpdate} {...this.state} />
      )
    } else if (!preferencesSet) {
      return (
        <ContextProvider>
          <UserPreferences handleChange={this.handleChange} handleUpdate={this.handlePreferenceUpdate} {...this.state} />
        </ContextProvider>
        )
    } else {
      return (
        <ContextProvider>
          <Home graphqlURL={ldsURL + 'graphql'} handleLogout={this.handleLogout} {...user} />
        </ContextProvider>
      )
    }
  }
}

export default App
