import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Button, Dropdown, Form, Header, Input, TextArea, Message} from 'semantic-ui-react'
import {SingleDatePicker} from 'react-dates'
import {
  editModeCheckbox,
  errorMessages,
  fetchAllSubjectsFromExternalApi,
  responseMessages
} from '../../utils/Common'
import {alertActions, provisionAgreementActions} from '../../actions'
import {connect} from 'react-redux'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import InlineError from '../messages/InlineError'
import '../../assets/css/site.css'
import InformationProviderModal from "../informationProvider/InformationProviderModal";

moment.locale('nb')

const allSubjectsOptions = fetchAllSubjectsFromExternalApi()

class ProvisionAgreementDesc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      provisionAgreement: {
        id: '',
        name: [
          {
            languageCode: "nb",
            languageText: ''
          }
        ],
        description: [
          {
            "languageCode": "nb",
            "languageText": ''
          }
        ],
        administrativeStatus: 'OPEN',
        version: "1.0.0",
        versionValidFrom: moment().toJSON(),
        validFrom: moment().toJSON(),
        createdDate: moment().toJSON(),
        createdBy: this.props.authentication.user,
        informationProvider: '',
        regulation: '',
        status: '',
        valuation: '',
        changeManagement:
          {
            languageCode: "nb",
            languageText: ''
          },
        informationSource:
          {
            languageCode: "nb",
            languageText: ''
          },
        exchangeChannel: '/ExchangeChannel/4eea64e6-5c87-462d-9fc5-c3fdd3a310fc',
        frequency: ''
      },
      //durationFrom: moment(),
      //durationTo: moment(),
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false,
      selectedInformationProvider: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputChangeArrayObject = this.handleInputChangeArrayObject.bind(this)
    this.handleInputChangeJSONObject = this.handleInputChangeJSONObject.bind(this)

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

  handleInputChange(event) {
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

  handleInputChangeArrayObject(event) {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      provisionAgreement: {
        ...this.state.provisionAgreement,
        [event.target.name]: [{
          languageCode: 'nb',
          languageText: event.target.value
        }]
      }
    })
  }

  handleInputChangeJSONObject(event) {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      provisionAgreement: {
        ...this.state.provisionAgreement,
        [event.target.name]: {
          languageCode: 'nb',
          languageText: event.target.value
        }
      }
    })
  }

  handleDropdownChange(value, name) {
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

  /*insertDatesInState() {
    this.setState({
      provisionAgreement: {
        ...this.state.provisionAgreement,
        durationFrom: this.state.durationFrom,
        durationTo: this.state.durationTo
      }
    })
  }*/

  validateInputData = data => {
    const errors = {}
    if (!data.description[0].languageText) errors.description = 'Feltet kan ikke være tomt'
    if (!data.name[0].languageText) errors.name = 'Feltet kan ikke være tomt'
    if (!data.status) errors.status = 'Et valg må velges'
    if (!data.regulation) errors.regulation = 'Et valg må velges'
    if (!data.frequency) errors.frequency = 'Et valg må velges'
    if (!data.informationSource.languageText) errors.informationSource = 'Feltet kan ikke være tomt'
    /*if (this.state.durationFrom.isAfter(this.state.durationTo)) { // noinspection JSValidateTypes
      errors.durationTo = 'Dato til > dato fra'
    }*/
    return errors
  }

  validationOk = () => {
    const errors = this.validateInputData(this.state.provisionAgreement)
    this.setState({errors})
    return Object.keys(errors).length === 0
  }

  registerProvisionAgreement = () => {
    //this.insertDatesInState()

    const {dispatch} = this.props

    if (this.validationOk()) {
      this.setState({
        readOnlyMode: true,
        errors: {},
        waitingForResponse: true
      })

      dispatch(provisionAgreementActions.create(this.state.provisionAgreement))
      this.setState({
        waitingForResponse: false,
        loading: false
      })

    }
  }

  handleGetInformationProvider = () => {
    this.InformationProviderModal.handleInfoProviderModalOpen()
  }

  getInformationProvider = (informationProvider) => {
    this.setState({
      provisionAgreement: {
        ...this.state.provisionAgreement,
        informationProvider: "/InformationProvider/" + informationProvider.id
      },
      selectedInformationProvider: informationProvider[0].name[0].languageText
    })
  }

  render() {
    const {errors, response, readOnlyMode, waitingForResponse, provisionAgreement} = this.state
    const {alert, provisionAgreementId} = this.props
    return (
      <Form>
        <Header as='h2' dividing content={'Leveransebeskrivelse'}/>

        {editModeCheckbox(readOnlyMode, this.handleEditModeClick)}
        {errorMessages(errors, 'Leveranseavtalen')}
        {responseMessages(readOnlyMode, response)}
        {alert.type === 'alert-success' && alert.message &&
        <Message positive onDismiss={this.handleDismiss}><Message.Header>{alert.message}</Message.Header>
        </Message>
        }
        {alert.type === 'alert-danger' && alert.message &&
        <Message negative onDismiss={this.handleDismiss}><Message.Header>{alert.message}</Message.Header>
        </Message>
        }

        <Form.Field>
          <label>Leverandør</label>
          <Input placeholder='Leverandør'
                 name='informationProvider'
                 readOnly={true}
                 value={this.state.selectedInformationProvider}
                 onChange={this.handleInputChange}
                 label={<InformationProviderModal
                   ref={(InformationProviderModal => {
                     this.InformationProviderModal = InformationProviderModal
                   })}
                   getInfoProvider={this.handleGetInformationProvider}
                   getSelectedValue={this.getInformationProvider}/>}
                 labelPosition='right'/>
        </Form.Field>

        <Form.Field error={!!errors.name}>
          <label>Avtalenavn</label>
          <Input placeholder='Avtalenavn' name='name' value={provisionAgreement.name[0].languageText}
                 onChange={this.handleInputChangeArrayObject} readOnly={readOnlyMode}/>
          {errors.name && <InlineError text={errors.name}/>}
        </Form.Field>

        <Form.Field error={!!errors.description}>
          <label>Beskrivelse</label>
          <TextArea autoHeight placeholder='Beskrivelse' name='description'
                    value={provisionAgreement.description[0].languageText}
                    onChange={this.handleInputChangeArrayObject} readOnly={readOnlyMode}/>
          {errors.description && <InlineError text={errors.description}/>}
        </Form.Field>

        <Form.Field error={!!errors.status}>
          <label>Status</label>
          <Dropdown placeholder='Status' selection options={statusOptions}
                    value={provisionAgreement.status}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'status')}
                    disabled={readOnlyMode}/>
        </Form.Field>

        {/* <Form.Group widths='equal'>
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
            {errors.durationTo && <InlineError text={errors.durationTo}/>}
          </Form.Field>
        </Form.Group>
        */}
        <Form.Field error={!!errors.regulation}>
          <label>Hjemmelsgrunnlag</label>
          <Dropdown placeholder='Hjemmelsgrunnlag' selection options={regulationOptions}
                    value={provisionAgreement.regulation}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'regulation')}
                    disabled={readOnlyMode}/>
          {errors.regulation && <InlineError text={errors.regulation}/>}
        </Form.Field>

        <Form.Field error={!!errors.protocols}>
          <label>Protokoll(er)</label>
          <Dropdown placeholder='Protokoll(er)' multiple selection options={tempProtocolOptions}
                    value={provisionAgreement.protocols}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'protocols')}
                    disabled={readOnlyMode}/>
          {errors.protocols && <InlineError text={errors.protocols}/>}
        </Form.Field>

        <Form.Field error={!!errors.valuation}>
          <label>Verdivurdering</label>
          <Dropdown placeholder='Verdivurdering' selection options={tempValuationOptions}
                    value={provisionAgreement.valuation}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'valuation')}
                    disabled={readOnlyMode}/>
          {errors.valuation && <InlineError text={errors.valuation}/>}
        </Form.Field>

        <Form.Field error={!!errors.frequency}>
          <label>Hyppighet</label>
          <Dropdown placeholder='Hyppighet' selection options={frequencyOptions}
                    value={provisionAgreement.frequency}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'frequency')}
                    disabled={readOnlyMode}/>
          {errors.frequency && <InlineError text={errors.frequency}/>}
        </Form.Field>

        <Form.Field error={!!errors.changeManagement}>
          <Form.TextArea autoHeight name='changeManagement' label='Endringshåndtering' placeholder='Endringshåndtering'
                         readOnly={readOnlyMode} value={provisionAgreement.changeManagement.languageText}
                         onChange={this.handleInputChangeJSONObject}/>
          {errors.changeManagement && <InlineError text={errors.changeManagement}/>}
        </Form.Field>

        <Form.Field error={!!errors.informationSource}>
          <label>Kilde</label>
          <Input placeholder='Kilde' name='informationSource' value={provisionAgreement.informationSource.languageText}
                 onChange={this.handleInputChangeJSONObject} readOnly={readOnlyMode}/>
          {errors.informationSource && <InlineError text={errors.informationSource}/>}
        </Form.Field>


        <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                content='Lagre leveranseavtale' onClick={this.registerProvisionAgreement}/>
      </Form>
    )
  }
}

