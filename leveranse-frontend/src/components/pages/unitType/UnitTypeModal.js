import React from 'react'
import { Button, Form, Input, Label, Modal } from 'semantic-ui-react'

class UnitTypeModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unitTypeModalOpen: false,
      unitType: {
        id: ''
      }
    }

    const uuidv1 = require('uuid/v1')
    this.state.unitType.id = uuidv1()
  }

  handleUnitTypeModalOpen = () => {
    this.setState({
      unitTypeModalOpen: true
    })
  }

  handleUnitTypeModalClose = () => {
    this.setState({
      unitTypeModalOpen: false
    })
  }

  render () {
    const {unitTypeModalOpen, unitType} = this.state

    return (
      <Modal trigger={<Button primary icon='edit' content='Registrer ny enhetstype'
                              onClick={this.handleUnitTypeModalOpen} />} open={unitTypeModalOpen}
             onClose={this.handleUnitTypeModalClose} dimmer='inverted' centered={false}>
        <Modal.Header content='Registrer ny enhetstype' />
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Navn</label>
                <Input placeholder='Navn' />
              </Form.Field>
              <Form.Field>
                <label>Kode</label>
                <Label size='big'>{unitType.id}</Label>
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <Form.TextArea autoHeight label='Beskrivelse' placeholder='Beskrivelse' />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field>
                <Button primary icon='clipboard check' content='Send til godkjenning' />
              </Form.Field>
              <Form.Field />
              <Form.Field>
                <Button negative onClick={this.handleUnitTypeModalClose} content='Tilbake' />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UnitTypeModal