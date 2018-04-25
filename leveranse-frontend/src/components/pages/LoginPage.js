import React from 'react';
import {Image, Grid} from "semantic-ui-react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //to connect react to redux
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth"
import ssb_logo from '../../assets/SSB_logo.png';


class LoginPage extends React.Component{

    //If all ok, then send the user to the homepage ( if the credentials are fine )
    submit = data => this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
            <div>
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
                                <Image src={ssb_logo} size='medium' centered/>
                            </div>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                <h1 align="center">Arbeidsbenk</h1>
                <LoginForm submit={this.submit}/>
            </div>
        )
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};


export default connect(null, {login})(LoginPage); // connect login page to redux