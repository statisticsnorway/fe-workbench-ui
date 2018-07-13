import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Header } from 'semantic-ui-react'
import {
  editModeCheckbox,
  errorMessages,
  formFieldBoolean,
  formFieldDate,
  formFieldDropdownMultiple,
  formFieldDropdownSingle,
  formFieldSearchModal,
  formFieldText,
  formFieldTextArea,
  responseMessage
} from '../utilities/FormComponents'
import { translateToNorwegian } from '../utilities/Translation'
import { getDomainStructure, sendDomainData } from '../utilities/DataExchange'
import { buildNewState } from './StateBuilder'
import { lowerCaseFirst } from '../utilities/Helpers'
import { enums } from '../utilities/Enums'
import * as moment from 'moment'
import 'moment/min/locales'

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
          languageCode: enums.LANGUAGE_CODE.NORWEGIAN,
          languageText: event.target.value
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

  setVersion () {
    return (Number.parseFloat(this.state[this.objectNameLowerCase].version) + 0.1).toFixed(1)
  }

  validateInputData = () => {
    const errors = {}

    this.state.required.forEach((element) => {
      let type = this.state.form[element].type
      let formConfigType = this.formConfig[element].type

      if (type === enums.TYPE.ARRAY && this.state.form[element].items.hasOwnProperty(enums.PROPERTY.REF) &&
        this.state.form[element].items.$ref === enums.REFERENCE.MULTILINGUAL_TEXT) {
        if (!this.state[this.objectNameLowerCase][element][0].languageText) {
          if (formConfigType === enums.TYPE.DROPDOWN_SINGLE || formConfigType === enums.TYPE.DROPDOWN_MULTIPLE) {
            errors[element] = enums.CONTENT.DROPDOWN_EMPTY
          } else {
            errors[element] = enums.CONTENT.FIELD_EMPTY
          }
        }
      } else {
        if (!this.state[this.objectNameLowerCase][element]) {
          if (formConfigType === enums.TYPE.DROPDOWN_SINGLE || formConfigType === enums.TYPE.DROPDOWN_MULTIPLE) {
            errors[element] = enums.CONTENT.DROPDOWN_EMPTY
          } else {
            errors[element] = enums.CONTENT.FIELD_EMPTY
          }
        }
      }
    })

    Object.keys(this.state[this.objectNameLowerCase]).forEach((key) => {
      let type = this.formConfig[key].type

      if (type === enums.TYPE.DATE) {
        if (!this.state[this.objectNameLowerCase][key]) {
          errors[key] = enums.CONTENT.DATE_EMPTY
        }
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

  saveToBackend = () => {
    this.setState({
      [this.objectNameLowerCase]: {
        ...this.state[this.objectNameLowerCase],
        administrativeDetails: [{
          administrativeDetailType: '',
          values: []
        }],
        administrativeStatus: '',
        lastUpdatedBy: this.user,
        lastUpdatedDate: moment(),
        validFrom: moment(),
        validUntil: moment().add(1, 'years'),
        versionRationale: [{
          languageCode: enums.LANGUAGE_CODE.NORWEGIAN,
          languageText: ''
        }],
        versionValidFrom: moment()
      }
    }, () => {
      if (this.validationOk()) {
        let updatedVersion = this.setVersion()

        this.setState({
          [this.objectNameLowerCase]: {
            ...this.state[this.objectNameLowerCase],
            version: updatedVersion
          },
          readOnlyMode: true,
          errors: {},
          waitingForResponse: true
        }, () => {
          let name = this.objectName
          let data = this.state[this.objectNameLowerCase]
          let nameDefinitive = this.objectNameDefinitive
          let id = this.state[this.objectNameLowerCase].id

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
                  form[item].items.hasOwnProperty(enums.PROPERTY.REF) &&
                  form[item].items.$ref === enums.REFERENCE.MULTILINGUAL_TEXT) {
                  deepValue = this.state[this.objectNameLowerCase][item][0].languageText

                  return formFieldText(info, this.handleInputChangeDeep, deepValue)
                } else {
                  return formFieldText(info, this.handleInputChange, value)
                }

              case enums.TYPE.TEXT_AREA:
                if (form[item].hasOwnProperty(enums.PROPERTY.ITEMS) &&
                  form[item].items.hasOwnProperty(enums.PROPERTY.REF) &&
                  form[item].items.$ref === enums.REFERENCE.MULTILINGUAL_TEXT) {
                  deepValue = this.state[this.objectNameLowerCase][item][0].languageText

                  return formFieldTextArea(info, this.handleInputChangeDeep, deepValue)
                } else {
                  return formFieldTextArea(info, this.handleInputChange, value)
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

              //TODO: Add more form components

              default:
            }
          }
        })}

        {typeof form !== 'undefined' ?
          <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                  content={enums.CONTENT.SAVE + ' ' + this.objectNameNorwegianLowerCase} onClick={this.saveToBackend} />
          : null}

        <Button onClick={this.handleButtonClick} content={'Test'} />
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
