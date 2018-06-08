import React from 'react'
import { sendDataToBackend } from '../../utils/Common'
import { Button, Checkbox, Container, Divider, Dropdown, Form, Header, Message } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'

class TargetPopulation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      targetPopulation: {
        id: '',
        description: '',
        unitTypes: [],
        geographicalClarification: '',
        timeInterval: ''
      },
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
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

    if (!data.description) errors.description = 'Feltet kan ikke være tomt'
    if (!data.unitTypes) errors.unitTypes = 'Ett eller flere valg må velges'
    if (!data.geographicalClarification) errors.geographicalClarification = 'Feltet kan ikke være tomt'
    if (!data.timeInterval) errors.timeInterval = 'Feltet kan ikke være tomt'

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

      sendDataToBackend('/targetPopulation', 'Målpopulasjonen', this.state.targetPopulation).then((result) => {
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
        <Header as='h3' dividing content='Målpopulasjon' />
        <Container textAlign='right'>
          <Checkbox toggle checked={!readOnlyMode} onClick={this.handleEditModeClick} icon='edit'
                    label='Redigeringsmodus' />
        </Container>
        <Divider hidden />
        {Object.keys(errors).length !== 0 && !Object.values(errors).every(i => (i === '')) ?
          <Message icon='warning' header={'Målpopulasjonen ble ikke lagret'}
                   content={'Rett opp i feilene og prøv igjen'} color='yellow' /> : null}
        {Object.keys(response).length !== 0 && readOnlyMode ?
          <Message icon={response.icon} header={response.header} content={response.text}
                   color={response.color} /> : null}
        <Form.Field error={!!errors.description}>
          <Form.TextArea autoHeight name='description' label='Beskrivelse' placeholder='Beskrivelse'
                         readOnly={readOnlyMode} value={targetPopulation.description}
                         onChange={this.handleInputChange} />
          {errors.description && <InlineError text={errors.description} />}
        </Form.Field>
        <Form.Field error={!!errors.unitTypes}>
          <label>Enhetstype(r) i målpopulasjon</label>
          <Dropdown placeholder='Enhetstype(r)' multiple selection options={tempUnitTypeOptions}
                    value={targetPopulation.unitTypes}
                    onChange={(event, {value}) => this.handleDropdownChange(value, 'unitTypes')}
                    disabled={readOnlyMode} />
          {errors.unitTypes && <InlineError text={errors.unitTypes} />}
        </Form.Field>
        <Form.Field error={!!errors.geographicalClarification}>
          <Form.TextArea autoHeight name='geographicalClarification' label='Geografi i målpopulasjon'
                         placeholder='Geografi i målpopulasjon'
                         readOnly={readOnlyMode} value={targetPopulation.geographicalClarification}
                         onChange={this.handleInputChange} />
          {errors.geographicalClarification && <InlineError text={errors.geographicalClarification} />}
        </Form.Field>
        <Form.Field error={!!errors.timeInterval}>
          <Form.TextArea autoHeight name='timeInterval' label='Tid i målpopulasjon' placeholder='Tid i målpopulasjon'
                         readOnly={readOnlyMode} value={targetPopulation.timeInterval}
                         onChange={this.handleInputChange} />
          {errors.timeInterval && <InlineError text={errors.timeInterval} />}
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