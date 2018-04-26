import React, { Component } from 'react';
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

        <form onSubmit={this.registerAdminDetails.bind(this)}>
          <div>
            <label>Avtale-ID:</label><br/>
            <input type="text" ref="avtaleid"/>
          </div>
          <div>
            <label>Dato opprettet:</label><br/>
            <input type="text" ref="datoOpprettet"/>
          </div>
          <div>
            <label>Opprettet av:</label><br/>
            <input type="text" ref="opprettetAv"/>
          </div>
          <br/>
          <input type="submit" value="Lagre"/>
        </form>
      </div>
    );
  }
}

export default RegisterAdminDetails;