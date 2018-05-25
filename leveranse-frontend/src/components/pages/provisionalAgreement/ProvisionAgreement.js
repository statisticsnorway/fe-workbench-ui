import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Dropdown, Form, Header, Icon, Input, TextArea, Search, Grid } from "semantic-ui-react";
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Leverandør from '../leverandør/Leverandør'

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
  {key: '3', text: 'Oppgavepliktig rapportering fra administrativt register', value: 'Oppgavepliktig rapportering fra administrativt register'}
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

let subjectsOptions = []

const sourceLeverandører = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

class ProvisionAgreement extends Component {
  constructor (props) {
    super(props);
    this.state = {
      response: {
        color: 'black',
        text: '',
        icon: '',
      },
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
    };

    this.fetchSubjects()
    this.handleInputChange = this.handleInputChange.bind(this);

    if (this.props.isNewProvisionAgreement) {
      const uuidv1 = require('uuid/v1');
      this.state.provisionAgreement.id = uuidv1()
    } else {
      let url

      url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/provisionAgreement/' + this.props.provisionAgreementId;

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
    let mainSubjects = ''
    let subSubjects = ''
    let organizedSubSubjects = ''
    let organizedSubjects = []
    let allSubjects = []

    axios.get('https://data.ssb.no/api/v0/no/table/')
      .then((response) => {
        mainSubjects = response.data
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {
        for (let mainSubjectsKey in mainSubjects) {
          axios.get('https://data.ssb.no/api/v0/no/table/' + mainSubjects[mainSubjectsKey]['id'])
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
      provisionAgreement: {
        ...this.state.provisionAgreement,
        [event.target.name]: event.target.value
      }
    })
  }

  handleDropdownChange (value, name) {
    this.setState({
      provisionAgreement: {
        ...this.state.provisionAgreement,
        [name]: value
      }
    })
  }

  prepareDataForBackend (id) {
    let data = {...this.state.provisionAgreement}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }

      if (attribute === 'durationFrom') {
        data[attribute] = this.state.durationFrom;
      }

      if (attribute === 'durationTo') {
        data[attribute] = this.state.durationTo;
      }
    }
    data['id'] = id;
    JSON.stringify(data)

    return data
  }

  registerProvisionAgreement () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url
    let data

    const uuidv1 = require('uuid/v1');
    let provisionAgreement_uuid = uuidv1();

    data = this.prepareDataForBackend(provisionAgreement_uuid)

    console.log(data)

    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/provisionAgreement';

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
      responseStatus = response.status
      responseMessage = response.statusText
    })
      .catch(function (error) {
        console.log(error);
        responseStatus = 'Error'
        errorMessage = error.message
      })
      .then(() => {
        if (responseStatus === 201) {
          this.setState({
            response: {
              color: 'green',
              text: '',
              icon: 'check'
            }
          })
        } else if (responseStatus === 'Error') {
          this.setState({
            response: {
              color: 'red',
              text: [errorMessage],
              icon: 'close'
            }
          })
        } else {
          this.setState({
            response: {
              color: 'yellow',
              text: [responseMessage],
              icon: 'warning'
            }
          })
        }
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            response: {
              color: 'black',
              text: '',
              icon: ''
            }
          })
        }, 3000);
      })
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(sourceLeverandører, isMatch),
      })
    }, 300)
  }


  render () {
    const editMode = this.props.editMode
    const { isLoading, value, results } = this.state

    return (
      <div>
        <Header as='h3' color={this.state.response.color}>
          <Header.Content>
            Leveranseavtale &nbsp;
            <Icon name={this.state.response.icon}/>
          </Header.Content>
          <Header.Subheader>
            {this.state.response.text}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>Id:</label>
          {this.state.provisionAgreement.id}
        </Form.Field>
        <Form.Field>
          <label>Leverandør</label>
          <Grid>
            <Grid.Column width={11}>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                {...this.props}
                fluid={true}
              />
              <Leverandør/>
            </Grid.Column>

          </Grid>
        </Form.Field>
        <Form.Field>
          <label>Avtalenavn</label>
          <Input placeholder='Avtalenavn' name='name' value={this.state.provisionAgreement.name}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Beskrivelse</label>
          <TextArea autoHeight placeholder='Beskrivelse' name='description'
                    value={this.state.provisionAgreement.description}
                    onChange={this.handleInputChange} readOnly={editMode}/>
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
              displayFormat="DD/MM/YYYY"
              disabled={editMode}
            />
          </div>
          </Form.Field>
          <Form.Field>
            <label>&nbsp;</label>
          </Form.Field>
          <Form.Field>
            <label>&nbsp;</label>
            Til
          <div>
            <SingleDatePicker
              date={this.state.durationTo}
              onDateChange={durationTo => this.setState({durationTo: durationTo})}
              focused={this.state.durationTofocused}
              onFocusChange={({focused: durationTofocused}) => this.setState({durationTofocused})}
              numberOfMonths={1}
              displayFormat="DD/MM/YYYY"
              disabled={editMode}
            />
          </div>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Hjemmelsgrunnlag</label>
          <Dropdown placeholder='Hjemmelsgrunnlag' selection options={pursuantOptions}
                    value={this.state.provisionAgreement.pursuant}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'pursuant')}
                    disabled={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Kanal</label>
          <Dropdown placeholder='Kanal' multiple selection options={exchangeChannelOptions} disabled={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Protokoll</label>
          <Dropdown placeholder='Protokoll' multiple selection options={protocolOptions} disabled={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Emne</label>
          <Dropdown placeholder='Emne' multiple search selection options={subjectsOptions} disabled={editMode}/>
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
    );
  }
}

export default ProvisionAgreement;