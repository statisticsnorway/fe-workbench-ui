import React from 'react'
import { Grid } from 'semantic-ui-react'
import HeaderLogo from '../header/HeaderLogo'

import ProvisionAgreementPage from './ProvisionAgreementPage'

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
        <ProvisionAgreementPage/>
      </div>
    )
  }
}

export default HomePage