import React, { Component } from 'react';
import axios from 'axios';
import RegisterAgent from "../components/agent/RegisterAgent";
import RegisterProvisionagreement from "../components/provisionagreement/RegisterProvisionagreement";
import RegisterAdminDetails from "../components/adminDetails/RegisterAdminDetails";
import RegisterRole from '../components/role/RegisterRole'

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
        <RegisterProvisionagreement />
        <RegisterAgent/>
        <RegisterRole/>
      </div>
    );
  }
}

export default Main;
