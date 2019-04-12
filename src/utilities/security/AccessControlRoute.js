import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

class AccessControlRoute extends Component {

  constructor (props) {
    super(props)
    this.state = {
      access: false
    }
  }

  // componentWillMount () {
    // let { component: Component, ...rest } = this.props
    // console.log('Component: ', Component)
    // console.log('Rest: ', rest)
  // }

  render () {
    let { component: Component, user, ...rest } = this.props
    return (
      <Route {...rest} render={(props) => (
        user.role.length > 0
          ? <Component {...props} {...rest} />
          : <Redirect to={{
            pathname: '/noaccess',
            state: { from: props.location }
          }}/>
      )}/>
    )
  }

}

export default AccessControlRoute