import React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import {
  editModeCheckbox,
  errorMessages,
  formFieldDropdownSingle,
  formFieldText,
  formFieldTextArea,
  responseMessage
} from './CommonComponents'
import { translateToNorwegian } from './CommonTranslations'
import { getManagedDomainJsonFromBackend, sendDataToBackend } from './Common'
import { buildNewState } from './StateBuilder'
import { commonFormComponents } from './CommonFormComponents'

/* eslint-disable array-callback-return */

class FormBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.objectName = this.props.helper.name_EN
    this.objectNameLowerCase = this.props.helper.name_EN.toLowerCase()
    this.objectNameNorwegian = this.props.helper.name_NO
    this.objectNameNorwegianLowerCase = this.props.helper.name_NO.toLowerCase()
    this.objectNameDefinitive = this.props.helper.name_NO_definitive
    this.formConfig = this.props.helper.formConfig
  }

  componentDidMount () {
    getManagedDomainJsonFromBackend(this.objectName).then((result) => {
      // Should check here if we should build a new state or populate one with stored values (depending on if the user
      // has navigated through creating a new managed domain or fetching a stored one
      this.setState(buildNewState(this.objectName, result))
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
      if (this.formConfig[element].hasOwnProperty('stateMapping')) {
        if (this.formConfig[element].stateMapping === 'multilingualText') {
          if (!this.state[this.objectNameLowerCase][element][0].languageText) {
            errors[element] = 'Feltet kan ikke være tomt'
          }
        } else {
          if (!this.state[this.objectNameLowerCase][element]) {
            errors[element] = 'Feltet kan ikke være tomt'
          }
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

      sendDataToBackend(this.objectName + '/' + this.state[this.objectNameLowerCase].id, this.objectNameDefinitive,
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
              if (commonFormComponents[item].stateMapping === 'multilingualText') {
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
              if (commonFormComponents[item].stateMapping === 'multilingualText') {
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

export default FormBuilder