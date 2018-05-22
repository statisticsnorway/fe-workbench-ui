import React, { Component } from 'react';
import axios from 'axios';
import { Header, Icon, Input, List, Form } from "semantic-ui-react";

class AdministrativeDetails extends Component {
  constructor (props) {
    super(props);

    let now = new Date()
    now = now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear() + ' - ' + now.getHours() + ':' + now.getMinutes()

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
        createDate: now,
        createBy: 'Testbruker',
        lastUpdateDate: now,
        lastUpdateBy: 'Testbruker 2',
        lifeCycleStatus: '',
        ControlledVocabulary: '',
        url: '',
        validFrom: '',
        validUntil: '',
        version: '1.0'
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

  prepareDataForBackend () {
    let data = {...this.state.administrativeDetails}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }

    JSON.stringify(data)

    return data
  }

  registerAdministrativeDetails () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url
    let data

    data = this.prepareDataForBackend()
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
        <List>
          <List.Item>
            <List.Header>Dato opprettet</List.Header>
            {this.state.administrativeDetails.createDate}
          </List.Item>
        </List>
        <List>
          <List.Item>
            <List.Header>Opprettet av</List.Header>
            {this.state.administrativeDetails.createBy}
          </List.Item>
        </List>
        <hr/>
        <List>
          <List.Item>
            <List.Header>Dato endret</List.Header>
            {this.state.administrativeDetails.lastUpdateDate}
          </List.Item>
        </List>
        <List>
          <List.Item>
            <List.Header>Endret av</List.Header>
            {this.state.administrativeDetails.lastUpdateBy}
          </List.Item>
        </List>
        <hr/>
        <List>
          <List.Item>
            <List.Header>Versjon</List.Header>
            {this.state.administrativeDetails.version}
          </List.Item>
        </List>
{/*        <Form.Field>
          <label>Id</label>
          <Input placeholder='Id' name='id' value={this.state.administrativeDetails.id}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Alias</label>
          <Input placeholder='Alias' name='alias' value={this.state.administrativeDetails.alias}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <Input placeholder='Url' name='url' value={this.state.administrativeDetails.url}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>*/}
      </div>
    );
  }
}

export default AdministrativeDetails;