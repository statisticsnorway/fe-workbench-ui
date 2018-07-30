import React from 'react'
import { connect } from 'react-redux'
import { Button, Container, Dimmer, Divider, Form, Grid, Header, List, Loader } from 'semantic-ui-react'
import {
  editModeCheckbox,
  errorMessages,
  formFieldBoolean,
  formFieldDate,
  formFieldDropdownMultiple,
  formFieldDropdownSingle,
  formFieldNumber,
  formFieldText,
  formFieldTextArea,
  responseMessage
} from '../utilities/FormComponents'
import { translateToNorwegian } from '../utilities/Translation'
import { getDomainData, sendDomainData } from '../utilities/DataExchange'
import { buildDomainState } from './StateBuilder'
import { isNumericOrEmptyString, lowerCaseFirst } from '../utilities/Helpers'
import { enums } from '../utilities/Enums'
import * as moment from 'moment'
import 'moment/min/locales'
import FormFieldKlassUrl from '../components/FormFieldKlassUrl'
import FormFieldSearchModal from '../components/FormFieldSearchModal'

moment.locale(enums.LANGUAGE_CODE.NORWEGIAN)

class FormBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}

    this.id = this.props.id.id
    this.objectName = this.props.domain.name
    this.objectNameLowerCase = lowerCaseFirst(this.props.domain.name)
    this.objectNameNorwegian = this.props.domain.nameInNorwegian
    this.objectNameNorwegianLowerCase = lowerCaseFirst(this.props.domain.nameInNorwegian)
    this.objectNameDefinitive = this.props.domain.nameDefinitive
    this.formConfig = this.props.domain.formConfig
    this.user = this.props.authentication.user
  }

  componentDidMount () {
    getDomainData(this.objectName, enums.URL_AFFIX.SCHEMA).then((result) => {
      //TODO: There is a bug, if you are on a domain page with fetched data and directly click to make a new instance
      // of the same domain you are on, it will not reload the component. It may be possible to use
      // componentWillMount() {resetComponent()} or something to that effect.
      buildDomainState(this.objectName, this.formConfig, this.user, result, this.id).then((result) => {
        this.setState(result, () => {this.setState({ready: true})})
      })
    }).catch((reason) => {
      this.setState({response: reason})
    })
  }

  handleEditModeClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode,
      response: {}
    })
  }

  handleInputChange = (event) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        [event.target.name]: event.target.value
      }
    })
  }

  handleInputChangeDeep = (event) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        [event.target.name]: [{
          [enums.PROPERTY.LANGUAGE_CODE]: enums.LANGUAGE_CODE.NORWEGIAN,
          [enums.PROPERTY.LANGUAGE_TEXT]: event.target.value
        }]
      }
    })
  }

  handleDropdownChange (value, name) {
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: ''
      },
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        [name]: value
      }
    })
  }

  handleDateChange (name, date) {
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: ''
      },
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        [name]: date
      }
    })
  }

  handleBooleanChange (name) {
    this.setState({
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        [name]: !this.state[this.objectNameLowerCase][name]
      }
    })
  }

  handleNumberChange = (event) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [event.target.name]: ''
      },
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        [event.target.name]: parseFloat(event.target.value)
      }
    })
  }

  handleKlassUrlChange = (value) => {
    let url = value.url
    let description = value.description

    this.setState({
      errors: {
        ...this.state.errors,
        [enums.TYPE.KLASS_URL]: '',
        [enums.PROPERTY.DESCRIPTION]: ''
      },
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        [enums.TYPE.KLASS_URL]: url,
        [enums.PROPERTY.DESCRIPTION]: [{
          [enums.PROPERTY.LANGUAGE_CODE]: enums.LANGUAGE_CODE.NORWEGIAN,
          [enums.PROPERTY.LANGUAGE_TEXT]: description
        }]
      }
    })
  }

  handleSearchModalChange = (value) => {
    let url = value.url
    let property = value.domain

    this.setState({
      errors: {
        ...this.state.errors,
        [property]: ''
      },
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        [property]: url
      }
    })
  }

  setVersion () {
    return (Number.parseFloat(this.state[this.objectNameLowerCase][enums.PROPERTY.VERSION]) + 0.1).toFixed(1)
  }

  validateInputData = () => {
    const errors = {}

    this.state.required.forEach((element) => {
      let type = this.state.form[element].type
      let formConfigType = this.formConfig[element].type

      if (type === enums.TYPE.ARRAY && this.state.form[element][enums.PROPERTY.ITEMS].hasOwnProperty(enums.PROPERTY.REF) &&
        this.state.form[element][enums.PROPERTY.ITEMS][enums.PROPERTY.REF] === enums.REFERENCE.MULTILINGUAL_TEXT) {
        if (!this.state[this.objectNameLowerCase][element][0][enums.PROPERTY.LANGUAGE_TEXT]) {
          if (formConfigType === enums.TYPE.DROPDOWN_SINGLE || formConfigType === enums.TYPE.DROPDOWN_MULTIPLE) {
            errors[element] = enums.CONTENT.DROPDOWN_EMPTY
          } else {
            errors[element] = enums.CONTENT.FIELD_EMPTY
          }
        }
      } else {
        if (!this.state[this.objectNameLowerCase][element]) {
          switch (formConfigType) {
            case enums.TYPE.DROPDOWN_SINGLE:
              errors[element] = enums.CONTENT.DROPDOWN_EMPTY
              break

            case enums.TYPE.DROPDOWN_MULTIPLE:
              errors[element] = enums.CONTENT.DROPDOWN_EMPTY
              break

            case enums.TYPE.SEARCH:
              errors[element] = enums.CONTENT.SEARCH_EMPTY
              break

            case enums.TYPE.KLASS_URL:
              errors[element] = enums.CONTENT.KLASS_URL_EMPTY
              break

            default:
              errors[element] = enums.CONTENT.FIELD_EMPTY
          }
        }
      }
    })

    Object.keys(this.state[this.objectNameLowerCase]).forEach((key) => {
      let type = this.formConfig[key].type

      switch (type) {
        case enums.TYPE.DATE:
          if (!this.state[this.objectNameLowerCase][key]) {
            errors[key] = enums.CONTENT.DATE_EMPTY
          }
          break

        case enums.TYPE.NUMBER:
          if (!isNumericOrEmptyString(this.state[this.objectNameLowerCase][key])) {
            errors[key] = enums.CONTENT.NOT_A_NUMBER
          }
          break

        case enums.TYPE.KLASS_URL:
          let url = this.state[this.objectNameLowerCase][key]
          let description = this.state[this.objectNameLowerCase][enums.PROPERTY.DESCRIPTION][0][enums.PROPERTY.LANGUAGE_TEXT]

          if (url.endsWith('selectCodes=')) {
            errors[key] = enums.CONTENT.KLASS_INVALID.CODES
          }
          if (description.endsWith('/')) {
            errors[enums.PROPERTY.DESCRIPTION] = enums.CONTENT.KLASS_INVALID.DESCRIPTION
          }
          break

        default:
      }
    })

    //TODO: Add more validations

    return errors
  }

  validationOk = () => {
    const errors = this.validateInputData()

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  inititateSave = () => {
    this.setState({
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        [enums.PROPERTY.ADMINISTRATIVE_DETAILS]: [{
          [enums.PROPERTY.ADMINISTRATIVE_DETAIL_TYPE]: '',
          [enums.PROPERTY.VALUES]: []
        }],
        [enums.PROPERTY.ADMINISTRATIVE_STATUS]: '',
        [enums.PROPERTY.LAST_UPDATED_BY]: this.user,
        [enums.PROPERTY.LAST_UPDATED_DATE]: moment(),
        [enums.PROPERTY.VALID_FROM]: moment(),
        [enums.PROPERTY.VALID_UNTIL]: moment().add(1, 'years'),
        [enums.PROPERTY.VERSION_RATIONALE]: [{
          [enums.PROPERTY.LANGUAGE_CODE]: enums.LANGUAGE_CODE.NORWEGIAN,
          [enums.PROPERTY.LANGUAGE_TEXT]: ''
        }],
        [enums.PROPERTY.VERSION_VALID_FROM]: moment()
      }
    }, () => {
      if (this.validationOk()) {
        let updatedVersion = this.setVersion()

        this.setState({
          [this.objectNameLowerCase]: {
            ...this.state[this.objectNameLowerCase],
            [enums.PROPERTY.VERSION]: updatedVersion
          },
          readOnlyMode: true,
          errors: {},
          waitingForResponse: true
        }, () => {
          let name = this.objectName
          let data = this.state[this.objectNameLowerCase]
          let nameDefinitive = this.objectNameDefinitive
          let id = this.state[this.objectNameLowerCase][enums.PROPERTY.ID]

          sendDomainData(name + '/' + id, nameDefinitive, data).then((result) => {
            this.setState({
              response: result,
              waitingForResponse: false
            })
          })
        })
      }
    })
  }

  render () {
    const {readOnlyMode, waitingForResponse, response, errors, form, ready} = this.state

    return (
      <Container fluid>
        <Dimmer active={typeof response === 'undefined'} inverted>
          <Loader inverted inline='centered' />
        </Dimmer>

        <Header as='h2' dividing content={this.objectNameNorwegian} />

        {ready && typeof form !== 'undefined' ?
          <div>
            {editModeCheckbox(readOnlyMode, this.handleEditModeClick)}
            <Divider hidden />
          </div>
          : null
        }

        {errorMessages(errors, this.objectNameDefinitive)}

        {responseMessage(response)}

        {ready && typeof form !== 'undefined' ?
          <div>
            <Form>
              <Grid>
                <Grid.Column width={6}>
                  {Object.keys(form).map((item, index) => {
                    if (this.formConfig.hasOwnProperty(item) && this.formConfig[item].type !== enums.TYPE.AUTOFILLED) {
                      let info = {
                        index: index,
                        item: item,
                        itemInNorwegian: translateToNorwegian[item],
                        readOnlyMode: readOnlyMode,
                        errors: errors
                      }
                      let type = this.formConfig[item].type
                      let value = this.state[this.objectNameLowerCase][item]
                      let values = this.formConfig[item].values
                      let deepValue

                      switch (type) {
                        case enums.TYPE.TEXT:
                          if (form[item].hasOwnProperty(enums.PROPERTY.ITEMS) &&
                            form[item][enums.PROPERTY.ITEMS].hasOwnProperty(enums.PROPERTY.REF) &&
                            form[item][enums.PROPERTY.ITEMS][enums.PROPERTY.REF] === enums.REFERENCE.MULTILINGUAL_TEXT) {
                            deepValue = this.state[this.objectNameLowerCase][item][0][enums.PROPERTY.LANGUAGE_TEXT]

                            return formFieldText(info, this.handleInputChangeDeep, deepValue)
                          } else {
                            return formFieldText(info, this.handleInputChange, value)
                          }

                        case enums.TYPE.TEXT_AREA:
                          if (form[item].hasOwnProperty(enums.PROPERTY.ITEMS) &&
                            form[item][enums.PROPERTY.ITEMS].hasOwnProperty(enums.PROPERTY.REF) &&
                            form[item][enums.PROPERTY.ITEMS][enums.PROPERTY.REF] === enums.REFERENCE.MULTILINGUAL_TEXT) {
                            deepValue = this.state[this.objectNameLowerCase][item][0][enums.PROPERTY.LANGUAGE_TEXT]

                            if (this.state[this.objectNameLowerCase].hasOwnProperty(enums.TYPE.KLASS_URL)) {
                              return formFieldTextArea(info, this.handleInputChangeDeep, deepValue, true)
                            } else {
                              return formFieldTextArea(info, this.handleInputChangeDeep, deepValue, info.readOnlyMode)
                            }
                          } else {
                            return formFieldTextArea(info, this.handleInputChange, value, info.readOnlyMode)
                          }

                        case enums.TYPE.DROPDOWN_SINGLE:
                          return formFieldDropdownSingle(info, ((event, {value}) => this.handleDropdownChange(value, item)), values)

                        case enums.TYPE.DROPDOWN_MULTIPLE:
                          return formFieldDropdownMultiple(info, ((event, {value}) => this.handleDropdownChange(value, item)), values)

                        case enums.TYPE.DATE:
                          return formFieldDate(info, (this.handleDateChange.bind(this, item)), value)

                        case enums.TYPE.BOOLEAN:
                          return formFieldBoolean(info, (this.handleBooleanChange.bind(this, item)), value)

                        case enums.TYPE.SEARCH:
                          return <FormFieldSearchModal key={info.item} info={info}
                                                       onUpdate={this.handleSearchModalChange} />

                        case enums.TYPE.NUMBER:
                          return formFieldNumber(info, this.handleNumberChange, value)

                        case enums.TYPE.KLASS_URL:
                          return <FormFieldKlassUrl key={info.item} info={info} onUpdate={this.handleKlassUrlChange} value={value} />

                        //TODO: Add more form components

                        default:
                      }
                    }

                    return null
                  })}
                </Grid.Column>

                <Grid.Column width={1} />

                <Grid.Column width={9}>
                  <Header as='h3' content={enums.CONTENT.DETAILS} />

                  <List relaxed='very'>
                    {Object.keys(this.formConfig).map((item, index) => {
                      if (this.formConfig[item].type === enums.TYPE.AUTOFILLED) {
                        let content

                        if (form[item].type === enums.TYPE.ARRAY && form[item].hasOwnProperty(enums.PROPERTY.ITEMS) &&
                          form[item][enums.PROPERTY.ITEMS].hasOwnProperty(enums.PROPERTY.REF) &&
                          form[item][enums.PROPERTY.ITEMS][enums.PROPERTY.REF] === enums.REFERENCE.MULTILINGUAL_TEXT) {
                          content = this.state[this.objectNameLowerCase][item][0][enums.PROPERTY.LANGUAGE_TEXT]
                        }

                        if (form[item].type === enums.TYPE.STRING) {
                          if (form[item].hasOwnProperty(enums.PROPERTY.FORMAT) && form[item].format === enums.TYPE.DATE) {
                            let date = moment(this.state[this.objectNameLowerCase][item])

                            if (date.isValid()) {
                              content = date.format('LLL')
                            } else {
                              content = ''
                            }
                          } else {
                            content = this.state[this.objectNameLowerCase][item]
                          }
                        }

                        return (
                          <List.Item key={index}>
                            <List.Header>{translateToNorwegian[item]}</List.Header>
                            {content}
                          </List.Item>
                        )
                      }

                      return null
                    })}
                  </List>
                </Grid.Column>
              </Grid>

              <Grid>
                <Grid.Column>
                  <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                          content={enums.CONTENT.SAVE + ' ' + this.objectNameNorwegianLowerCase}
                          onClick={this.inititateSave} />
                </Grid.Column>
              </Grid>
            </Form>
          </div>
          : null}
      </Container>
    )
  }
}

function mapStateToProps (state) {
  const {authentication} = state

  return {
    authentication
  }
}

const connectedFormBuilder = connect(mapStateToProps)(FormBuilder)
export { connectedFormBuilder as FormBuilder }
