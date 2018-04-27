import React, { Component } from 'react';
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
    axios.post('http://localhost:8080/api/v1/role', {
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

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Kontaktperson:</label><br/>
            <input onChange={this.handleChange.bind(this)} type="text" ref="kontaktperson"/>
          </div>
          <div>
            <label>E-post:</label><br/>
            <input onChange={this.handleChange.bind(this)} type="text" ref="epost"/>
          </div>
          <div>
            <label>Telefon:</label><br/>
            <input onChange={this.handleChange.bind(this)} type="text" ref="telefon"/>
          </div>
          <br/>
          <input type="submit" value="Lagre"/>
        </form>
      </div>
    );
  }
}

export default RegisterRole;