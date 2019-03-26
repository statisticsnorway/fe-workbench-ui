import React, { Component } from 'react'

import Home from './pages/home/Home'
import Login from './pages/login/Login'

class App extends Component {
  state = {
    languageCode: 'en',
    loggedIn: false,
    password: '',
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
    const {languageCode} = this.state

    if (!this.state.loggedIn) {
      return <Login languageCode={languageCode} handleChange={this.handleChange} handleLogin={this.handleLogin} />
    } else {
      return <Home languageCode={languageCode} handleChange={this.handleChange} handleLogout={this.handleLogout} />
    }
  }
}

export default App
