import React, { Component } from 'react';
import axios from 'axios';

class RegisterAgent extends Component {
  registerAgent (e) {
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

    e.preventDefault();
  }

  render () {
    return (
      <div>
        <h3>Ny Aktør</h3>

        <form onSubmit={this.registerAgent.bind(this)}>
          <div>
            <label>Kontaktperson:</label><br/>
            <input type="text" ref="kontaktperson"/>
          </div>
          <div>
            <label>E-post:</label><br/>
            <input type="text" ref="epost"/>
          </div>
          <div>
            <label>Telefon:</label><br/>
            <input type="text" ref="telefon"/>
          </div>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default RegisterAgent;