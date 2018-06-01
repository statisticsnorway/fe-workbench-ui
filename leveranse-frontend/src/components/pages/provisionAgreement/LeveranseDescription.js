import React from 'react'
import { Checkbox, Form, Grid, Segment, Dropdown, Header, Input, TextArea } from 'semantic-ui-react'
import AdministrativeDetails from '../administrativeDetails/AdministrativeDetails'
import axios from 'axios'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import { fetchAllSubjectsFromExternalApi } from '../../../utils/Common'
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

let subjectsOptions = []

class LeveranseDescription extends React.Component {
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
        supplier: '',
        selected: 'false'
      },
      durationFrom: moment(),
      durationTo: moment(),
      errors: {},
      response: {}
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

  saveProvisionAgreement = () => {
//    this.administrativeDetails.registerAdministrativeDetails()
    this.registerProvisionAgreement()
    this.setState({
      readOnlyMode: true
    })
  }

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })

    this.setState({
      response: {}
    })
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

  prepareDataForBackend () {
    let data = {...this.state.provisionAgreement}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }

      if (attribute === 'durationFrom') {
        data[attribute] = this.state.durationFrom
      }

      if (attribute === 'durationTo') {
        data[attribute] = this.state.durationTo
      }
    }

    JSON.stringify(data)

    return data
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
    if (!this.validationOk()) {

    } else {
      let responseStatus
      let errorMessage
      let responseMessage
      let url
      let data

      data = this.prepareDataForBackend()

      console.log(data)

      url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/provisionAgreement'

      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        this.setState({
          provisionAgreement: {
            ...this.state.provisionAgreement,
            supplier: constSupplier
          }
        })
        console.log('created and fetched PA: ', this.state.provisionAgreement)
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
                text: 'Leveranseavtalen ble lagret: ' + [responseMessage]
              }
            })
          } else if (responseStatus === 'Error') {
            this.setState({
              response: {
                color: 'red',
                text: 'Leveranseavtalen ble ikke lagret: ' + [errorMessage]
              }
            })
          } else {
            this.setState({
              response: {
                color: 'yellow',
                text: 'Leveranseavtalen ble ikke lagret: ' + [responseMessage]
              }
            })
          }
        })
    }
  }

  getSupplier = (supplierValue) => {
    this.setState({
      provisionAgreement: {
        ...this.state.provisionAgreement,
        supplier: supplierValue
      }
    })
  }

  render () {
    const editMode = this.state.readOnlyMode
    const {errors, response} = this.state

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
                  {Object.keys(errors).length !== 0 && editMode ?
                    <Segment inverted color='orange'>Leveranseavtalen ble ikke lagret, rett opp i feilene og prøv
                      igjen</Segment> : null}
                  {Object.keys(response).length !== 0 && editMode ?
                    <Segment inverted color={response.color}>{response.text}</Segment> : null}
                  <Header as='h3'>
                    Leveranseavtale
                  </Header>
                  <Form.Field>
                    <label>Leverandør</label>
                    <Grid stackable>
                      <Grid.Row>
                        <Grid.Column width={12}>
                          <Input placeholder='Leverandør' name='supplier' readOnly={editMode} className='ml-3'
                                 value={this.state.provisionAgreement.supplier.title || ''}
                                 onChange={this.handleInputChange}>
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
                    <Input placeholder='Avtalenavn' name='name' value={this.state.provisionAgreement.name}
                           onChange={this.handleInputChange} readOnly={editMode}/>
                    {errors.name && <InlineError text={errors.name}/>}
                  </Form.Field>
                  <Form.Field error={!!errors.description}>
                    <label>Beskrivelse</label>
                    <TextArea autoHeight placeholder='Beskrivelse' name='description'
                              value={this.state.provisionAgreement.description}
                              onChange={this.handleInputChange} readOnly={editMode}/>
                    {errors.description && <InlineError text={errors.description}/>}
                  </Form.Field>
                  <Form.Field>
                    <label>Status</label>
                    <Dropdown placeholder='Status' selection options={statusOptions} disabled={editMode}/>
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
                          disabled={editMode}
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
                          disabled={editMode}
                        />
                      </div>
                      {errors.durationTo && <InlineError text={errors.durationTo}/>}
                    </Form.Field>
                  </Form.Group>
                  <Form.Field error={!!errors.pursuant}>
                    <label>Hjemmelsgrunnlag</label>
                    <Dropdown placeholder='Hjemmelsgrunnlag' selection options={pursuantOptions}
                              value={this.state.provisionAgreement.pursuant}
                              onChange={(event, {value}) => this.handleDropdownChange(value, 'pursuant')}
                              disabled={editMode}/>
                    {errors.pursuant && <InlineError text={errors.pursuant}/>}
                  </Form.Field>
                  <Form.Field>
                    <label>Kanal</label>
                    <Dropdown placeholder='Kanal' multiple selection options={exchangeChannelOptions}
                              disabled={editMode}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Protokoll</label>
                    <Dropdown placeholder='Protokoll' multiple selection options={protocolOptions} disabled={editMode}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Emne</label>
                    <Dropdown placeholder='Emne' multiple search selection options={allSubjectsOptions}
                              disabled={editMode}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Verdivurdering</label>
                    <Dropdown placeholder='Verdivurdering' selection options={valuationOptions} disabled={editMode}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Endringshåndtering</label>
                    <TextArea autoHeight placeholder='Endringshåndtering' readOnly={editMode}/>
                  </Form.Field>
                </Segment>
                <Segment>
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment><AdministrativeDetails
                  ref={(administrativeDetails => {this.administrativeDetails = administrativeDetails})}
                  editMode={this.state.readOnlyMode}/>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment>
            <Form.Button disabled={this.state.readOnlyMode} primary icon='save'
                         onClick={this.saveProvisionAgreement}
                         content='Lagre leveranseavtale'/>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default LeveranseDescription