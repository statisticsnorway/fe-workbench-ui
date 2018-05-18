import React from 'react'
import { Grid } from 'semantic-ui-react'
import HeaderLogo from '../header/HeaderLogo'

import ArbeidsbenkPage from './ArbeidsbenkPage'

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
        <ArbeidsbenkPage/>
      </div>
    )
  }
}

export default HomePage