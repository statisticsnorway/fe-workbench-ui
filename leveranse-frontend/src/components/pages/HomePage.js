import React from 'react'
import HeaderLogo from '../header/HeaderLogo'

import WorkbenchPage from './WorkbenchPage'

class HomePage extends React.Component {
  state = {
    loading: false,
    errors: {},
    activeItem: 'home'
  }

  render () {
    return (
      <div>
        <HeaderLogo/>
        <WorkbenchPage/>
      </div>
    )
  }
}

export default HomePage