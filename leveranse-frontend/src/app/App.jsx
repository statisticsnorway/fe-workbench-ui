import React from 'react'
import { Message } from 'semantic-ui-react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { history } from '../helpers'
import { alertActions } from '../actions'
import { PrivateRoute } from '../components'
import { HomePage } from '../pages/homePage'
import { LoginPage } from '../pages/loginPage'
import { RegisterPage } from '../pages/registerPage'
import WelcomePage from '../pages/WelcomePage'

class App extends React.Component {
  constructor (props) {
    super(props)

    const {dispatch} = this.props
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear())
    })
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
              <Route path="/register" component={RegisterPage}/>
            </div>
          </Router>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {alert} = state
  return {
    alert
  }
}

const connectedApp = connect(mapStateToProps)(App)
export { connectedApp as App }