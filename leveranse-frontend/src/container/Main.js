import React, { Component } from 'react';
import axios from 'axios';
import Agent from "../components/pages/agent/Agent";
import ProvisionAgreement from "../components/pages/provisionAgreement/ProvisionAgreement";
import Role from '../components/pages/role/Role'

class Main extends Component {

  constructor (props) {
    super(props);
    this.state = {registered: 'Not Registered'}

    this.register = this.register.bind(this);
  }

  register () {
    axios.get("http://localhost:8080/register").then(res => {
      alert("Received Successful response from server!");
      this.setState({registered: 'Registered! '});
    }, err => {
      alert("Server rejected response with: " + err);
    });
  }

  render () {
    return (
      <div className="Main">
        <header className="App-header">
          <h1 className="App-title">Register</h1>
        </header>
        <p className="App-intro">
          <div>
            <button onClick={this.register}>Register!</button>
            <hr></hr>
            <div>Registered: {this.state.registered}</div>
          </div>
        </p>
        <ProvisionAgreement/>
        <Agent/>
        <Role/>
      </div>
    );
  }
}

export default Main;
