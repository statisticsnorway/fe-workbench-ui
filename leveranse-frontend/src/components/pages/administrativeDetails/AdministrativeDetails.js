import React, { Component } from 'react'
import axios from 'axios'
import { Header, List, Segment } from 'semantic-ui-react'

class AdministrativeDetails extends Component {
  constructor (props) {
    super(props)

    const rightNow = AdministrativeDetails.prettyfyDate()

    this.state = {
      administrativeDetails: {
        id: '',
        administrativeStatus: '',
        alias: '',
        annotation: '',
        documentation: '',
        createDate: rightNow,
        createBy: 'Testbruker',
        lastUpdateDate: rightNow,
        lastUpdateBy: 'Testbruker 2',
        lifeCycleStatus: '',
        ControlledVocabulary: '',
        url: '',
        validFrom: '',
        validUntil: '',
        version: '1.0'
      },
      response: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static prettyfyDate () {
    let now = new Date()
    let nowMonth
    let nowMinutes

    if (now.getMinutes() < 10) {
      nowMinutes = '0' + now.getMinutes()
    } else {
      nowMinutes = now.getMinutes()
    }

    if (now.getMonth() < 10) {
      nowMonth = '0' + now.getMonth()
    } else {
      nowMonth = now.getMonth()
    }

    now = now.getDate() + '/' + nowMonth + '/' + now.getFullYear() + ' - ' + now.getHours() + ':' + nowMinutes

    return now
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
    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/administrativeDetail'

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
              text: 'Administrative detaljer ble lagret: ' + [responseMessage]
            }
          })
        } else if (responseStatus === 'Error') {
          this.setState({
            response: {
              color: 'red',
              text: 'Administrative detaljer ble ikke lagret: ' + [errorMessage]
            }
          })
        } else {
          this.setState({
            response: {
              color: 'yellow',
              text: 'Administrative detaljer ble ikke lagret: ' + [responseMessage]
            }
          })
        }
      })
  }

  render () {
    const editMode = this.props.editMode
    const {response} = this.state

    return (
      <div>
        {Object.keys(response).length !== 0 && editMode ?
          <Segment inverted color={response.color}>{response.text}</Segment> : null}
        <Header as='h3'>
          Administrative detaljer
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
        <hr />
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
        <hr />
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
    )
  }
}

export default AdministrativeDetails