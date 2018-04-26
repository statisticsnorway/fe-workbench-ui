import React, { Component } from 'react';
import axios from 'axios';

class RegisterProvisionagreement extends Component {
  registerProvisonagreement (e) {
    axios.post('http://localhost:8080/registerProvisionagreement', {
      avtalenavn: this.refs.avtalenavn.value,
      varighet: this.refs.varighet.value,
      hjemmel: this.refs.hjemmel.value
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
        <h3>Leveranseavtale</h3>

        <form onSubmit={this.registerProvisonagreement.bind(this)}>
          <div>
            <label>Navn på avtale:</label><br/>
            <input type="text" ref="avtalenavn"/>
          </div>
          <div>
            <label>Varighet:</label><br/>
            <input type="text" ref="varighet"/>
          </div>
          <div>
            <label>Hjemmel:</label><br/>
            <input type="text" ref="hjemmel"/>
          </div>
          <br/>
          <input type="submit" value="Lagre"/>
        </form>
      </div>
    );
  }
}

export default RegisterProvisionagreement;