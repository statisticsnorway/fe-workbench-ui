import React, { Component } from 'react';
import axios from 'axios';
import { Form, Header, Icon, Input } from "semantic-ui-react";

class ProvisionAgreement extends Component {
  constructor (props) {
    super(props);
    this.state = {
      response: {
        color: 'black',
        text: '',
        icon: '',
      },
      provisionAgreement: {
        duration: '',
        frequency: '',
        pursuant: '',
        provisionDate: '',
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
      provisionAgreement: {
        ...this.state.provisionAgreement,
        [event.target.name]: event.target.value
      }
    })
  }

  registerProvisionAgreement () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url

    let data = JSON.stringify({
      duration: this.state.provisionAgreement.duration,
      frequency: this.state.provisionAgreement.frequency,
      pursuant: this.state.provisionAgreement.pursuant,
      provisionDate: null,
      description: null,
      id: null,
      localeId: null,
      name: this.state.provisionAgreement.name,
      version: null,
      versionDate: null,
      versionRationale: null,
      administrativeDetails: {
        id: null,
        administrativeStatus: null,
        alias: null,
        annotation: null,
        documentation: null,
        createDate: null,
        createBy: null,
        lastUpdateDate: null,
        lifeCycleStatus: null,
        ControlledVocabulary: null,
        url: null,
        validFrom: null,
        validUntil: null,
        version: null
      }
    })

    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/provisionAgreement';

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
      console.log(response.data.id);
      responseStatus = response.status
      responseMessage = response.statusText
      this.setState({
        provisionAgreement: {
          ...this.state.provisionAgreement,
          id: [response.data.id]
        }
      })
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
            Leveranseavtale {' '}
            <Icon name={this.state.response.icon}/>
          </Header.Content>
          <Header.Subheader>
            {this.state.response.text}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>Navn på avtale</label>
          <Input placeholder='Navn' name='name' value={this.state.provisionAgreement.name}
                 onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Varighet</label>
          <Input placeholder='Varighet' name='duration' value={this.state.provisionAgreement.duration}
                 onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Hyppighet</label>
          <Input placeholder='Hyppighet' name='frequency' value={this.state.provisionAgreement.frequency}
                 onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Hjemmel</label>
          <Input placeholder='Hjemmel' name='pursuant' value={this.state.provisionAgreement.pursuant}
                 onChange={this.handleInputChange}/>
        </Form.Field>
      </div>
    );
  }
}

export default ProvisionAgreement;