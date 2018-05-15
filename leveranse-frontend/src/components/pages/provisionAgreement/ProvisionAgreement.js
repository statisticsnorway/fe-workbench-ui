import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Header, Icon, Input } from "semantic-ui-react";
import {  SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

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
      },
      durationFrom: moment(),
      durationTo: moment(),
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

  prepareDataForBackend () {
    let data = {...this.state.provisionAgreement}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }

    JSON.stringify(data)

    return data
  }

  registerProvisionAgreement () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url
    let data

    data = this.prepareDataForBackend()
    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/provisionAgreement';

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
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
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Varighet</label>
          <label>Fom</label>
          <div>
          <SingleDatePicker
            date={this.state.durationFrom}
            onDateChange={durationFrom => this.setState({ durationFrom: durationFrom })}
            focused={this.state.durationFromfocused}
            onFocusChange={({ focused: durationFromfocused }) => this.setState({ durationFromfocused })}
            numberOfMonths={1}
            displayFormat="DD/MM/YYYY"
          />
          </div>
          <label>Tom</label>
          <div>
            <SingleDatePicker
              date={this.state.durationTo}
              onDateChange={durationTo => this.setState({ durationTo: durationTo })}
              focused={this.state.durationTofocused}
              onFocusChange={({ focused: durationTofocused }) => this.setState({ durationTofocused })}
              numberOfMonths={1}
              displayFormat="DD/MM/YYYY"
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>Hyppighet</label>
          <Input placeholder='Hyppighet' name='frequency' value={this.state.provisionAgreement.frequency}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Hjemmel</label>
          <Input placeholder='Hjemmel' name='pursuant' value={this.state.provisionAgreement.pursuant}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
      </div>
    );
  }
}

export default ProvisionAgreement;