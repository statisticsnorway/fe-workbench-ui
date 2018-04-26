import React from 'react';
import HeaderLogo from '../header/HeaderLogo';
import TopNavigation from '../navigation/TopNavigation';
import LeveranseAvtale from "./LeveranseAvtale";


class HomePage extends React.Component {
    state = {
        loading: false,
        errors: {},
        activeItem: 'home'
    };

    render() {
        return (
            <div>
                <HeaderLogo/>
                <TopNavigation/>
                <LeveranseAvtale/>
                </div>
        );
    }
}

export default HomePage;