import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input } from "semantic-ui-react";

class AdministrativeDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: '',
      administrativeStatus: '',
      alias: '',
      annotation: '',
      documentation: '',
      createDate: '',
      createBy: '',
      lastUpdateDate: '',
      lifeCycleStatus: '',
      ControlledVocabulary: '',
      url: '',
      validFrom: '',
      validUntil: '',
      version: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  registerAdministrativeDetails () {
    let data = JSON.stringify({
      id: this.state.id,
      administrativeStatus: null,
      alias: this.state.alias,
      annotation: null,
      documentation: null,
      createDate: null,
      createBy: null,
      lastUpdateDate: null,
      lifeCycleStatus: null,
      ControlledVocabulary: null,
      url: this.state.url,
      validFrom: null,
      validUntil: null,
      version: null
    })

    axios.post('http://localhost:8080/api/v1/administrativeDetail', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <h3>Administrative detaljer</h3>
        <Form.Field>
          <label>Id:</label>
          <Input placeholder='Id' name='id' value={this.state.id} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Alias:</label>
          <Input placeholder='Alias' name='alias' value={this.state.alias} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Url:</label>
          <Input placeholder='Url' name='url' value={this.state.url} onChange={this.handleInputChange}/>
        </Form.Field>
      </div>
    );
  }
}

export default AdministrativeDetails;