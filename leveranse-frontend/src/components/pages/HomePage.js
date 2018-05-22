import React from 'react'
import HeaderLogo from '../header/HeaderLogo'

import ContactPerson from './contactPerson/ContactPerson'
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
        <ContactPerson/>
      </div>
    )
  }
}

export default HomePage