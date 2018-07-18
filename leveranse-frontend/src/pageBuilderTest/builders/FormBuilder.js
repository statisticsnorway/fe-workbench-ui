import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, List } from 'semantic-ui-react'
import {
  editModeCheckbox,
  errorMessages,
  formFieldBoolean,
  formFieldDate,
  formFieldDropdownMultiple,
  formFieldDropdownSingle,
  formFieldNumber,
  formFieldSearchModal,
  formFieldText,
  formFieldTextArea,
  responseMessage
} from '../utilities/FormComponents'
import { translateToNorwegian } from '../utilities/Translation'
import { getDomainStructure, sendDomainData } from '../utilities/DataExchange'
import { buildNewState } from './StateBuilder'
import { isNumericOrEmptyString, lowerCaseFirst } from '../utilities/Helpers'
import { enums } from '../utilities/Enums'
import * as moment from 'moment'
import 'moment/min/locales'
import FormFieldKlassUrl from '../components/FormFieldKlassUrl'

moment.locale(enums.LANGUAGE_CODE.NORWEGIAN)

class FormBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.objectName = this.props.domain.name
    this.objectNameLowerCase = lowerCaseFirst(this.props.domain.name)
    this.objectNameNorwegian = this.props.domain.nameInNorwegian
    this.objectNameNorwegianLowerCase = lowerCaseFirst(this.props.domain.nameInNorwegian)
    this.objectNameDefinitive = this.props.domain.nameDefinitive
    this.formConfig = this.props.domain.formConfig
    this.user = this.props.authentication.user.username
  }

  componentDidMount () {
    getDomainStructure(this.objectName).then((result) => {
      //TODO: Add check for creating a new instance of the domain og fetching one to update it
      this.setState(buildNewState(this.objectName, this.formConfig, this.user, result))
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
          switch(formConfigType) {
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

  handleButtonClick = () => {
    console.log(this.state)
    console.log(this.formConfig)
  }

  render () {
    const {readOnlyMode, waitingForResponse, response, errors, form} = this.state

    return (
      <Form loading={typeof form === 'undefined' && typeof response === 'undefined'}>
        <Header as='h2' dividing content={this.objectNameNorwegian} />

        <Grid>
          <Grid.Column width={10}>
            {typeof form !== 'undefined' ? editModeCheckbox(readOnlyMode, this.handleEditModeClick) : null}
            {errorMessages(errors, this.objectNameDefinitive)}
            {responseMessage(response)}

            {typeof form !== 'undefined' && Object.keys(form).map((item, index) => {
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
                    return formFieldSearchModal(info, this.handleInputChange, value)

                  case enums.TYPE.NUMBER:
                    return formFieldNumber(info, this.handleNumberChange, value)

                  case enums.TYPE.KLASS_URL:
                    return <FormFieldKlassUrl key={info.item} info={info} onUpdate={this.handleKlassUrlChange} />

                  //TODO: Add more form components

                  default:
                }
              }

              return null
            })}
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as='h3' content={enums.CONTENT.DETAILS} />
            <List relaxed='very'>
              {typeof form !== 'undefined' && Object.keys(this.formConfig).map((item, index) => {
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
            {typeof form !== 'undefined' ?
              <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                      content={enums.CONTENT.SAVE + ' ' + this.objectNameNorwegianLowerCase}
                      onClick={this.inititateSave} />
              : null}

            <Button onClick={this.handleButtonClick} content={'Test'} />
          </Grid.Column>
        </Grid>
      </Form>
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
