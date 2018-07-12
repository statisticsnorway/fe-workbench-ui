import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Header } from 'semantic-ui-react'
import {
  editModeCheckbox,
  errorMessages, formFieldBoolean,
  formFieldDate,
  formFieldDropdownMultiple,
  formFieldDropdownSingle,
  formFieldText,
  formFieldTextArea,
  responseMessage
} from '../utilities/FormComponents'
import { translateToNorwegian } from '../utilities/Translation'
import { getDomainStructure, sendDomainData } from '../utilities/DataExchange'
import { buildNewState } from './StateBuilder'
import { lowerCaseFirst } from '../utilities/Helpers'

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
      // Should check here if we should build a new state or populate one with stored values
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
          languageCode: 'nb',
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

  validateInputData = () => {
    const errors = {}

    this.state.required.forEach((element) => {
      if (this.state.form[element].type === 'array' && this.state.form[element].items.hasOwnProperty('$ref') && this.state.form[element].items.$ref === '#/definitions/MultilingualText') {
        if (!this.state[this.objectNameLowerCase][element][0].languageText) {
          errors[element] = 'Feltet kan ikke være tomt'
        }
      } else {
        if (!this.state[this.objectNameLowerCase][element]) {
          errors[element] = 'Feltet kan ikke være tomt'
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
    //TODO: Set autofilled states before validating and sending to backend

    if (this.validationOk()) {
      this.setState({
        readOnlyMode: true,
        errors: {},
        waitingForResponse: true
      })

      sendDomainData(this.objectName + '/' + this.state[this.objectNameLowerCase].id, this.objectNameDefinitive,
        this.state[this.objectNameLowerCase]).then((result) => {
        this.setState({
          response: result,
          waitingForResponse: false
        })
      })
    }
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
          let info = {
            index: index,
            item: item,
            itemInNorwegian: translateToNorwegian[item],
            readOnlyMode: readOnlyMode,
            errors: errors
          }

          if (this.formConfig.hasOwnProperty(item) && this.formConfig[item].type !== 'autofilled') {
            let value = this.state[this.objectNameLowerCase][item]
            let deepValue
            let type = this.formConfig[item].type
            let values = this.formConfig[item].values

            if (type === 'text') {
              if (form[item].hasOwnProperty('items') && form[item].items.hasOwnProperty('$ref') && form[item].items.$ref === '#/definitions/MultilingualText') {
                deepValue = this.state[this.objectNameLowerCase][item][0].languageText

                return formFieldText(info, this.handleInputChangeDeep, deepValue)
              } else {
                return formFieldText(info, this.handleInputChange, value)
              }
            }

            if (type === 'textArea') {
              if (form[item].hasOwnProperty('items') && form[item].items.hasOwnProperty('$ref') && form[item].items.$ref === '#/definitions/MultilingualText') {
                deepValue = this.state[this.objectNameLowerCase][item][0].languageText

                return formFieldTextArea(info, this.handleInputChangeDeep, deepValue)
              } else {
                return formFieldTextArea(info, this.handleInputChange, value)
              }
            }

            if (type === 'dropdownSingle') {
              return formFieldDropdownSingle(info, ((event, {value}) => this.handleDropdownChange(value, item)), values)
            }

            if (type === 'dropdownMultiple') {
              return formFieldDropdownMultiple(info, ((event, {value}) => this.handleDropdownChange(value, item)), values)
            }

            if (type === 'date-time') {
              return formFieldDate(info, (this.handleDateChange.bind(this, item)), value)
            }

            if (type === 'boolean') {
              return formFieldBoolean(info, (this.handleBooleanChange.bind(this, item)), value)
            }

            //TODO: Add more form components
          }
        })}

        {typeof form !== 'undefined' ?
          <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                  content={'Lagre ' + this.objectNameNorwegianLowerCase} onClick={this.saveToBackend} />
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