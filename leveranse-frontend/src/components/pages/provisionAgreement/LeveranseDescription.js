import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Button, Dropdown, Form, Header, Input, TextArea } from 'semantic-ui-react'
import { SingleDatePicker } from 'react-dates'
import {
  editModeCheckbox,
  errorMessages,
  fetchAllSubjectsFromExternalApi,
  responseMessages,
  sendDataToBackend
} from '../../../utils/Common'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import InlineError from '../../messages/InlineError'
import Supplier from '../supplier/Supplier'
import '../../../assets/css/site.css'

moment.locale('nb')

const allSubjectsOptions = fetchAllSubjectsFromExternalApi()

class ProvisionAgreement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      provisionAgreement: {
        description: '',
        id: '',
        localeId: '',
        name: '',
        version: '',
        versionDate: '',
        versionRationale: '',
        administrativeDetailsId: '',
        provisionDate: '',
        status: '',
        durationFrom: '',
        durationTo: '',
        frequency: '',
        pursuant: '',
        exchangeChannels: [],
        protocols: [],
        subjects: [],
        valuation: '',
        changeManagement: '',
        supplier: ''
      },
      durationFrom: moment(),
      durationTo: moment(),
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)

    if (this.props.isNewProvisionAgreement) {
      const uuidv1 = require('uuid/v1')
      this.state.provisionAgreement.id = uuidv1()
    } else {
      let url

      url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/provisionAgreement/' + this.props.provisionAgreementId

      axios.get(url)
        .then((response) => {
          this.state.provisionAgreement = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  handleInputChange (event) {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      provisionAgreement: {
        ...this.state.provisionAgreement,
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
      provisionAgreement: {
        ...this.state.provisionAgreement,
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

  getSupplier = (supplierValue) => {
    this.setState({
      provisionAgreement: {
        ...this.state.provisionAgreement,
        supplier: supplierValue
      }
    })
  }

  insertDatesInState () {
    this.setState({
      provisionAgreement: {
        ...this.state.provisionAgreement,
        durationFrom: this.state.durationFrom,
        durationTo: this.state.durationTo
      }
    })
  }

  validateInputData = data => {
    const errors = {}

    if (!data.description) errors.description = 'Feltet kan ikke være tomt'
    if (!data.name) errors.name = 'Feltet kan ikke være tomt'
    if (!data.pursuant) errors.pursuant = 'Et valg må velges'
    if (this.state.durationFrom.isAfter(this.state.durationTo)) { // noinspection JSValidateTypes
      errors.durationTo = 'Dato til > dato fra'
    }

    return errors
  }

  validationOk = () => {
    const errors = this.validateInputData(this.state.provisionAgreement)

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  registerProvisionAgreement = () => {
    this.insertDatesInState()

    if (this.validationOk()) {
      this.setState({
        readOnlyMode: true,
        errors: {},
        waitingForResponse: true
      })

      sendDataToBackend('/provisionAgreement', 'Leveranseavtalen', this.state.provisionAgreement).then((result) => {
        this.setState({
          response: result,
          waitingForResponse: false
        })
      })
    }
  }

  render () {
    const {errors, response, readOnlyMode, waitingForResponse, provisionAgreement} = this.state

    return (
      <Form>
        <Header as='h2' dividing content={'Leveransebeskrivelse'} />

        {editModeCheckbox(readOnlyMode, this.handleEditModeClick)}
        {errorMessages(errors, 'Leveranseavtalen')}
        {responseMessages(readOnlyMode, response)}

        <Form.Field>
          <label>Leverandør</label>
          <Input placeholder='Leverandør' name='supplier' readOnly={true}
                 value={provisionAgreement.supplier.title || ''} onChange={this.handleInputChange}
                 label={<Supplier onSearchSupplier={this.getSupplier}></Supplier>} labelPosition='right' />
        </Form.Field>

        <Form.Field error={!!errors.name}>
          <label>Avtalenavn</label>
          <Input placeholder='Avtalenavn' name='name' value={provisionAgreement.name}
                 onChange={this.handleInputChange} readOnly={readOnlyMode} />
          {errors.name && <InlineError text={errors.name} />}
        </Form.Field>

        <Form.Field error={!!errors.description}>
          <label>Beskrivelse</label>
          <TextArea autoHeight placeholder='Beskrivelse' name='description'
                    value={provisionAgreement.description}
                    onChange={this.handleInputChange} readOnly={readOnlyMode} />
          {errors.description && <InlineError text={errors.description} />}
        </Form.Field>

        <Form.Field error={!!errors.status}>
          <label>Status</label>
          <Dropdown placeholder='Status' selection options={tempStatusOptions}
                    value={provisionAgreement.status}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'status')}
                    disabled={readOnlyMode} />
        </Form.Field>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Gyldighet</label>
            Fra
            <div>
              <SingleDatePicker
                date={this.state.durationFrom}
                onDateChange={durationFrom => this.setState({durationFrom: durationFrom})}
                focused={this.state.durationFromfocused}
                onFocusChange={({focused: durationFromfocused}) => this.setState({durationFromfocused})}
                numberOfMonths={1}
                displayFormat='DD/MM/YYYY'
                disabled={readOnlyMode}
              />
            </div>
          </Form.Field>
          <Form.Field>
          </Form.Field>
          <Form.Field error={!!errors.durationTo}>
            <label>&nbsp;</label>
            Til
            <div>
              <SingleDatePicker
                date={this.state.durationTo}
                onDateChange={durationTo => this.setState({
                  durationTo: durationTo,
                  errors: {...this.state.errors, durationTo: ''}
                })}
                focused={this.state.durationTofocused}
                onFocusChange={({focused: durationTofocused}) => this.setState({durationTofocused})}
                numberOfMonths={1}
                displayFormat='DD/MM/YYYY'
                disabled={readOnlyMode}
              />
            </div>
            {errors.durationTo && <InlineError text={errors.durationTo} />}
          </Form.Field>
        </Form.Group>

        <Form.Field error={!!errors.pursuant}>
          <label>Hjemmelsgrunnlag</label>
          <Dropdown placeholder='Hjemmelsgrunnlag' selection options={tempPursuantOptions}
                    value={provisionAgreement.pursuant}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'pursuant')}
                    disabled={readOnlyMode} />
          {errors.pursuant && <InlineError text={errors.pursuant} />}
        </Form.Field>

        <Form.Field error={!!errors.exchangeChannels}>
          <label>Kanal(er)</label>
          <Dropdown placeholder='Kanal(er)' multiple selection options={tempExchangeChannelOptions}
                    value={provisionAgreement.exchangeChannels}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'exchangeChannels')}
                    disabled={readOnlyMode} />
          {errors.exchangeChannels && <InlineError text={errors.exchangeChannels} />}
        </Form.Field>

        <Form.Field error={!!errors.protocols}>
          <label>Protokoll(er)</label>
          <Dropdown placeholder='Protokoll(er)' multiple selection options={tempProtocolOptions}
                    value={provisionAgreement.protocols}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'protocols')}
                    disabled={readOnlyMode} />
          {errors.protocols && <InlineError text={errors.protocols} />}
        </Form.Field>

        <Form.Field error={!!errors.subjects}>
          <label>Emne(r)</label>
          <Dropdown placeholder='Emne(r)' multiple search selection options={allSubjectsOptions}
                    value={provisionAgreement.subjects}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'subjects')}
                    disabled={readOnlyMode} />
          {errors.subjects && <InlineError text={errors.subjects} />}
        </Form.Field>

        <Form.Field error={!!errors.valuation}>
          <label>Verdivurdering</label>
          <Dropdown placeholder='Verdivurdering' selection options={tempValuationOptions}
                    value={provisionAgreement.valuation}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'valuation')}
                    disabled={readOnlyMode} />
          {errors.valuation && <InlineError text={errors.valuation} />}
        </Form.Field>

        <Form.Field error={!!errors.changeManagement}>
          <Form.TextArea autoHeight name='changeManagement' label='Endringshåndtering' placeholder='Endringshåndtering'
                         readOnly={readOnlyMode} value={provisionAgreement.changeManagement}
                         onChange={this.handleInputChange} />
          {errors.changeManagement && <InlineError text={errors.changeManagement} />}
        </Form.Field>

        <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                content='Lagre leveranseavtale' onClick={this.registerProvisionAgreement} />
      </Form>
    )
  }
}

