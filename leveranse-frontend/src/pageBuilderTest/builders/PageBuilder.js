import React from 'react'
import { FormBuilder } from './FormBuilder'

class PageBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.domain = this.props.domain
  }

  render () {
    return (
      <FormBuilder domain={this.domain} />
    )
  }
}

export default PageBuilder