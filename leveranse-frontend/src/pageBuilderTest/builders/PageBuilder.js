import React from 'react'
import { FormBuilder } from './FormBuilder'
import { getDomainData } from '../utilities/DataExchange'
import { upperCaseFirst } from '../utilities/Helpers'
import { enums } from '../utilities/Enums'
import { responseMessage } from '../utilities/FormComponents'
import { Container, Message } from 'semantic-ui-react'

class PageBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: [],
      ready: false
    }

    this.domain = this.props.domain
  }

  componentDidMount () {
    let errors = []
    let counter = 0

    for (let property in this.domain.formConfig) {
      if (this.domain.formConfig[property].type === enums.TYPE.DROPDOWN_SINGLE || this.domain.formConfig[property].type === enums.TYPE.DROPDOWN_MULTIPLE) {
        let name = upperCaseFirst(property)

        getDomainData(name, enums.URL_AFFIX.LIST).then((result) => {
          let theList = []

          for (let i = 0, l = result.length; i < l; i++) {
            let object = {
              key: result[i][enums.PROPERTY.ID],
              text: result[i][enums.PROPERTY.NAME][0][enums.PROPERTY.LANGUAGE_TEXT],
              value: '/' + name + '/' + result[i][enums.PROPERTY.ID]
            }

            theList.push(object)
          }
          this.domain.formConfig[property].values = theList

          counter++

          if (counter === Object.keys(this.domain.formConfig).length) {
            this.setState({errors: errors}, () => {this.setState({ready: true})})
          }
        }).catch((reason) => {
          errors.push(reason)

          counter++

          if (counter === Object.keys(this.domain.formConfig).length) {
            this.setState({errors: errors}, () => {this.setState({ready: true})})
          }
        })
      } else {
        counter++

        if (counter === Object.keys(this.domain.formConfig).length) {
          this.setState({errors: errors}, () => {this.setState({ready: true})})
        }
      }
    }
  }

  render () {
    const {errors, ready} = this.state

    return (
      <div>
        {ready && errors.length !== 0 ?
          <Message info icon='warning'
                   header={enums.CONTENT.CANNOT_GENERATE + '\'' + this.domain.nameInNorwegian + '\''}
                   content={enums.CONTENT.CANNOT_FETCH_DROPDOWN_VALUES} />
          : null
        }

        {ready && errors.length !== 0 && Object.keys(errors).map((item) => {
          return (
            <Container key={item}>
              {responseMessage(errors[item])}
            </Container>
          )
        })}

        {ready && errors.length === 0 ? <FormBuilder domain={this.domain} id={this.props.params} /> : null}
      </div>
    )
  }
}

export default PageBuilder
