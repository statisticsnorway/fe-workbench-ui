import React, { Component } from 'react';
import axios from 'axios';
import {Form, Button} from "semantic-ui-react";

class RegisterAgent extends Component {
  registerAgent (e) {
    e.preventDefault();

    axios.post('http://localhost:8080/registerAgent', {
      kontaktperson: this.refs.kontaktperson.value,
      epost: this.refs.epost.value,
      telefon: this.refs.telefon.value
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
        <h3>Ny Aktør</h3>
          <Form onSubmit={this.registerAgent.bind(this)}>
              <Form.Field>
                  <label>Kontaktperson</label>
                  <input placeholder='Navn på avtale..' ref="kontaktperson"/>
              </Form.Field>
              <Form.Field>
                  <label>E-post</label>
                  <input placeholder='Varighet..' ref="epost"/>
              </Form.Field>
              <Form.Field>
                  <label>Telefon</label>
                  <input placeholder='Telefon..' ref="telefon"/>
              </Form.Field>
              <Form.Field control={Button}>Submit</Form.Field>
          </Form>

      </div>
    );
  }
}

export default RegisterAgent;