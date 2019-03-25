import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container, Segment } from 'semantic-ui-react'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import NotFound from './pages/404/NotFound'

class App extends Component {
  state = {
    user: '',
    password: '',
    loggedIn: false,
    languageCode: 'en'
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLogin = () => {
    this.setState({loggedIn: true})
  }

  handleLogout = () => {
    this.setState({loggedIn: false})
  }

  render () {
    const {lds} = this.props
    const {user, loggedIn, languageCode} = this.state

    return (
      <Segment basic>
        <Container fluid style={{marginTop: '5em'}}>
          {!loggedIn ? <Login {...this.state} handleChange={this.handleChange} handleLogin={this.handleLogin} /> :
            <Switch>
              <Route exact path='/' render={() => (!loggedIn ? (
                  <Login {...this.state} handleChange={this.handleChange} handleLogin={this.handleLogin} />
                ) : (
                  <Redirect to='home' />
                )
              )} />
              <Route path='/home' render={
                ({location}) => <Home lds={lds} user={user} handleLogout={this.handleLogout} location={location}/>
              } />
              <Route component={({location}) => <NotFound location={location} languageCode={languageCode} />} />
            </Switch>
          }
        </Container>
      </Segment>
    )
  }
}

export default App
