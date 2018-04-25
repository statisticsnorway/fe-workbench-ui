import React from 'react';
import {Segment, Image, Grid, Button, Responsive} from "semantic-ui-react";
import ssb_logo from '../../assets/SSB_logo.png';

var centerAlign = {
    textAlign: 'center'
};

class WelcomePage extends React.Component {

    handleClick = () => {
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="ui container">
                <Grid columns={1} centered>
                    <Grid.Row verticalAlign='top'>
                        <Grid.Column>
                            <div className='ui container'>

                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign='top'>
                        <Grid.Column>
                            <div className='ui container'>
                                <Image src={ssb_logo} size='large' centered/>
                            </div>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                <Segment textAlign='center' key='massive' size='massive' secondary>
                    Velkommen til Arbeidsbenk
                </Segment>
                <div className='ui container' style={centerAlign}>
                    <Button primary onClick={this.handleClick} size='huge'>Login</Button>
                </div>
            </div>
        )
    }
}

export default WelcomePage;