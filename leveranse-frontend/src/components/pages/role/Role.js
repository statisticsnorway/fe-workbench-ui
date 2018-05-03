import React, { Component } from 'react';
import { Form, Header, Icon, Input } from "semantic-ui-react";
import axios from 'axios';

class Role extends Component {
  constructor (props) {
    super(props);
    this.state = {
      response: {
        color: 'black',
        text: '',
        icon: '',
      },
      role: {
        description: '',
        id: '',
        localeId: '',
        name: '',
        version: '',
        versionDate: '',
        versionRationale: '',
        administrativeDetails: ''
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange (event) {
    this.setState({
      role: {
        ...this.state.role,
        [event.target.name]: event.target.value
      }
    })
  }

  registerRole () {
    let responseStatus
    let errorMessage
    let responseMessage

    let data = JSON.stringify({
      description: null,
      id: this.state.role.id,
      localeId: this.state.role.localeId,
      name: this.state.role.name,
      version: null,
      versionDate: null,
      versionRationale: null,
      administrativeDetails: null
    })

    axios.post('http://localhost:8080/api/v1/role', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        responseStatus = response.status
        responseMessage = response.statusText
      })
      .catch(function (error) {
        console.log(error);
        responseStatus = 'Error'
        errorMessage = error.message
      })
      .then(() => {
        if (responseStatus === 201) {
          this.setState({
            response: {
              color: 'green',
              text: '',
              icon: 'check'
            }
          })
        } else if (responseStatus === 'Error') {
          this.setState({
            response: {
              color: 'red',
              text: [errorMessage],
              icon: 'close'
            }
          })
        } else {
          this.setState({
            response: {
              color: 'yellow',
              text: [responseMessage],
              icon: 'warning'
            }
          })
        }
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            response: {
              color: 'black',
              text: '',
              icon: ''
            }
          })
        }, 3000);
      })
  }

  render () {
    return (
      <div>
        <Header as='h3' color={this.state.response.color}>
          <Header.Content>
            Rolle {' '}
            <Icon name={this.state.response.icon}/>
          </Header.Content>
          <Header.Subheader>
            {this.state.response.text}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>Navn</label>
          <Input placeholder='Navn' name="name" value={this.state.role.name} onChange={this.handleInputChange}/>
        </Form.Field>
      </div>
    );
  }
}

export default Role;