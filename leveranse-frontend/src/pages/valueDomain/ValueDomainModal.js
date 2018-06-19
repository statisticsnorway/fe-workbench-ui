import React, { Component } from 'react'
import { Button, Form, Input, Label, Modal, Header, Dropdown, Checkbox } from 'semantic-ui-react'
import { editModeCheckbox, errorMessages, responseMessages, sendDataToBackend } from '../../utils/Common'
import InlineError from '../messages/InlineError'

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
        name: '',
        dataType: '',
        dateformat: '',
        minNumberChar: '',
        maxNumberChar: '',
        minValue: '',
        maxValue: '',
        minNumberDec: '',
        maxNumberDec: '',
        unitOfMeasurement: '',
        nulladble: '',
        description: ''
      },
      valueDomainModalOpen: false,
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false,
      checked: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)

    console.log(this.props.selectedValueDomainId)

    if (this.props.selectedValueDomainId !== 'new') {
      this.state.valueDomain.id = this.props.valueDomainId

      // Code to fetch the valueDomain from backend with the passed id
    } else {
      console.log('kommer hit')
      const uuidv1 = require('uuid/v1')

      this.setState({
        valueDomain: {
          ...this.state.valueDomain,
          id: uuidv1()
        }
      })
    }
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
    if (!data.name) errors.name = 'Feltet kan ikke være tomt'

    return errors
  }

  validationOk = () => {
    const errors = this.validateInputData(this.state.valueDomain)

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  makeUniqueName () {
    let uniqueName = this.state.valueDomain.name + '_' +
      this.state.valueDomain.dataType + '_' +
      this.state.valueDomain.dateformat + '_' +
      this.state.minNumberChar + '_' +
      this.state.maxNumberChar + '_' +
      this.state.minValue + '_' +
      this.state.maxValue + '_' +
      this.state.minNumberDec + '_' +
      this.state.maxNumberDec + '_' +
      this.state.unitOfMeasurement + '_' +
      this.state.nulladble

    return uniqueName
  }

  registerValueDomain = () => {

    if (this.validationOk()) {
      this.setState({
        valueDomain: {
          ...this.state.valueDomain,
          description: this.makeUniqueName()
        },
        readOnlyMode: true,
        errors: {},
        waitingForResponse: true
      })

      sendDataToBackend('/valueDomain', 'Verdiområdet', this.state.valueDomain).then((result) => {
        this.setState({
          response: result,
          waitingForResponse: false
        })
      })
    }
  }

  render () {
    const {readOnlyMode, valueDomain, valueDomainModalOpen, waitingForResponse, errors, response} = this.state
    console.log(this.state)

    return (
      <Modal trigger={<Button primary floated='right' icon='edit' content='Registrer nytt verdiområde'
                              onClick={this.props.handleIsNewValueDomain} />} open={this.state.valueDomainModalOpen}
             onClose={this.handleValueDomainModalClose} dimmer='inverted' centered={false} closeOnEscape={true}
             closeOnRootNodeClick={false}>
        <Modal.Header content='Verdiområde' />

        <Form>
          <Form.Field>
            {editModeCheckbox(readOnlyMode, this.handleEditModeClick)}
            <label>Id</label>
            <Input value={this.state.valueDomain.id} readOnly='true' />
          </Form.Field>

          {errorMessages(errors, 'Verdiområdet')}
          {responseMessages(readOnlyMode, response)}

          <Form.Field error={!!errors.dataType}>
            <label>Datatype</label>
            <Dropdown placeholder='Velg datatype' selection options={datatypeOptions}
                      disabled={readOnlyMode}
                      onChange={(event, {value}) => this.handleDropdownChange(value, 'dataType')} />
            {errors.dataType && <InlineError text={errors.dataType} />}
          </Form.Field>

          {(this.state.valueDomain.dataType === 'Dato') &&
          <Form.Field>
            <label>Datoformat</label>
            <Dropdown placeholder='Velg datoformat' selection options={dateformatOptions}
                      disabled={readOnlyMode}
                      onChange={(event, {value}) => this.handleDropdownChange(value, 'dateformat')} />
          </Form.Field>
          }

          <Form.Group widths='equal'>
            {(this.state.valueDomain.dataType === 'Heltall' ||
              this.state.valueDomain.dataType === 'Tekst') &&
            <Form.Field>
              <label>MIN antall tegn</label>
              <Input name='minNumberChar' placeholder='MIN antall tegn' readOnly={readOnlyMode}
                     value={valueDomain.minNumberChar}
                     onChange={this.handleInputChange} />
            </Form.Field>
            }

            {(this.state.valueDomain.dataType === 'Heltall' ||
              this.state.valueDomain.dataType === 'Tekst') &&
            <Form.Field>
              <label>MAX antall tegn</label>
              <Input name='maxNumberChar' placeholder='MAX antall tegn' readOnly={readOnlyMode}
                     value={valueDomain.maxNumberChar}
                     onChange={this.handleInputChange} />
            </Form.Field>
            }
          </Form.Group>

          <Form.Group widths='equal'>
            {(this.state.valueDomain.dataType === 'Heltall' ||
              this.state.valueDomain.dataType === 'Desimaltall') &&
            <Form.Field>
              <label>MIN verdi</label>
              <Input name='minValue' placeholder='MIN verdi' readOnly={readOnlyMode}
                     value={valueDomain.minValue}
                     onChange={this.handleInputChange} />
            </Form.Field>
            }

            {(this.state.valueDomain.dataType === 'Heltall' ||
              this.state.valueDomain.dataType === 'Desimaltall') &&
            <Form.Field>
              <label>MAX verdi</label>
              <Input name='maxValue' placeholder='MAX verdi' readOnly={readOnlyMode}
                     value={valueDomain.maxValue}
                     onChange={this.handleInputChange} />
            </Form.Field>
            }
          </Form.Group>

          <Form.Group widths='equal'>
            {(this.state.valueDomain.dataType === 'Desimaltall') &&
            <Form.Field>
              <label>MIN desimal verdi</label>
              <Input name='minNumberDec' placeholder='MIN antall desimaler' readOnly={readOnlyMode}
                     value={valueDomain.minNumberDec}
                     onChange={this.handleInputChange} />
            </Form.Field>
            }

            {(this.state.valueDomain.dataType === 'Desimaltall') &&
            <Form.Field>
              <label>MAX desimal verdi</label>
              <Input name='maxNumberDec' placeholder='MAX antall desimaler' readOnly={readOnlyMode}
                     value={valueDomain.maxNumberDec}
                     onChange={this.handleInputChange} />
            </Form.Field>
            }
          </Form.Group>

          {(this.state.valueDomain.dataType === 'Heltall' ||
            this.state.valueDomain.dataType === 'Desimaltall') &&
          <Form.Field error={!!errors.unitOfMeasurement}>
            <label>Måleenhet</label>
            <Dropdown placeholder='Velg måleenhet' selection options={unitOfMeasurementeOptions}
                      onChange={(event, {value}) => this.handleDropdownChange(value, 'unitOfMeasurement')} />
            {errors.unitOfMeasurement && <InlineError text={errors.unitOfMeasurement} />}
          </Form.Field>
          }

          <Checkbox label='Kan være tom' checked={this.state.checked}
                    onChange={this.handleCheckboxChange} />

          <Form.Field>
            <Form.TextArea autoHeight name='description' label='Beskrivelse' placeholder='Beskrivelse'
                           readOnly={true} value={valueDomain.description}
                           onChange={this.handleInputChange} />
          </Form.Field>

          <Form.Field error={!!errors.name}>
            <label>Navn</label>
            <Input name='name' placeholder='Navn' readOnly={readOnlyMode}
                   value={valueDomain.name} onChange={this.handleInputChange} />
            {errors.name && <InlineError text={errors.name} />}
          </Form.Field>

          <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='clipboard check'
                  content='Send til godkjenning' onClick={this.registerValueDomain} />

          <Button negative floated='right' onClick={this.handleValueDomainModalClose} content='Tilbake' />
        </Form>
      </Modal>
    )
  }
}

export default ValueDomain
