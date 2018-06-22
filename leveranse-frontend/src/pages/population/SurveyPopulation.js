import React from 'react'
import { editModeCheckbox, errorMessages, responseMessages, sendDataToBackend } from '../../utils/Common'
import { Button, Dropdown, Form, Header } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'
import moment from 'moment/moment'

class SurveyPopulation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      surveyPopulation: {
        id: '',
        name: [{
          languageCode: 'nb',
          languageText: ''
        }],
        description: [{
          languageCode: 'nb',
          languageText: ''
        }],
        administrativeStatus: '',
        createdDate: moment().toJSON(),
        createdBy: '',
        version: '',
        versionValidFrom: moment().toJSON(),
        versionRationale: [{
          languageCode: 'nb',
          languageText: ''
        }],
        lastUpdatedDate: moment().toJSON(),
        lastUpdatedBy: '',
        validFrom: moment().toJSON(),
        validUntil: moment().toJSON(),
        administrativeDetails: [{
          administrativeDetailType: '',
          values: []
        }],
        populationType: 'surveyPopulation',
        referencePeriod: '',
        geography: '',
        unitType: '',
        respondantUnitType: ''
      },
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false
    }

    const uuidv1 = require('uuid/v1')
    this.state.surveyPopulation.id = uuidv1()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputChangeDeep = this.handleInputChangeDeep.bind(this)
  }

  handleEditModeClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode,
      response: {}
    })
  }

  handleInputChange (event) {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      surveyPopulation: {
        ...this.state.surveyPopulation,
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
      surveyPopulation: {
        ...this.state.surveyPopulation,
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
      surveyPopulation: {
        ...this.state.surveyPopulation,
        [name]: value
      }
    })
  }

  validateInputData = data => {
    const errors = {}

    if (!data.description[0].languageText) errors.description = 'Feltet kan ikke være tomt'
    if (!data.unitType) errors.unitType = 'Ett valg må velges'
    if (!data.geography) errors.geography = 'Feltet kan ikke være tomt'
    if (!data.referencePeriod) errors.referencePeriod = 'Feltet kan ikke være tomt'
//    if (Object.keys(data.reportingOrResponseUnits).length === 0) errors.reportingOrResponseUnits = 'Ett eller flere valg må velges'

    return errors
  }

  validationOk = () => {
    const errors = this.validateInputData(this.state.surveyPopulation)

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  registerSurveyPopulation = () => {
    if (this.validationOk()) {
      this.setState({
        readOnlyMode: true,
        errors: {},
        waitingForResponse: true
      })

      sendDataToBackend('Population/' + this.state.surveyPopulation.id, 'Undersøkelsespopulasjonen', this.state.surveyPopulation).then((result) => {
        this.setState({
          response: result,
          waitingForResponse: false
        })
      })
    }
  }

  render () {
    const {errors, response, readOnlyMode, waitingForResponse, surveyPopulation} = this.state

    return (
      <Form>
        <Header as='h2' dividing content='Undersøkelsespopulasjon' />

        {editModeCheckbox(readOnlyMode, this.handleEditModeClick)}
        {errorMessages(errors, 'Undersøkelsespopulasjonen')}
        {responseMessages(readOnlyMode, response)}

        <Form.Field error={!!errors.description}>
          <Form.TextArea autoHeight name='description' label='Beskrivelse' placeholder='Beskrivelse'
                         readOnly={readOnlyMode} value={surveyPopulation.description[0].languageText}
                         onChange={this.handleInputChangeDeep} />
          {errors.description && <InlineError text={errors.description} />}
        </Form.Field>

        <Form.Field error={!!errors.unitType}>
          <label>Enhetstype(r) i undersøkelsespopulasjon</label>
          <Dropdown placeholder='Enhetstype(r)' selection options={tempUnitTypeOptions}
                    value={surveyPopulation.unitType}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'unitType')}
                    disabled={readOnlyMode} />
          {errors.unitType && <InlineError text={errors.unitType} />}
        </Form.Field>

        <Form.Field error={!!errors.geography}>
          <Form.TextArea autoHeight name='geography' label='Geografi i undersøkelsespopulasjon'
                         placeholder='Geografi i undersøkelsespopulasjon'
                         readOnly={readOnlyMode} value={surveyPopulation.geography}
                         onChange={this.handleInputChange} />
          {errors.geography && <InlineError text={errors.geography} />}
        </Form.Field>

        <Form.Field error={!!errors.referencePeriod}>
          <Form.TextArea autoHeight name='referencePeriod' label='Tid i undersøkelsespopulasjon'
                         placeholder='Tid i undersøkelsespopulasjon'
                         readOnly={readOnlyMode} value={surveyPopulation.referencePeriod}
                         onChange={this.handleInputChange} />
          {errors.referencePeriod && <InlineError text={errors.referencePeriod} />}
        </Form.Field>

{/*        <Form.Field error={!!errors.reportingOrResponseUnits}>
          <label>Svarenhet(er)/rapporteringsenhet(er) i undersøkelsespopulasjon</label>
          <Dropdown placeholder='Svarenhet(er)/rapporteringsenhet(er)' multiple selection options={tempUnitTypeOptions}
                    value={surveyPopulation.reportingOrResponseUnits}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'reportingOrResponseUnits')}
                    disabled={readOnlyMode} />
          {errors.reportingOrResponseUnits && <InlineError text={errors.reportingOrResponseUnits} />}
        </Form.Field>*/}

        <Header as='h3' content='Ramme' />
        <Form.Field>
          <label>Enhet(er) i ramme</label>
        </Form.Field>
        <Form.Field>
          <label>Utvalg</label>
        </Form.Field>

        <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                content='Lagre undersøkelsespopulasjon' onClick={this.registerSurveyPopulation} />
      </Form>
    )
  }
}

const tempUnitTypeOptions = [
  {key: '1', text: 'Personer', value: 'Personer'},
  {key: '2', text: 'Transaksjoner', value: 'Transaksjoner'},
  {key: '3', text: 'Virksomheter', value: 'Virksomheter'},
  {key: '4', text: 'Juridisk enhet', value: 'Juridisk enhet'}
]

export default SurveyPopulation