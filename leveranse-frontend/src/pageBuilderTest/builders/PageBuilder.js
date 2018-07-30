import React from 'react'
import { FormBuilder } from './FormBuilder'
import { getDomainData } from '../utilities/DataExchange'
import { upperCaseFirst } from '../utilities/Helpers'
import { enums } from '../utilities/Enums'
import { responseMessage } from '../utilities/FormComponents'
import { Container, Dimmer, Header, List, Loader, Message } from 'semantic-ui-react'

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
    let formConfigLength = Object.keys(this.domain.formConfig).length

    for (let property in this.domain.formConfig) {
      let type = this.domain.formConfig[property].type

      if (type === enums.TYPE.DROPDOWN_SINGLE || type === enums.TYPE.DROPDOWN_MULTIPLE) {
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

          if (counter === formConfigLength) {
            this.setState({errors: errors}, () => {this.setState({ready: true})})
          }
        }).catch((reason) => {
          errors.push(reason)

          counter++

          if (counter === formConfigLength) {
            this.setState({errors: errors}, () => {this.setState({ready: true})})
          }
        })
      } else {
        counter++

        if (counter === formConfigLength) {
          this.setState({errors: errors}, () => {this.setState({ready: true})})
        }
      }
    }
  }

  render () {
    const {errors, ready} = this.state

    return (
      <Container fluid>
        <Dimmer active={!ready} inverted>
          <Loader inverted inline='centered' />
        </Dimmer>

        {!ready ? <Header as='h2' dividing content={this.domain.nameInNorwegian} /> : null}

        {ready && errors.length !== 0 ?
          <div>
            <Header as='h2' dividing content={this.domain.nameInNorwegian} />

            <Message info icon='warning'
                     header={enums.CONTENT.CANNOT_GENERATE + '\'' + this.domain.nameInNorwegian + '\''}
                     content={enums.CONTENT.CANNOT_FETCH_DROPDOWN_VALUES} />

            <List>
              {Object.keys(errors).map((item) => {
                return (
                  <List.Item key={item}>
                    {responseMessage(errors[item])}
                  </List.Item>
                )
              })}
            </List>
          </div>
          : null}

        {ready && errors.length === 0 ? <FormBuilder domain={this.domain} id={this.props.params} /> : null}
      </Container>
    )
  }
}

export default PageBuilder
