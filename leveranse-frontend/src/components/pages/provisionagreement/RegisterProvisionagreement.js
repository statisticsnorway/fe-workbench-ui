import React, {Component} from 'react';
import {Form, Button} from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';

class RegisterProvisionagreement extends Component {
    registerProvisonagreement(e) {

        let data = JSON.stringify({
            name: this.refs.avtalenavn.value,
            frequency: this.refs.hyppighet.value,
            pursuant: this.refs.hjemmel.value,
            duration: this.refs.varighet.value
        })

        axios.post('http://localhost:8080/api/v1/provisionAgreement', data , {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
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
                        <input placeholder='navn på avtale..' ref="avtalenavn"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Varighet</label>
                        <input placeholder='varighet..' ref="varighet"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hjemmel</label>
                        <input placeholder='hjemmel..' ref="hjemmel"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hyppighet</label>
                        <input placeholder='hyppighet..' ref="hyppighet"/>
                    </Form.Field>
                    <Form.Field control={Button}>Submit</Form.Field>
                </Form>
            </div>
        );
    }
}

export default RegisterProvisionagreement;