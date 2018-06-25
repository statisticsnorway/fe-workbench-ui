import React from 'react'
import { editModeCheckbox, errorMessages, responseMessages, sendDataToBackend } from '../../utils/Common'
import { Button, Dropdown, Form, Header } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'
import moment from 'moment/moment'

class TargetPopulation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      targetPopulation: {
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
        populationType: 'targetPopulation',
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
    this.state.targetPopulation.id = uuidv1()

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
      targetPopulation: {
        ...this.state.targetPopulation,
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
      targetPopulation: {
        ...this.state.targetPopulation,
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
      targetPopulation: {
        ...this.state.targetPopulation,
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

    return errors
  }

  validationOk = () => {
    const errors = this.validateInputData(this.state.targetPopulation)

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  registerTargetPopulation = () => {
    if (this.validationOk()) {
      this.setState({
        readOnlyMode: true,
        errors: {},
        waitingForResponse: true
      })

      sendDataToBackend('Population/' + this.state.targetPopulation.id, 'Målpopulasjonen', this.state.targetPopulation).then((result) => {
        this.setState({
          response: result,
          waitingForResponse: false
        })
      })
    }
  }

  render () {
    const {errors, response, readOnlyMode, waitingForResponse, targetPopulation} = this.state

    return (
      <Form>
        <Header as='h2' dividing content='Målpopulasjon' />

        {editModeCheckbox(readOnlyMode, this.handleEditModeClick)}
        {errorMessages(errors, 'Målpopulasjonen')}
        {responseMessages(readOnlyMode, response)}

        <Form.Field error={!!errors.description}>
          <Form.TextArea autoHeight name='description' label='Beskrivelse' placeholder='Beskrivelse'
                         readOnly={readOnlyMode} value={targetPopulation.description[0].languageText}
                         onChange={this.handleInputChangeDeep} />
          {errors.description && <InlineError text={errors.description} />}
        </Form.Field>

        <Form.Field error={!!errors.unitType}>
          <label>Enhetstype(r) i målpopulasjon</label>
          <Dropdown placeholder='Enhetstype(r)' selection options={tempUnitTypeOptions}
                    value={targetPopulation.unitType}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'unitType')}
                    disabled={readOnlyMode} />
          {errors.unitType && <InlineError text={errors.unitType} />}
        </Form.Field>

        <Form.Field error={!!errors.geography}>
          <Form.TextArea autoHeight name='geography' label='Geografi i målpopulasjon'
                         placeholder='Geografi i målpopulasjon'
                         readOnly={readOnlyMode} value={targetPopulation.geography}
                         onChange={this.handleInputChange} />
          {errors.geography && <InlineError text={errors.geography} />}
        </Form.Field>

        <Form.Field error={!!errors.referencePeriod}>
          <Form.TextArea autoHeight name='referencePeriod' label='Tid i målpopulasjon' placeholder='Tid i målpopulasjon'
                         readOnly={readOnlyMode} value={targetPopulation.referencePeriod}
                         onChange={this.handleInputChange} />
          {errors.referencePeriod && <InlineError text={errors.referencePeriod} />}
        </Form.Field>

        <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                content='Lagre målpopulasjon' onClick={this.registerTargetPopulation} />
      </Form>
    )
  }
}

const tempUnitTypeOptions = [
  {key: '1', text: 'Personer', value: 'Personer'},
  {key: '2', text: 'Transaksjoner', value: 'Transaksjoner'},
  {key: '3', text: 'Virksomheter', value: 'Virksomheter'}
]

export default TargetPopulation