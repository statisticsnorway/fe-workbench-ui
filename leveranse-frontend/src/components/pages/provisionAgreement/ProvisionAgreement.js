import React, {Component} from 'react';
import axios from 'axios';
import {Form, Input} from "semantic-ui-react";

class ProvisionAgreement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: '',
            frequency: '',
            pursuant: '',
            provisionDate: '',
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

    registerProvisionAgreement() {
        const self = this;
        let data = JSON.stringify({
            duration: this.state.duration,
            frequency: this.state.frequency,
            pursuant: this.state.pursuant,
            provisionDate: null,
            description: null,
            id: this.state.id,
            localeId: null,
            name: null,
            version: null,
            versionDate: null,
            versionRationale: null,
            administrativeDetails: {
                id: null,
                administrativeStatus: null,
                alias: null,
                annotation: null,
                documentation: null,
                createDate: null,
                createBy: null,
                lastUpdateDate: null,
                lifeCycleStatus: null,
                ControlledVocabulary: null,
                url: null,
                validFrom: null,
                validUntil: null,
                version: null
            }
        })
        axios.post('http://localhost:8080/api/v1/provisionAgreement', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            self.setState({id: response.data.id});
           // console.log(self.state.id);
        })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h3>Leveranseavtale</h3>
                <Form.Field>
                    <label>Navn på avtale</label>
                    <Input placeholder='navn' name='name' value={this.state.name}
                           onChange={this.handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Varighet</label>
                    <Input placeholder='Varighet' name='duration' value={this.state.duration}
                           onChange={this.handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Hyppighet</label>
                    <Input placeholder='hyppighet' name='frequency' value={this.state.frequency}
                           onChange={this.handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Hjemmel</label>
                    <Input placeholder='Hjemmel' name='pursuant' value={this.state.pursuant}
                           onChange={this.handleInputChange}/>
                </Form.Field>
            </div>
        );
    }
}

export default ProvisionAgreement;