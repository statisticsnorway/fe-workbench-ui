import React from 'react'
import { Message } from 'semantic-ui-react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { history } from '../_helpers'
import { alertActions } from '../_actions'
import { PrivateRoute } from '../_components'
import { HomePage } from '../_pages/homePage'
import { LoginPage } from '../_pages/loginPage'
import { RegisterPage } from '../_pages/registerPage'
import WelcomePage from '../_pages/WelcomePage'

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
              <PrivateRoute exact path="/home" component={HomePage}/>
              <Route path='/' exact component={WelcomePage}/>
              <Route path='/login' exact component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
              {alert.message &&
              <Message negative><Message.Header>{alert.message}</Message.Header>
              </Message>
              }
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