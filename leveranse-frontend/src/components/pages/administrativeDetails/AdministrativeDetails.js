import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Header, Icon } from "semantic-ui-react";

class AdministrativeDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {
      response: {
        color: 'black',
        text: '',
        icon: '',
      },
      administrativeDetails: {
        id: '',
        administrativeStatus: '',
        alias: '',
        annotation: '',
        documentation: '',
        createDate: '',
        createBy: '',
        lastUpdateDate: '',
        lifeCycleStatus: '',
        ControlledVocabulary: '',
        url: '',
        validFrom: '',
        validUntil: '',
        version: ''
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  registerAdministrativeDetails () {
    let responseStatus
    let errorMessage
    let responseMessage

    let data = JSON.stringify({
      id: this.state.administrativeDetails.id,
      administrativeStatus: null,
      alias: this.state.administrativeDetails.alias,
      annotation: null,
      documentation: null,
      createDate: null,
      createBy: null,
      lastUpdateDate: null,
      lifeCycleStatus: null,
      ControlledVocabulary: null,
      url: this.state.administrativeDetails.url,
      validFrom: null,
      validUntil: null,
      version: null
    })

    axios.post('http://localhost:8080/api/v1/administrativeDetail', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response)
        this.setState({id: response.data.id});
        console.log(this.state.id);
        responseStatus = response.status
        responseMessage = response.statusText
      })
      .catch(function (error) {
        console.log(error)
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

    setTimeout(() => {
      this.setState({
        response: {
          color: 'black',
          text: '',
          icon: ''
        }
      })
    }, 8000);
  }

  render () {
    return (
      <div>
        <Header as='h3' color={this.state.response.color}>
          <Header.Content>
            Administrative detaljer {' '}
            <Icon name={this.state.response.icon}/>
          </Header.Content>
          <Header.Subheader>
            {this.state.response.text}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>Id:</label>
          <Input placeholder='Id' name='id' value={this.state.administrativeDetails.id} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Alias:</label>
          <Input placeholder='Alias' name='alias' value={this.state.administrativeDetails.alias} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Url:</label>
          <Input placeholder='Url' name='url' value={this.state.administrativeDetails.url} onChange={this.handleInputChange}/>
        </Form.Field>
      </div>
    );
  }
}

export default AdministrativeDetails;