import React from 'react';
import HeaderLogo from '../header/HeaderLogo';
import TopNavigation from '../navigation/TopNavigation';
import ProvisionAgreementPage from "./ProvisionAgreementPage";

class HomePage extends React.Component {
  state = {
    loading: false,
    errors: {},
    activeItem: 'home'
  };

  render () {
    return (
      <div>
        <HeaderLogo/>
        <TopNavigation/>
        <ProvisionAgreementPage/>
      </div>
    );
  }
}

export default HomePage;