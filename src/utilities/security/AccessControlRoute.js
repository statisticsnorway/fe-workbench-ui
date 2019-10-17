import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { WorkbenchContext } from "../../context/ContextProvider"

class AccessControlRoute extends Component {
  static contextType = WorkbenchContext

  constructor (props) {
    super(props)
    this.state = {
      access: false
    }
  }

  // TODO implement proper access check
  // componentWillMount () {
    // let { component: Component, ...rest } = this.props
    // console.log('Component: ', Component)
    // console.log('Rest: ', rest)
  // }

  render () {
    let { component: Component, ...rest } = this.props
    const context = this.context
    return (
      <Route {...rest} render={(props) => (
        context.user.userPrefs.preferences.role.length > 0 // TODO do proper access check
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