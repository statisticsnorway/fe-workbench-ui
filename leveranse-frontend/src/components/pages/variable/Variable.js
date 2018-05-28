import React from 'react'
import axios from 'axios'
import { Checkbox, Dropdown, Form, Grid, Header, Input, Segment, TextArea } from 'semantic-ui-react'

const unitTypeOptions = [
  {key: '1', text: 'Person', value: 'Person'},
  {key: '2', text: 'Husholdning', value: 'Husholdning'},
  {key: '3', text: 'Virksomhet', value: 'Virksomhet'}
]

const orderlyOptions = [
  {key: '1', text: 'Mann', value: 'Mann'},
  {key: '2', text: 'Kvinne', value: 'Kvinne'},
  {key: '3', text: '[ingenting]', value: null}
]

const describedOptions = [
  {key: '1', text: 'Heltall større enn 0', value: 'Heltall større enn 0'},
  {key: '2', text: '[ingenting]', value: null}
]

let subjectsOptions = []

class Variable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      readOnlyMode: false,
      variable: {},
      response: {}
    }

    const uuidv1 = require('uuid/v1')
    this.state.variable.id = uuidv1()

    this.fetchSubjects()
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  fetchSubjects () {
    let mainSubjects = ''

    axios.get('https://data.ssb.no/api/v0/no/table/')
      .then((response) => {
        mainSubjects = response.data
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {
        for (let key in mainSubjects) {
          subjectsOptions.push({
            key: mainSubjects[key]['id'],
            text: mainSubjects[key]['text'],
            value: mainSubjects[key]['text']
          })
        }
      })
  }

  handleInputChange (event) {
    this.setState({
      variable: {
        ...this.state.variable,
        [event.target.name]: event.target.value
      }
    })
  }

  handleDropdownChange (value, name) {
    this.setState({
      variable: {
        ...this.state.variable,
        [name]: value
      }
    })
  }

  prepareDataForBackend () {
    let data = {...this.state.variable}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }

    JSON.stringify(data)

    return data
  }

  registerVariable = () => {
    this.setState({
      readOnlyMode: true
    })

    let responseStatus
    let errorMessage
    let responseMessage
    let url
    let data

    data = this.prepareDataForBackend()

    console.log(data)

    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/variable'

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
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
              text: 'Variabelen ble lagret: ' + [responseMessage]
            }
          })
        } else if (responseStatus === 'Error') {
          this.setState({
            response: {
              color: 'red',
              text: 'Variabelen ble ikke lagret: ' + [errorMessage]
            }
          })
        } else {
          this.setState({
            response: {
              color: 'yellow',
              text: 'Variabelen ble ikke lagret: ' + [responseMessage]
            }
          })
        }
      })
  }

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode,
      response: {}
    })
  }

  render () {
    const {response} = this.state

    return (
      <div>
        {Object.keys(response).length !== 0 && this.state.readOnlyMode ?
          <Segment inverted color={response.color}>{response.text}</Segment> : null}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field/>
            <Form.Field/>
            <Form.Field>
              <Checkbox slider checked={!this.state.readOnlyMode} onClick={this.editModeHandleClick} icon='edit'
                        label='Redigeringsmodus' readOnly={!this.state.readOnlyMode}/>
            </Form.Field>
          </Form.Group>
          <Grid container stackable>
            <Grid.Row columns={3}>
              <Grid.Column width={10}>
                <Segment>
                  <Header as='h3'>
                    Variabel
                  </Header>
                  <Form.Field>
                    <label>Id:</label>
                    {this.state.variable.id}
                  </Form.Field>
                  <Form.Field>
                    <label>Variabelnavn</label>
                    <Input placeholder='Variabelnavn' readOnly={this.state.readOnlyMode}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Variabelbeskrivelse</label>
                    <TextArea autoHeight placeholder='Variabelbeskrivelse' readOnly={this.state.readOnlyMode}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Begrep</label>
                    <Input placeholder='Begrep' readOnly={this.state.readOnlyMode}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Enhetstype</label>
                    <Dropdown placeholder='Enhetstype' selection options={unitTypeOptions}
                              disabled={this.state.readOnlyMode}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Merke</label>
                    <Dropdown placeholder='Merke' multiple search selection options={subjectsOptions}
                              disabled={this.state.readOnlyMode}/>
                  </Form.Field>
                  <Header as='h4' content='Presisering av variabel'/>
                  <Form.Field>
                    <label>Ordnet</label>
                    <Dropdown placeholder='Ordnet' selection options={orderlyOptions}
                              disabled={this.state.readOnlyMode}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Beskrevet</label>
                    <Dropdown placeholder='Beskrevet' selection options={describedOptions}
                              disabled={this.state.readOnlyMode}/>
                  </Form.Field>
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment>
            <Form.Button disabled={this.state.readOnlyMode} primary icon='save'
                         onClick={this.registerVariable}
                         content='Lagre variabel'/>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default Variable