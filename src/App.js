import React, { Component } from 'react'

import { ContextProvider } from './context/ContextProvider'
import Home from './pages/home/Home'
import Login from './pages/login/Login'

class App extends Component {
  state = {
    dataResource: [],
    loggedIn: false,
    role: '',
    user: ''
  }

  handleChange = (event, data) => {
    this.setState({[data.name]: data.value})
  }

  handleLogin = (event) => {
    event.preventDefault()

    this.setState({loggedIn: true})
  }

  handleLogout = () => {
    this.setState({loggedIn: false})
  }

  render () {
    const {ldsURL} = this.props
    const {loggedIn, ...user} = this.state

    if (!loggedIn) {
      return (
        <ContextProvider>
          <Login handleChange={this.handleChange} handleLogin={this.handleLogin} {...this.state} />
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
