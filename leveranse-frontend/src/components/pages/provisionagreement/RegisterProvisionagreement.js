import React, {Component} from 'react';
import {Form, Button} from "semantic-ui-react";

import axios from 'axios';

class RegisterProvisionagreement extends Component {
    registerProvisonagreement(e) {
        axios.post('http://localhost:8080/registerProvisionagreement', {
            avtalenavn: this.refs.avtalenavn.value,
            varighet: this.refs.varighet.value,
            hjemmel: this.refs.hjemmel.value
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })

        e.preventDefault();
    }

    state = {}

    handleChange = (e, {value}) => this.setState({value})

    render() {
        return (
            <div>
                <h3>Leveranseavtale</h3>
                <Form onSubmit={this.registerProvisonagreement.bind(this)}>
                    <Form.Field>
                        <label>Navn på avtale</label>
                        <input placeholder='Navn på avtale..' ref="avtalenavn"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Varighet</label>
                        <input placeholder='Varighet..' ref="varighet"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hjemmel</label>
                        <input placeholder='Hjemmel..' ref="hjemmel"/>
                    </Form.Field>
                    <Form.Field control={Button}>Submit</Form.Field>
                </Form>
            </div>
        );
    }
}

export default RegisterProvisionagreement;