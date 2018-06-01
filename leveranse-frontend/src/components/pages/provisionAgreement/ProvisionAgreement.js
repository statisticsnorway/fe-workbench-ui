import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Dropdown, Form, Grid, Header, Input, Segment, TextArea } from 'semantic-ui-react'
import { SingleDatePicker } from 'react-dates'
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

const constSupplier = {
  desription: 'Sjøfart',
  image:
    'data:image/jpeg;base64,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…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',
  title: 'SDIR'
}

let subjectsOptions = []

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

    this.fetchSubjects()
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

  fetchSubjects () {
    let mainSubjects
    let subSubjects
    let organizedSubSubjects
    let organizedSubjects = []
    let allSubjects = []
    let url

    url = process.env.REACT_APP_SSB_SUBJECTS

    axios.get(url)
      .then((response) => {
        mainSubjects = response.data
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {
        for (let mainSubjectsKey in mainSubjects) {
          axios.get(url + mainSubjects[mainSubjectsKey]['id'])
          // eslint-disable-next-line
            .then((response) => {
              subSubjects = response.data

              for (let subSubjectsKey in subSubjects) {
                let key = mainSubjectsKey + subSubjectsKey
                let text = mainSubjects[mainSubjectsKey]['text'] + ' - ' + subSubjects[subSubjectsKey]['text']

                allSubjects.push({key: key, text: text, value: text})

                organizedSubSubjects = {
                  ...organizedSubSubjects,
                  [subSubjects[subSubjectsKey]['text']]: [subSubjects[subSubjectsKey]['text']]
                }
              }

              organizedSubjects.push({
                mainSubject: mainSubjects[mainSubjectsKey]['text'], subSubjects: organizedSubSubjects
              })
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .then(() => {
        subjectsOptions = allSubjects

//        Organized all subsubjects per mainsubject (might be useful for a cleaner dropdown at a later stage
//        console.log(organizedSubjects)
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
        console.log("created and fetched PA: ", this.state.provisionAgreement)
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
    const editMode = this.props.editMode
    const {errors, response} = this.state

    return (
      <div>
        {Object.keys(errors).length !== 0 && editMode ?
          <Segment inverted color='orange'>Leveranseavtalen ble ikke lagret, rett opp i feilene og prøv
            igjen</Segment> : null}
        {Object.keys(response).length !== 0 && editMode ?
          <Segment inverted color={response.color}>{response.text}</Segment> : null}
        <Header as='h3'>
          Leveranseavtale
        </Header>
        {/*<Form.Field>
          <label>Id:</label>
          {this.state.provisionAgreement.id}
        </Form.Field>*/}
        <Form.Field>
          <label>Leverandør</label>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={12}>
                <Input placeholder='Leverandør' name='supplier' readOnly={editMode} className='ml-3'
                       value={this.state.provisionAgreement.supplier.title || ''} onChange={this.handleInputChange}>
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
          <Dropdown placeholder='Emne' multiple search selection options={subjectsOptions}
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
      </div>
    )
  }
}

export default ProvisionAgreement