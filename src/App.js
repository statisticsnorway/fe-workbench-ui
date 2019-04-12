import React, { Component } from 'react'

import Home from './pages/home/Home'
import Login from './pages/login/Login'

class App extends Component {
  state = {
    dataResource: [],
    languageCode: 'en',
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
    const {languageCode, loggedIn, ...user} = this.state

    if (!loggedIn) {
      return <Login languageCode={languageCode} handleChange={this.handleChange} handleLogin={this.handleLogin}
                    {...this.state} />
    } else {
      return <Home graphqlURL={this.props.ldsURL + 'graphql'} languageCode={languageCode}
                   handleChange={this.handleChange} handleLogout={this.handleLogout} user={user} />
    }
  }
}

export default App
