import React from 'react'
import { Button, Form, Input, Label, Modal } from 'semantic-ui-react'
import { editModeCheckbox, errorMessages, responseMessages, sendDataToBackend } from '../../utils/Common'
import InlineError from '../messages/InlineError'
import moment from 'moment/moment'

class UnitTypeModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unitType: {
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
        }]
      },
      unitTypeModalOpen: false,
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputChangeDeep = this.handleInputChangeDeep.bind(this)

    if (this.props.unitTypeId !== 'new') {
      this.state.unitType.id = this.props.unitTypeId

      // Code to fetch the unitType from backend with the passed id
    } else {
      const uuidv1 = require('uuid/v1')
      this.state.unitType.id = uuidv1()
    }
  }

  handleUnitTypeModalOpen = () => {
    this.setState({
      unitTypeModalOpen: true
    })
  }

  handleUnitTypeModalClose = (event) => {
    event.preventDefault()

    this.setState({
      unitTypeModalOpen: false
    })
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
      unitType: {
        ...this.state.unitType,
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
      unitType: {
        ...this.state.unitType,
        [event.target.name]: [{
          languageCode: 'nb',
          languageText: event.target.value
        }]
      }
    })
  }

  validateInputData = data => {
    const errors = {}

    if (!data.name[0].languageText) errors.name = 'Feltet kan ikke være tomt'
    if (!data.description[0].languageText) errors.description = 'Feltet kan ikke være tomt'

    return errors
  }

  validationOk = () => {
    const errors = this.validateInputData(this.state.unitType)

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  registerUnitType = () => {
    if (this.validationOk()) {
      this.setState({
        readOnlyMode: true,
        errors: {},
        waitingForResponse: true
      })

      sendDataToBackend('UnitType/' + this.state.unitType.id, 'Enhetstypen', this.state.unitType).then((result) => {
        this.setState({
          response: result,
          waitingForResponse: false
        })
      })
    }
  }

  render () {
    const {errors, response, readOnlyMode, waitingForResponse, unitTypeModalOpen, unitType} = this.state

    return (
      <Modal trigger={<Button primary floated='right' icon='edit' content='Registrer ny enhetstype'
                              onClick={this.props.handleIsNewUnitType} />} open={unitTypeModalOpen}
             onClose={this.handleUnitTypeModalClose} dimmer='inverted' centered={false} closeOnEscape={false}
             closeOnRootNodeClick={false}>
        <Modal.Header content='Enhetstype' />
        <Modal.Content>
          <Form>
            {editModeCheckbox(readOnlyMode, this.handleEditModeClick)}
            {errorMessages(errors, 'Enhetstypen')}
            {responseMessages(readOnlyMode, response)}

            <Form.Group widths='equal'>
              <Form.Field error={!!errors.name}>
                <label>Navn</label>
                <Input name='name' placeholder='Navn' readOnly={readOnlyMode} value={unitType.name[0].languageText}
                       onChange={this.handleInputChangeDeep} />
                {errors.name && <InlineError text={errors.name} />}
              </Form.Field>
              <Form.Field>
                <label>Kode</label>
                <Label size='big' content={unitType.id} />
              </Form.Field>
            </Form.Group>

            <Form.Field error={!!errors.description}>
              <Form.TextArea autoHeight name='description' label='Beskrivelse' placeholder='Beskrivelse'
                             readOnly={readOnlyMode} value={unitType.description[0].languageText} onChange={this.handleInputChangeDeep} />
              {errors.description && <InlineError text={errors.description} />}
            </Form.Field>

            <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='clipboard check'
                    content='Send til godkjenning' onClick={this.registerUnitType} />
            <Button negative floated='right' onClick={this.handleUnitTypeModalClose} content='Tilbake' />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UnitTypeModal