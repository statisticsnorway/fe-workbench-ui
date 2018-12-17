import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container, Segment } from 'semantic-ui-react'

import Home from './pages/home/Home'
import Login from './pages/login/Login'

class App extends Component {
  state = {
    user: '',
    password: '',
    loggedIn: false,
    languageCode: localStorage.hasOwnProperty('languageCode') ? localStorage.getItem('languageCode') : 'en'
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLogin = () => {
    localStorage.setItem('user', this.state.user)

    this.setState({loggedIn: true})
  }

  handleLogout = () => {
    localStorage.removeItem('user')

    this.setState({loggedIn: false})
  }

  render () {
    const {lds} = this.props
    const {user, loggedIn, languageCode} = this.state

    return (
      <Segment basic>
        <Container fluid style={{marginTop: '5em'}}>
          <Switch>
            <Route exact path='/' render={() => (loggedIn ? (
                <Redirect to='home' />
              ) : (
                <Login {...this.state} handleChange={this.handleChange} handleLogin={this.handleLogin} />
              )
            )} />
            <Route path='/home' exact component={
              () => <Home lds={lds} user={user} languageCode={languageCode} handleLogout={this.handleLogout} />
            } />
          </Switch>
        </Container>
      </Segment>
    )
  }
}

export default App
