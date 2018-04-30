import React, { Component } from 'react';
import axios from 'axios';
import {Form, Button} from "semantic-ui-react";

class RegisterAgent extends Component {
  registerAgent (e) {
      e.preventDefault();

      let data = JSON.stringify({
          contactPerson: this.refs.kontaktperson.value,
          email: this.refs.epost.value,
          phoneNumber: this.refs.telefon.value,
      })

    axios.post('http://localhost:8080/api/v1/agent', data,  {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render () {
    return (
      <div>
        <h3>Ny Aktør</h3>
          <Form onSubmit={this.registerAgent.bind(this)}>
              <Form.Field>
                  <label>Kontaktperson</label>
                  <input placeholder='Kontaktperson..' ref="kontaktperson"/>
              </Form.Field>
              <Form.Field>
                  <label>E-post</label>
                  <input placeholder='e-post..' ref="epost"/>
              </Form.Field>
              <Form.Field>
                  <label>Telefon</label>
                  <input placeholder='telefon..' ref="telefon"/>
              </Form.Field>
              <Form.Field control={Button}>Submit</Form.Field>
          </Form>

      </div>
    );
  }
}

export default RegisterAgent;