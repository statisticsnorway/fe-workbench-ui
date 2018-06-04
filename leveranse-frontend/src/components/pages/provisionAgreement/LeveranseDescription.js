import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Dropdown, Form, Grid, Header, Input, Message, TextArea } from 'semantic-ui-react'
import { SingleDatePicker } from 'react-dates'
import { fetchAllSubjectsFromExternalApi, sendDataToBackend } from '../../../utils/Common'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import InlineError from '../../messages/InlineError'
import Supplier from '../supplier/Supplier'
import '../../../assets/css/site.css'

moment.locale('nb')

const statusOptions = [
  {key: '1', text: 'Påbegynt', value: 'Påbegynt'},
  {key: '2', text: 'Til intern godkjenning', value: 'Til intern godkjenning'},
  {key: '3', text: 'Til ekstern godkjenning', value: 'Til ekstern godkjenning'},
  {key: '4', text: 'Utløpt', value: 'Utløpt'},
  {key: '5', text: 'Avslått', value: 'Avslått'}
]

const pursuantOptions = [
  {key: '1', text: 'Frivillig undersøkelse', value: 'Frivillig undersøkelse'},
  {key: '2', text: 'Oppgavepliktig undersøkelse', value: 'Oppgavepliktig undersøkelse'},
  {
    key: '3',
    text: 'Oppgavepliktig rapportering fra administrativt register',
    value: 'Oppgavepliktig rapportering fra administrativt register'
  }
]

const exchangeChannelOptions = [
  {key: '1', text: 'Administrativt register', value: 'Administrativt register'},
  {key: '2', text: 'Andre register', value: 'Andre register'},
  {key: '3', text: 'Direkte', value: 'Direkte'}
]

const protocolOptions = [
  {key: '1', text: 'API Pull', value: 'API Pull'},
  {key: '2', text: 'API Push', value: 'API Push'},
  {key: '3', text: 'MoveIt Pull', value: 'MoveIt Pull'},
  {key: '4', text: 'MoveIt Push', value: 'MoveIt Push'},
  {key: '5', text: 'Filinnlesing', value: 'Filinnlesing'}
]

const valuationOptions = [
  {key: '1', text: 'Klassifikasjon 1', value: 'Klassifikasjon 1'},
  {key: '2', text: 'Klassifikasjon 2', value: 'Klassifikasjon 2'},
  {key: '3', text: 'Klassifikasjon 3', value: 'Klassifikasjon 3'},
  {key: '4', text: 'Klassifikasjon 4', value: 'Klassifikasjon 4'},
  {key: '5', text: 'Klassifikasjon 5', value: 'Klassifikasjon 5'}
]

const allSubjectsOptions = fetchAllSubjectsFromExternalApi()

const constSupplier = {
  desription: 'Sjøfart',
  title: 'SDIR'
}

class ProvisionAgreement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      readOnlyMode: false,
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
        durationFrom: '',
        durationTo: '',
        frequency: '',
        pursuant: '',
        supplier: ''
      },
      durationFrom: moment(),
      durationTo: moment(),
      errors: {},
      response: {},
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

  registerProvisionAgreement () {
    this.insertDatesInState()

    if (this.validationOk()) {
      this.setState({
        readOnlyMode: true,
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
    const {errors, response, provisionAgreement, readOnlyMode} = this.state

    return (
      <div>
        {Object.keys(errors).length !== 0 && readOnlyMode ?
          <Message icon='warning' header={'Leveranseavtalen ble ikke lagret'}
                   content={'Rett opp i feilene og prøv igjen'} color='yellow' /> : null}
        {Object.keys(response).length !== 0 && readOnlyMode ?
          <Message icon={response.icon} header={response.header} content={response.text}
                   color={response.color} /> : null}
        <Header as='h3' content='Leveranseavtale' />
        <Form.Field>
          <label>Leverandør</label>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={12}>
                <Input placeholder='Leverandør' name='supplier' readOnly={readOnlyMode} className='ml-3'
                       value={provisionAgreement.supplier.title || ''} onChange={this.handleInputChange}>
                </Input>
              </Grid.Column>
              <Grid.Column width={4}>
                <Supplier onSearchSupplier={this.getSupplier}></Supplier>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
        <Form.Field>
          <label>Status</label>
          <Dropdown placeholder='Status' selection options={statusOptions} disabled={readOnlyMode} />
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
            <label>&nbsp;</label>
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
          <Dropdown placeholder='Hjemmelsgrunnlag' selection options={pursuantOptions}
                    value={provisionAgreement.pursuant}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'pursuant')}
                    disabled={readOnlyMode} />
          {errors.pursuant && <InlineError text={errors.pursuant} />}
        </Form.Field>
        <Form.Field>
          <label>Kanal</label>
          <Dropdown placeholder='Kanal' multiple selection options={exchangeChannelOptions}
                    disabled={readOnlyMode} />
        </Form.Field>
        <Form.Field>
          <label>Protokoll</label>
          <Dropdown placeholder='Protokoll' multiple selection options={protocolOptions} disabled={readOnlyMode} />
        </Form.Field>
        <Form.Field>
          <label>Emne</label>
          <Dropdown placeholder='Emne' multiple search selection options={allSubjectsOptions}
                    disabled={readOnlyMode} />
        </Form.Field>
        <Form.Field>
          <label>Verdivurdering</label>
          <Dropdown placeholder='Verdivurdering' selection options={valuationOptions} disabled={readOnlyMode} />
        </Form.Field>
        <Form.Field>
          <label>Endringshåndtering</label>
          <TextArea autoHeight placeholder='Endringshåndtering' readOnly={readOnlyMode} />
        </Form.Field>
      </div>
    )
  }
}

export default ProvisionAgreement