import React from 'react'
import { Checkbox, Dropdown, Form, Grid, Header, Input, Message, Segment, TextArea } from 'semantic-ui-react'
import { fetchMainSubjectsFromExternalApi, sendDataToBackend } from '../../utils/Common'

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

const mainSubjectsOptions = fetchMainSubjectsFromExternalApi()

class Variable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      readOnlyMode: false,
      variable: {},
      response: {},
      waitingForResponse: false
    }

    const uuidv1 = require('uuid/v1')
    this.state.variable.id = uuidv1()

    this.handleInputChange = this.handleInputChange.bind(this)
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

  handleEditModeClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode,
      response: {}
    })
  }

  registerVariable = () => {
    this.setState({
      readOnlyMode: true,
      waitingForResponse: true
    })

    sendDataToBackend('/variable', 'Variabelen', this.state.variable).then((result) => {
      this.setState({
        response: result,
        waitingForResponse: false
      })
    })
  }

  render () {
    const {response, waitingForResponse, readOnlyMode} = this.state

    return (
      <div>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field />
            <Form.Field />
            <Form.Field>
              <Checkbox slider checked={!readOnlyMode} onClick={this.handleEditModeClick} icon='edit'
                        label='Redigeringsmodus' />
            </Form.Field>
          </Form.Group>
          <Grid container stackable>
            <Grid.Row columns={3}>
              <Grid.Column width={10}>
                <Segment>
                  {Object.keys(response).length !== 0 && readOnlyMode ?
                    <Message icon={response.icon} color={response.color} header={response.header}
                             content={response.text} /> : null}
                  <Header as='h3' content='Variabel' />
                  <Form.Field>
                    <label>Variabelnavn</label>
                    <Input placeholder='Variabelnavn' readOnly={readOnlyMode} />
                  </Form.Field>
                  <Form.Field>
                    <label>Variabelbeskrivelse</label>
                    <TextArea autoHeight placeholder='Variabelbeskrivelse' readOnly={readOnlyMode.readOnlyMode} />
                  </Form.Field>
                  <Form.Field>
                    <label>Begrep</label>
                    <Input placeholder='Begrep' readOnly={readOnlyMode} />
                  </Form.Field>
                  <Form.Field>
                    <label>Enhetstype</label>
                    <Dropdown placeholder='Enhetstype' selection options={unitTypeOptions}
                              disabled={readOnlyMode} />
                  </Form.Field>
                  <Form.Field>
                    <label>Merke</label>
                    <Dropdown placeholder='Merke' multiple search selection options={mainSubjectsOptions}
                              disabled={readOnlyMode} />
                  </Form.Field>
                  <Header as='h4' content='Presisering av variabel' />
                  <Form.Field>
                    <label>Ordnet</label>
                    <Dropdown placeholder='Ordnet' selection options={orderlyOptions}
                              disabled={readOnlyMode} />
                  </Form.Field>
                  <Form.Field>
                    <label>Beskrevet</label>
                    <Dropdown placeholder='Beskrevet' selection options={describedOptions}
                              disabled={readOnlyMode} />
                  </Form.Field>
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment>
            <Form.Button disabled={readOnlyMode} loading={waitingForResponse} primary icon='save'
                         onClick={this.registerVariable}
                         content='Lagre variabel' />
          </Segment>
        </Form>
      </div>
    )
  }
}

export default Variable