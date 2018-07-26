import React from 'react'
import { Route, Router } from 'react-router-dom'
import { history } from '../helpers'
import { PrivateRoute } from '../components'
import { HomePage } from '../pages/homePage'
import { LoginPage } from '../pages/loginPage'
import WelcomePage from '../pages/WelcomePage'
import { Container } from 'semantic-ui-react'

class App extends React.Component {
  render () {
    return (
      <Container fluid>
        <Router history={history}>
          <div>
            <PrivateRoute path='/home' exact component={HomePage} />
            <Route path='/' exact component={WelcomePage} />
            <Route path='/login' exact component={LoginPage} />
          </div>
        </Router>
      </Container>
    )
  }
}

export default App