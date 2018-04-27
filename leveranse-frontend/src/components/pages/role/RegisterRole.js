import React, { Component } from 'react';
import {Form, Button} from "semantic-ui-react";
import axios from 'axios';

class RegisterRole extends Component {
  constructor () {
    super();
    this.state = {
      newRole: {}
    }
  }

  handleChange () {
    this.setState({
      newRole: {
        kontaktperson: this.refs.kontaktperson.value,
        epost: this.refs.epost.value,
        telefon: this.refs.telefon.value
      }
    })
  }

  handleSubmit (e) {
    e.preventDefault();

    let role = this.state.newRole
    axios.post('http://localhost:8080/registerRole', {
      role
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
        <h3>Ny Rolle</h3>
          <Form onSubmit={this.handleSubmit.bind(this)}>
              <Form.Field>
                  <label>Kontaktperson</label>
                  <input placeholder='Navn..' ref="avtalenavn"/>
              </Form.Field>
              <Form.Field>
                  <label>E-post:</label>
                  <input placeholder='E-post..' ref="epost"/>
              </Form.Field>
              <Form.Field>
                  <label>Telefon:</label>
                  <input placeholder='telefon..' ref="telefon"/>
              </Form.Field>
              <Form.Field control={Button}>Submit</Form.Field>
          </Form>
      </div>
    );
  }
}

export default RegisterRole;