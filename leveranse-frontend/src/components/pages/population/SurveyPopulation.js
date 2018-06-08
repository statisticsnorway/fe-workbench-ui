import React from 'react'
import { editModeCheckbox, errorMessages, responseMessages, sendDataToBackend } from '../../../utils/Common'
import { Button, Dropdown, Form, Header } from 'semantic-ui-react'
import InlineError from '../../messages/InlineError'

class SurveyPopulation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      surveyPopulation: {
        id: '',
        description: '',
        unitTypes: [],
        geographicalClarification: '',
        timeInterval: '',
        reportingOrResponseUnits: [],
        selection: ''
      },
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
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

    if (!data.description) errors.description = 'Feltet kan ikke være tomt'
    if (Object.keys(data.unitTypes).length === 0) errors.unitTypes = 'Ett eller flere valg må velges'
    if (!data.geographicalClarification) errors.geographicalClarification = 'Feltet kan ikke være tomt'
    if (!data.timeInterval) errors.timeInterval = 'Feltet kan ikke være tomt'
    if (Object.keys(data.reportingOrResponseUnits).length === 0) errors.reportingOrResponseUnits = 'Ett eller flere valg må velges'

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

      sendDataToBackend('/surveyPopulation', 'Undersøkelsespopulasjonen', this.state.surveyPopulation).then((result) => {
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
                         readOnly={readOnlyMode} value={surveyPopulation.description}
                         onChange={this.handleInputChange} />
          {errors.description && <InlineError text={errors.description} />}
        </Form.Field>

        <Form.Field error={!!errors.unitTypes}>
          <label>Enhetstype(r) i undersøkelsespopulasjon</label>
          <Dropdown placeholder='Enhetstype(r)' multiple selection options={tempUnitTypeOptions}
                    value={surveyPopulation.unitTypes}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'unitTypes')}
                    disabled={readOnlyMode} />
          {errors.unitTypes && <InlineError text={errors.unitTypes} />}
        </Form.Field>

        <Form.Field error={!!errors.geographicalClarification}>
          <Form.TextArea autoHeight name='geographicalClarification' label='Geografi i undersøkelsespopulasjon'
                         placeholder='Geografi i undersøkelsespopulasjon'
                         readOnly={readOnlyMode} value={surveyPopulation.geographicalClarification}
                         onChange={this.handleInputChange} />
          {errors.geographicalClarification && <InlineError text={errors.geographicalClarification} />}
        </Form.Field>

        <Form.Field error={!!errors.timeInterval}>
          <Form.TextArea autoHeight name='timeInterval' label='Tid i undersøkelsespopulasjon'
                         placeholder='Tid i undersøkelsespopulasjon'
                         readOnly={readOnlyMode} value={surveyPopulation.timeInterval}
                         onChange={this.handleInputChange} />
          {errors.timeInterval && <InlineError text={errors.timeInterval} />}
        </Form.Field>

        <Form.Field error={!!errors.reportingOrResponseUnits}>
          <label>Svarenhet(er)/rapporteringsenhet(er) i undersøkelsespopulasjon</label>
          <Dropdown placeholder='Svarenhet(er)/rapporteringsenhet(er)' multiple selection options={tempUnitTypeOptions}
                    value={surveyPopulation.reportingOrResponseUnits}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'reportingOrResponseUnits')}
                    disabled={readOnlyMode} />
          {errors.reportingOrResponseUnits && <InlineError text={errors.reportingOrResponseUnits} />}
        </Form.Field>

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