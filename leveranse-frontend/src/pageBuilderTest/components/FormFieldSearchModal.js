import React from 'react'
import { enums } from '../utilities/Enums'
import { Divider, Form, Input, Popup } from 'semantic-ui-react'
import { InlineError } from '../utilities/FormComponents'
import SearchModal from './SearchModal'

class FormFieldSearchModal extends React.Component {
  state = {[enums.TYPE.SEARCH_MODAL_RETURN]: {title: '', url: '', description: '', domain: ''}}

  onUpdate = (value) => {
    this.setState({[enums.TYPE.SEARCH_MODAL_RETURN]: value})

    this.props.onUpdate(value)
  }

  render () {
    const {info} = this.props

    return (
      <div>
        <Form.Field key={info.index} error={!!info.errors[info.item]}>
          <label>{info.itemInNorwegian}</label>

          <Popup
            trigger={<Input name={info.item} placeholder={info.itemInNorwegian} readOnly={true}
                            value={this.state[enums.TYPE.SEARCH_MODAL_RETURN].url}
                            action={{
                              color: 'teal', labelPosition: 'right', icon: 'search',
                              content: enums.CONTENT.SEARCH, onClick: (() => this.SearchModal.handleSearchModalOpen())
                            }} />}
            header={this.state[enums.TYPE.SEARCH_MODAL_RETURN].title}
            content={this.state[enums.TYPE.SEARCH_MODAL_RETURN].description}
            flowing hoverable hideOnScroll position='top center'
          />

          {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
        </Form.Field>

        <SearchModal text={this.onUpdate} info={info} ref={SearchModal => {this.SearchModal = SearchModal}} />

        <Divider fitted hidden />
      </div>
    )
  }
}

export default FormFieldSearchModal