const statusOptions = [
  {key: '1', text: 'DRAFT', value: 'DRAFT'},
  {key: '2', text: 'INTERNAL', value: 'INTERNAL'},
  {key: '3', text: 'OPEN', value: 'OPEN'},
  {key: '4', text: 'DEPRECATED', value: 'DEPRECATED'}
]

const regulationOptions = [
  {key: '1', text: 'Frivillig undersøkelse', value: 'F'},
  {key: '2', text: 'Oppgaveplikt undersøkelse', value: 'O'},
  {key: '3', text: 'Administrativt register', value: 'A'}
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

const frequencyOptions = [
  {key: '1', text: 'Løpende', value: 'Løpende'},
  {key: '2', text: 'Daglig', value: 'Daglig'},
  {key: '3', text: 'Ukentlig', value: 'Ukentlig'},
  {key: '4', text: 'Månedlig', value: 'Månedlig'},
  {key: '5', text: 'Årlig', value: 'Årlig'}
]

function mapStateToProps(state) {
  const {authentication, alert, createdPA} = state
  return {
    authentication,
    createdPA,
    alert
  }
}

const connectedProvisionAgreement = connect(mapStateToProps)(ProvisionAgreementDesc)
export {connectedProvisionAgreement as ProvisionAgreementDesc}
