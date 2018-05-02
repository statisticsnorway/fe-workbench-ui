import React, {Component} from 'react';
import axios from 'axios';
import {Form, Input} from "semantic-ui-react";

class Agent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactPerson: '',
            email: '',
            phoneNumber: '',
            description: '',
            id: '',
            localeId: '',
            name: '',
            version: '',
            versionDate: '',
            versionRationale: '',
            administrativeDetails: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    registerAgent() {
        let data = JSON.stringify({
            contactPerson: this.state.contactPerson,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            description: null,
            id: null,
            localeId: null,
            name: null,
            version: null,
            versionDate: null,
            versionRationale: null,
            administrativeDetails: null
        })

        axios.post('http://localhost:8080/api/v1/agent', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h3>Aktør</h3>
                <Form.Field>
                    <label>Kontaktperson</label>
                    <Input placeholder='Kontaktperson' name='contactPerson' value={this.state.contactPerson}
                           onChange={this.handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <label>E-post</label>
                    <Input placeholder='Epost' name='email' value={this.state.email} onChange={this.handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Telefon</label>
                    <Input placeholder='Telefon' name='phoneNumber' value={this.state.phoneNumber}
                           onChange={this.handleInputChange}/>
                </Form.Field>
            </div>
        );
    }
}

export default Agent;