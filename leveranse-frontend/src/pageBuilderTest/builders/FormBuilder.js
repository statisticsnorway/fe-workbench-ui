import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Header } from 'semantic-ui-react'
import {
  editModeCheckbox,
  errorMessages,
  formFieldDropdownSingle,
  formFieldText,
  formFieldTextArea,
  responseMessage
} from '../utilities/FormComponents'
import { translateToNorwegian } from '../utilities/Translation'
import { getDomainStructure, sendDomainData } from '../utilities/DataExchange'
import { buildNewState } from './StateBuilder'

class FormBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.objectName = this.props.domain.name_EN
    this.objectNameLowerCase = this.props.domain.name_EN.toLowerCase()
    this.objectNameNorwegian = this.props.domain.name_NO
    this.objectNameNorwegianLowerCase = this.props.domain.name_NO.toLowerCase()
    this.objectNameDefinitive = this.props.domain.name_NO_definitive
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

  validateInputData = () => {
    const errors = {}

    this.state.required.forEach((element) => {
      if (this.state.form[element].hasOwnProperty('items') && this.state.form[element].items.hasOwnProperty('$ref') && this.state.form[element].items.$ref === '#/definitions/MultilingualText') {
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
            if (this.formConfig[item].type === 'text') {
              if (form[item].hasOwnProperty('items') && form[item].items.hasOwnProperty('$ref') && form[item].items.$ref === '#/definitions/MultilingualText') {
                return (
                  formFieldText(info, this.handleInputChangeDeep,
                    this.state[this.objectNameLowerCase][item][0].languageText)
                )
              } else {
                return (
                  formFieldText(info, this.handleInputChange,
                    this.state[this.objectNameLowerCase][item])
                )
              }
            }

            if (this.formConfig[item].type === 'textArea') {
              if (form[item].hasOwnProperty('items') && form[item].items.hasOwnProperty('$ref') && form[item].items.$ref === '#/definitions/MultilingualText') {
                return (
                  formFieldTextArea(info, this.handleInputChangeDeep, this.state[this.objectNameLowerCase][item][0].languageText)
                )
              } else {
                return (
                  formFieldTextArea(info, this.handleInputChange, this.state[this.objectNameLowerCase][item])
                )
              }
            }

            if (this.formConfig[item].type === 'dropdownSingle') {
              return (
                formFieldDropdownSingle(info, ((event, {value}) => this.handleDropdownChange(value, item)), this.formConfig[item].values)
              )
            }

            //TODO: Add more generic form components
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

function mapStateToProps(state) {
  const {authentication} = state

  return {
    authentication
  }
}

const connectedFormBuilder = connect(mapStateToProps)(FormBuilder)
export {connectedFormBuilder as FormBuilder}