import React, { Component } from 'react'
import { Button, Form, Input, Modal, Dropdown, Checkbox } from 'semantic-ui-react'
import { editModeCheckbox, errorMessages, responseMessages, sendDataToBackend } from '../../utils/Common'
import InlineError from '../messages/InlineError'
import moment from 'moment'

const datatypeOptions = [
  {key: '1', text: 'Tekst', value: 'Tekst'},
  {key: '2', text: 'Heltall', value: 'Heltall'},
  {key: '3', text: 'Desimaltall', value: 'Desimaltall'},
  {key: '4', text: 'Dato', value: 'Dato'}
]

const dateformatOptions = [
  {key: '1', text: 'YYYY-MM-DD', value: 'YYYY-MM-DD'},
  {key: '2', text: 'DD/MM/YY', value: 'DD/MM/YY'}
]

const unitOfMeasurementeOptions = [
  {key: '1', text: '000Kr', value: '000Kr'},
  {key: '2', text: 'Tonn', value: 'Tonn'},
  {key: '3', text: 'Kg', value: 'Kg'}
]

class ValueDomain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valueDomain: {
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
        administrativeDetails: [],
        dataType: 0,
        minLength: 0,
        maxLength: 0,
        minValue: 0,
        maxValue: 0,
        minDecimals: 0,
        maxDecimals: 0,
        unitOfMeasurement: '',
        optional: false
      },
      valueDomainModalOpen: false,
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputChangeDeep = this.handleInputChangeDeep.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)

    if (this.props.valueDomainId !== 'new') {
      //TODO: Get ID and fetch valueDomain from backend
      this.state.valueDomain.name[0].languageText = this.props.valueDomainId
    } else {
      const uuidv1 = require('uuid/v1')
      this.state.valueDomain.id = uuidv1()
    }
  }

  handleEditModeClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode,
      response: {}
    })
  }

  handleValueDomainModalClose = (event) => {
    event.preventDefault()

    this.setState({
      valueDomainModalOpen: false
    })
  }

  handleValueDomainModalOpen = () => {
    this.setState({
      valueDomainModalOpen: true
    })
  }

  handleIsNewValueDomain = () => {
    this.handleSelectedUnitType('new').then(() => {
      this.ValueDomain.valueDomainModalOpen()
    })
  }

  handleInputChange (event) {
    this.setState({
      valueDomain: {
        ...this.state.valueDomain,
        [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
      }
    })
  }

  handleInputChangeDeep (event) {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      valueDomain: {
        ...this.state.valueDomain,
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
      valueDomain: {
        ...this.state.valueDomain,
        [name]: value
      }
    })
  }

  handleCheckboxChange () {
    this.setState({
      valueDomain: {
        ...this.state.valueDomain,
        nullable: !this.state.nullable
      }
    })
  }

  validateInputData = data => {
    const errors = {}

    if (!data.dataType) errors.dataType = 'Datatype må velges'
    if (!data.name[0].languageText) errors.name = 'Feltet kan ikke være tomt'

    return errors
  }

  validationOk = () => {
    const errors = this.validateInputData(this.state.valueDomain)

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  setUniqueDescription = () => {
    //TODO: Check with backend for valuedomains  simular to this
    //TODO: Make a cleaner function to make unique name
    let uniqueName = this.state.valueDomain.name[0].languageText + '_' +
      this.state.valueDomain.dataType + '_' +
      this.state.valueDomain.minLength + '_' +
      this.state.valueDomain.maxLength + '_' +
      this.state.valueDomain.minValue + '_' +
      this.state.valueDomain.maxValue + '_' +
      this.state.valueDomain.minDecimals + '_' +
      this.state.valueDomain.maxDecimals + '_' +
      this.state.valueDomain.unitOfMeasurement + '_' +
      this.state.valueDomain.optional

    this.setState({
      valueDomain: {
        ...this.state.valueDomain,
        description: [{
          languageCode: 'nb',
          languageText: uniqueName
        }]
      }
    }, () => console.log(this.state.valueDomain))
  }

  registerValueDomain = () => {
    this.setUniqueDescription()

    if (this.validationOk()) {
      this.setState({
        readOnlyMode: true,
        errors: {},
        waitingForResponse: true
      })

      sendDataToBackend('DescribedValueDomain/' + this.state.valueDomain.id, 'Verdiområdet', this.state.valueDomain).then((result) => {
        this.setState({
          response: result,
          waitingForResponse: false
        })
      })
    }
  }

  render () {
    const {readOnlyMode, valueDomain, waitingForResponse, errors, response} = this.state

    return (
      <Modal trigger={<Button primary floated='right' icon='edit' content='Registrer nytt verdiområde'
                              onClick={this.props.handleIsNewValueDomain}/>}
             open={this.state.valueDomainModalOpen}
             onClose={this.handleValueDomainModalClose} dimmer='inverted' centered={false} closeOnEscape={true}
             closeOnRootNodeClick={false}>
        <Modal.Header content='Verdiområde'/>
        <Modal.Content>
          <Form>
            <Form.Field>
              {editModeCheckbox(readOnlyMode, this.handleEditModeClick)}
              <label>Id</label>
              <Input value={this.state.valueDomain.id} readOnly='true'/>
            </Form.Field>

            {errorMessages(errors, 'Verdiområdet')}
            {responseMessages(readOnlyMode, response)}

            <Form.Field error={!!errors.dataType}>
              <label>Datatype</label>
              <Dropdown placeholder='Velg datatype' selection options={datatypeOptions}
                        disabled={readOnlyMode}
                        onChange={(event, {value}) => this.handleDropdownChange(value, 'dataType')}/>
              {errors.dataType && <InlineError text={errors.dataType}/>}
            </Form.Field>

            <Form.Group widths='equal'>
              {(this.state.valueDomain.dataType === 'Heltall' ||
                this.state.valueDomain.dataType === 'Tekst') &&
              <Form.Field>
                <label>MIN antall tegn</label>
                <Input name='minLength' type='number' placeholder='MIN antall tegn' readOnly={readOnlyMode}
                       value={valueDomain.minLength}
                       onChange={this.handleInputChange}/>
              </Form.Field>
              }

              {(this.state.valueDomain.dataType === 'Heltall' ||
                this.state.valueDomain.dataType === 'Tekst') &&
              <Form.Field>
                <label>MAX antall tegn</label>
                <Input name='maxLength' type='number' placeholder='MAX antall tegn' readOnly={readOnlyMode}
                       value={valueDomain.maxLength}
                       onChange={this.handleInputChange}/>
              </Form.Field>
              }
            </Form.Group>

            <Form.Group widths='equal'>
              {(this.state.valueDomain.dataType === 'Heltall' ||
                this.state.valueDomain.dataType === 'Desimaltall') &&
              <Form.Field>
                <label>MIN verdi</label>
                <Input name='minValue' type='number' placeholder='MIN verdi' readOnly={readOnlyMode}
                       value={valueDomain.minValue}
                       onChange={this.handleInputChange}/>
              </Form.Field>
              }

              {(this.state.valueDomain.dataType === 'Heltall' ||
                this.state.valueDomain.dataType === 'Desimaltall') &&
              <Form.Field>
                <label>MAX verdi</label>
                <Input name='maxValue' type='number' placeholder='MAX verdi' readOnly={readOnlyMode}
                       value={valueDomain.maxValue}
                       onChange={this.handleInputChange}/>
              </Form.Field>
              }
            </Form.Group>

            <Form.Group widths='equal'>
              {(this.state.valueDomain.dataType === 'Desimaltall') &&
              <Form.Field>
                <label>MIN desimal verdi</label>
                <Input name='minDecimals' type='number' placeholder='MIN antall desimaler' readOnly={readOnlyMode}
                       value={valueDomain.minDecimals}
                       onChange={this.handleInputChange}/>
              </Form.Field>
              }

              {(this.state.valueDomain.dataType === 'Desimaltall') &&
              <Form.Field>
                <label>MAX desimal verdi</label>
                <Input name='maxDecimals' type='number' placeholder='MAX antall desimaler' readOnly={readOnlyMode}
                       value={valueDomain.maxDecimals}
                       onChange={this.handleInputChange}/>
              </Form.Field>
              }
            </Form.Group>

            {(this.state.valueDomain.dataType === 'Heltall' ||
              this.state.valueDomain.dataType === 'Desimaltall') &&
            <Form.Field>
              <label>Måleenhet</label>
              <Dropdown placeholder='Velg måleenhet' selection options={unitOfMeasurementeOptions}
                        onChange={(event, {value}) => this.handleDropdownChange(value, 'unitOfMeasurement')}/>
            </Form.Field>
            }

            <Checkbox label='Kan være tom' checked={this.state.optional} readOnly={readOnlyMode}
                      onChange={this.handleCheckboxChange}/>

            <Form.Field>
              <Form.TextArea autoHeight name='description' label='Beskrivelse' placeholder='Beskrivelse'
                             readOnly={true} value={valueDomain.description[0].languageText}/>
            </Form.Field>

            <Form.Field error={!!errors.name}>
              <label>Navn</label>
              <Input name='name' placeholder='Navn' readOnly={readOnlyMode}
                     value={valueDomain.name[0].languageText} onChange={this.handleInputChangeDeep}/>
              {errors.name && <InlineError text={errors.name}/>}
            </Form.Field>

            <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='clipboard check'
                    content='Send til godkjenning' onClick={this.registerValueDomain}/>

            <Button negative floated='right' onClick={this.handleValueDomainModalClose} content='Tilbake'/>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ValueDomain