const tempStatusOptions = [
  {key: '1', text: 'Påbegynt', value: 'Påbegynt'},
  {key: '2', text: 'Til intern godkjenning', value: 'Til intern godkjenning'},
  {key: '3', text: 'Til ekstern godkjenning', value: 'Til ekstern godkjenning'},
  {key: '4', text: 'Utløpt', value: 'Utløpt'},
  {key: '5', text: 'Avslått', value: 'Avslått'}
]

const tempPursuantOptions = [
  {key: '1', text: 'Frivillig undersøkelse', value: 'Frivillig undersøkelse'},
  {key: '2', text: 'Oppgavepliktig undersøkelse', value: 'Oppgavepliktig undersøkelse'},
  {
    key: '3',
    text: 'Oppgavepliktig rapportering fra administrativt register',
    value: 'Oppgavepliktig rapportering fra administrativt register'
  }
]

const tempExchangeChannelOptions = [
  {key: '1', text: 'Administrativt register', value: 'Administrativt register'},
  {key: '2', text: 'Andre register', value: 'Andre register'},
  {key: '3', text: 'Direkte', value: 'Direkte'}
]

const tempProtocolOptions = [
  {key: '1', text: 'API Pull', value: 'API Pull'},
  {key: '2', text: 'API Push', value: 'API Push'},
  {key: '3', text: 'MoveIt Pull', value: 'MoveIt Pull'},
  {key: '4', text: 'MoveIt Push', value: 'MoveIt Push'},
  {key: '5', text: 'Filinnlesing', value: 'Filinnlesing'}
]

const tempValuationOptions = [
  {key: '1', text: 'Klassifikasjon 1', value: 'Klassifikasjon 1'},
  {key: '2', text: 'Klassifikasjon 2', value: 'Klassifikasjon 2'},
  {key: '3', text: 'Klassifikasjon 3', value: 'Klassifikasjon 3'},
  {key: '4', text: 'Klassifikasjon 4', value: 'Klassifikasjon 4'},
  {key: '5', text: 'Klassifikasjon 5', value: 'Klassifikasjon 5'}
]

export default ProvisionAgreement