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
        individual: {
          email: null,
          phoneNumber: null,
          description: null,
          id: null,
          localeId: null,
          name: null,
          version: null,
          versionDate: null,
          versionRationale: null,
          administrativeDetails: null
        },
        organization: {
          description: null,
          id: null,
          localeId: null,
          name: null,
          version: null,
          versionDate: null,
          versionRationale: null,
          administrativeDetails: null
        },
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

  prepareDataForBackend () {
    let data = {...this.state.agent}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }

    JSON.stringify(data)

    return data
  }

  registerAgent () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url
    let data

    data = this.prepareDataForBackend()
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
          <Input placeholder='Navn' name='name' value={this.state.agent.name}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>E-post</label>
          <Input placeholder='Beskrivelse' name='description' value={this.state.agent.description} onChange={this.handleInputChange}
                 readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Telefon</label>
          <Input placeholder='Versjon' name='version' value={this.state.agent.version}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
      </div>
    );
  }
}

export default Agent;