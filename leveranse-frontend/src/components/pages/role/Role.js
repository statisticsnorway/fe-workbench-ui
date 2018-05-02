import React, { Component } from 'react';
import { Form, Input } from "semantic-ui-react";
import axios from 'axios';

class Role extends Component {
  constructor (props) {
    super(props);
    this.state = {
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

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  registerRole () {
    let data = JSON.stringify({
      description: null,
      id: this.state.id,
      localeId: this.state.localeId,
      name: this.state.name,
      version: null,
      versionDate: null,
      versionRationale: null,
      administrativeDetails: null
    })

    axios.post('http://localhost:8080/api/v1/role', data, {
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

  render () {
    return (
      <div>
        <h3>Rolle</h3>
        <Form.Field>
          <label>Navn:</label>
          <Input placeholder='Navn' name="name" value={this.state.name} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Id:</label>
          <Input placeholder='Id' name="id" value={this.state.id} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Lokal id:</label>
          <Input placeholder='Lokal id' name="localeId" value={this.state.localeId} onChange={this.handleInputChange}/>
        </Form.Field>
      </div>
    );
  }
}

export default Role;