import React from 'react'
import axios from 'axios';
import { Checkbox, Form, Grid, Segment, Header, Input, TextArea, Dropdown } from 'semantic-ui-react'

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
      response: {
        color: 'black',
        text: '',
        icon: '',
      },
      variable: {

      }
    }

    const uuidv1 = require('uuid/v1')
    this.state.variable.id = uuidv1()

    this.fetchSubjects()
    this.handleInputChange = this.handleInputChange.bind(this);
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
          subjectsOptions.push({key: mainSubjects[key]['id'], text: mainSubjects[key]['text'], value: mainSubjects[key]['text']})
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
      console.log(response);
      responseStatus = response.status
      responseMessage = response.statusText

      this.setState({
        readOnlyMode: true
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

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })
  }

  render() {
    return (
      <div>
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
                  <Header as='h3' color={this.state.response.color}>
                    <Header.Content>
                      Variabel
                    </Header.Content>
                    <Header.Subheader>
                      {this.state.response.text}
                    </Header.Subheader>
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