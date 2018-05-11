import React, { Component } from 'react';
import axios from 'axios';
import { Form, Header, Icon, Input } from "semantic-ui-react";

class Agent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      response: {
        color: 'black',
        text: '',
        icon: '',
      },
      agent: {
        contactPerson: '',
        email: '',
        phoneNumber: '',
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
      agent: {
        ...this.state.agent,
        [event.target.name]: event.target.value
      }
    })
  }

  registerAgent () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url

    let data = JSON.stringify({
      contactPerson: this.state.agent.contactPerson,
      email: this.state.agent.email,
      phoneNumber: this.state.agent.phoneNumber,
      description: null,
      id: null,
      localeId: null,
      name: null,
      version: null,
      versionDate: null,
      versionRationale: null,
      administrativeDetails: null
    })

    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/agent';

    axios.post(url, data, {
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
    const editMode = this.props.editMode

    return (
      <div>
        <Header as='h3' color={this.state.response.color}>
          <Header.Content>
            Aktør {' '}
            <Icon name={this.state.response.icon}/>
          </Header.Content>
          <Header.Subheader>
            {this.state.response.text}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>Kontaktperson</label>
          <Input placeholder='Kontaktperson' name='contactPerson' value={this.state.agent.contactPerson}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>E-post</label>
          <Input placeholder='Epost' name='email' value={this.state.agent.email} onChange={this.handleInputChange}
                 readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Telefon</label>
          <Input placeholder='Telefon' name='phoneNumber' value={this.state.agent.phoneNumber}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
      </div>
    );
  }
}

export default Agent;