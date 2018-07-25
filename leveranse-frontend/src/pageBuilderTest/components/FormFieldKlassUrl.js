import React from 'react'
import { Form, Input, Popup } from 'semantic-ui-react'
import { InlineError } from '../utilities/FormComponents'
import Klass from './Klass'
import { enums } from '../utilities/Enums'

class FormFieldKlassUrl extends React.Component {
  state = {[enums.TYPE.KLASS_URL]: ''}

  onUpdate = (value) => {
    let url = value.url

    this.setState({[enums.TYPE.KLASS_URL]: url})

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
                            value={this.state[enums.TYPE.KLASS_URL]}
                            action={{
                              color: 'teal', labelPosition: 'right', icon: 'globe',
                              content: enums.CONTENT.GENERATE_KLASS_URL,
                              onClick: (() => this.Klass.handleAccordionClick())
                            }} />}
            content={this.state[enums.TYPE.KLASS_URL]} flowing hoverable hideOnScroll position='top center' />
          {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
        </Form.Field>
        <Klass url={this.onUpdate} ref={Klass => {this.Klass = Klass}} />
      </div>
    )
  }
}

export default FormFieldKlassUrl
