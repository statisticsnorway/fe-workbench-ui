import React from 'react'
import { Button, Dropdown, Form, Header, Input } from 'semantic-ui-react'
import {
  editModeCheckbox,
  errorMessages,
  fetchMainSubjectsFromExternalApi,
  responseMessages,
  sendDataToBackend
} from '../../utils/Common'
import InlineError from '../messages/InlineError'
import moment from 'moment'

const mainSubjectsOptions = fetchMainSubjectsFromExternalApi()

class Variable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      variable: {
        id: '',
        name: [
          {
            languageCode: 'nb',
            languageText: ''
          }
        ],
        description: [
          {
            languageCode: 'nb',
            languageText: ''
          }
        ],
        administrativeStatus: '',
        createdDate: moment().toJSON(),
        createdBy: '',
        version: '',
        versionValidFrom: moment().toJSON(),
        versionRationale: [
          {
            languageCode: 'nb',
            languageText: ''
          }
        ],
        lastUpdatedDate: moment().toJSON(),
        lastUpdatedBy: '',
        validFrom: moment().toJSON(),
        validUntil: moment().toJSON(),
        administrativeDetails: [

        ],
        concept: '',
        unitType: ''
      },
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false
    }

    const uuidv1 = require('uuid/v1')
    this.state.variable.id = uuidv1()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputChangeDeep = this.handleInputChangeDeep.bind(this)
  }

  handleInputChange (event) {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      variable: {
        ...this.state.variable,
        [event.target.name]: event.target.value
      }
    })
  }

  handleInputChangeDeep (event) {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      variable: {
        ...this.state.variable,
        [event.target.name]: [{
          languageCode: 'nb',
          languageText: event.target.value
        }]
      }
    })
  }

  handleDropdownChange (value, name) {
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: ''
      },
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

  validateInputData = data => {
    const errors = {}

    if (!data.name[0].languageText) errors.name = 'Feltet kan ikke være tomt'
    if (!data.description[0].languageText) errors.description = 'Feltet kan ikke være tomt'
    if (!data.concept) errors.concept = 'Feltet kan ikke være tomt'
    if (!data.unitType) errors.unitType = 'Et valg må velges'
//    if (Object.keys(data.labels).length === 0) errors.labels = 'Ett eller flere valg må velges'

    return errors
  }

  validationOk = () => {
    const errors = this.validateInputData(this.state.variable)

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  registerVariable = () => {
    if (this.validationOk()) {
      this.setState({
        readOnlyMode: true,
        errors: {},
        waitingForResponse: true
      })

      console.log(this.state.variable)

      sendDataToBackend('Variable/' + this.state.variable.id, 'Variabelen', this.state.variable).then((result) => {
        this.setState({
          response: result,
          waitingForResponse: false
        })
      })
    }
  }

  render () {
    const {errors, response, readOnlyMode, waitingForResponse, variable} = this.state

    return (
      <Form>
        <Header as='h2' dividing content='Variabel' />

        {editModeCheckbox(readOnlyMode, this.handleEditModeClick)}
        {errorMessages(errors, 'Variabelen')}
        {responseMessages(readOnlyMode, response)}

        <Form.Field error={!!errors.name}>
          <label>Variabelnavn</label>
          <Input name='name' placeholder='Variabelnavn' value={variable.name[0].languageText} onChange={this.handleInputChangeDeep}
                 readOnly={readOnlyMode} />
          {errors.name && <InlineError text={errors.name} />}
        </Form.Field>

        <Form.Field error={!!errors.description}>
          <Form.TextArea autoHeight name='description' label='Beskrivelse' placeholder='Variabelbeskrivelse'
                         readOnly={readOnlyMode.readOnlyMode} value={variable.description[0].languageText}
                         onChange={this.handleInputChangeDeep} />
          {errors.description && <InlineError text={errors.description} />}
        </Form.Field>

        <Form.Field error={!!errors.concept}>
          <label>Begrep</label>
          <Input name='concept' placeholder='Begrep' value={variable.concept} onChange={this.handleInputChange}
                 readOnly={readOnlyMode} />
          {errors.concept && <InlineError text={errors.concept} />}
        </Form.Field>

        <Form.Field error={!!errors.unitType}>
          <label>Enhetstype</label>
          <Dropdown placeholder='Enhetstype' selection options={tempUnitTypeOptions}
                    value={variable.unitType}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'unitType')}
                    disabled={readOnlyMode} />
          {errors.unitType && <InlineError text={errors.unitType} />}
        </Form.Field>

{/*        <Form.Field error={!!errors.labels}>
          <label>Merke(er)</label>
          <Dropdown placeholder='Merke(er)' multiple search selection options={mainSubjectsOptions}
                    value={variable.labels}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'labels')}
                    disabled={readOnlyMode} />
          {errors.labels && <InlineError text={errors.labels} />}
        </Form.Field>

        <Header as='h3' content='Presisering av variabel' />
        <Form.Field error={!!errors.variablePrecisionOrderly}>
          <label>Ordnet</label>
          <Dropdown placeholder='Ordnet' selection options={tempOrderlyOptions}
                    value={variable.variablePrecisionOrderly}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'variablePrecisionOrderly')}
                    disabled={readOnlyMode} />
          {errors.variablePrecisionOrderly && <InlineError text={errors.variablePrecisionOrderly} />}
        </Form.Field>
        <Form.Field error={!!errors.variablePrecisionDescribed}>
          <label>Beskrevet</label>
          <Dropdown placeholder='Beskrevet' selection options={tempDescribedOptions}
                    value={variable.variablePrecisionDescribed}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'variablePrecisionDescribed')}
                    disabled={readOnlyMode} />
          {errors.variablePrecisionDescribed && <InlineError text={errors.variablePrecisionDescribed} />}
        </Form.Field>*/}

        <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                content='Lagre variabel' onClick={this.registerVariable} />
      </Form>
    )
  }
}

const tempUnitTypeOptions = [
  {key: '1', text: 'Person', value: 'Person'},
  {key: '2', text: 'Husholdning', value: 'Husholdning'},
  {key: '3', text: 'Virksomhet', value: 'Virksomhet'}
]

const tempOrderlyOptions = [
  {key: '1', text: 'Mann', value: 'Mann'},
  {key: '2', text: 'Kvinne', value: 'Kvinne'},
  {key: '3', text: '[ingenting]', value: null}
]

const tempDescribedOptions = [
  {key: '1', text: 'Heltall større enn 0', value: 'Heltall større enn 0'},
  {key: '2', text: '[ingenting]', value: null}
]

export default Variable