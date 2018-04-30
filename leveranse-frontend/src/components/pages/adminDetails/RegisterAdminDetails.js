import React, { Component } from 'react';

import {Form, Button} from "semantic-ui-react";
import axios from 'axios';

class RegisterAdminDetails extends Component {
  registerAdminDetails (e) {
    axios.post('http://localhost:8080/registerAdminDetails', {
      avtaleid: this.refs.avtaleid.value,
      datoOpprettet: this.refs.datoOpprettet.value,
      opprettetAv: this.refs.opprettetAv.value
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })

    e.preventDefault();
  }

  render () {
    return (
      <div>
        <h3>Administrative detaljer</h3>
          <Form onSubmit={this.registerAdminDetails.bind(this)}>
              <Form.Field>
                  <label>Avtale-ID</label>
                  <input placeholder='Avtale ID:..' ref="avtaleid"/>
              </Form.Field>
              <Form.Field>
                  <label>Dato opprettet</label>
                  <input placeholder='Dato opprettet..' ref="datoOpprettet"/>
              </Form.Field>
              <Form.Field>
                  <label>Opprettet av</label>
                  <input placeholder='Opprettet av..' ref="opprettetAv"/>
              </Form.Field>
              <Form.Field control={Button}>Submit</Form.Field>
          </Form>
      </div>
    );
  }
}

export default RegisterAdminDetails;