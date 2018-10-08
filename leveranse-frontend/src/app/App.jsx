import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Router } from 'react-router-dom'
import { history } from '../helpers'
import { PrivateRoute } from '../components'
import { HomePage } from '../pages/homePage'
import { LoginPage } from '../pages/loginPage'
import WelcomePage from '../pages/WelcomePage'
import { Container } from 'semantic-ui-react'
import {Helmet} from "react-helmet";

class App extends React.Component {
  render () {
    return (
      <Container fluid>
        <Router history={history}>
          <div>
            <Helmet>
              <meta charSet="utf-8" />
              <title>MOD Arbeidsbenk</title>
            </Helmet>
            <PrivateRoute path='/home' exact component={HomePage} />
            <Route path='/' exact component={WelcomePage} />
            <Route path='/login' exact component={LoginPage} />
          </div>
        </Router>
      </Container>
    )
  }
}

export default hot(module)(App)
