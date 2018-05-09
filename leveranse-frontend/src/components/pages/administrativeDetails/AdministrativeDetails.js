import React, { Component } from 'react';
import axios from 'axios';
import { Form, Header, Icon, Input } from "semantic-ui-react";

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
      administrativeDetails: {
        ...this.state.administrativeDetails,
        [event.target.name]: event.target.value
      }
    })
  }

  registerAdministrativeDetails () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url

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

    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/administrativeDetail';

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response)
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
            Administrative detaljer {' '}
            <Icon name={this.state.response.icon}/>
          </Header.Content>
          <Header.Subheader>
            {this.state.response.text}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>Id:</label>
          <Input placeholder='Id' name='id' value={this.state.administrativeDetails.id}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Alias:</label>
          <Input placeholder='Alias' name='alias' value={this.state.administrativeDetails.alias}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Url:</label>
          <Input placeholder='Url' name='url' value={this.state.administrativeDetails.url}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
      </div>
    );
  }
}

export default AdministrativeDetails;