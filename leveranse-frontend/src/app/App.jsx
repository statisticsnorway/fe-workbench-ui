import React from 'react'
import { Router, Route } from 'react-router-dom'
import { history } from '../helpers'
import { PrivateRoute } from '../components'
import { HomePage } from '../pages/homePage'
import { LoginPage } from '../pages/loginPage'
import { RegisterPage } from '../pages/registerPage'
import WelcomePage from '../pages/WelcomePage'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {alert} = this.props
    return (
      <div className="ui container">
        <div>
          <Router history={history}>
            <div>
              <PrivateRoute path="/home" exact component={HomePage}/>
              <Route path='/' exact component={WelcomePage}/>
              <Route path='/login' exact component={LoginPage}/>
            </div>
          </Router>
        </div>
      </div>
    )
  }
}

export default App