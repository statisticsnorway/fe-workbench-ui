import React, { Component } from 'react'
import { Button, Form, Input, Label, Modal, Header } from 'semantic-ui-react'
import { editModeCheckbox, errorMessages, responseMessages, sendDataToBackend } from '../../utils/Common'
import InlineError from '../messages/InlineError'

class ValueDomain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valueDomain: {
        id: '',
        name: '',
        description: ''
      },
      valueDomainModalOpen: false,
      readOnlyMode: false,
      response: {},
      errors: {},
      waitingForResponse: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
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
        ...this.state.unitType,
        [event.target.name]: event.target.value
      }
    })
  }

  render () {
    return (
      <Modal trigger={<Button primary floated='right' icon='edit' content='Registrer ny enhetstype'
                              onClick={this.props.handleIsNewValueDomain} />} open={this.state.valueDomainModalOpen}
             onClose={this.handleValueDomainModalClose} dimmer='inverted' centered={false} closeOnEscape={false}
             closeOnRootNodeClick={false}>
        <Modal.Header content='Verdiområde' />
      </Modal>
    )
  }
}

export default ValueDomain
