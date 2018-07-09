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
  }

  componentDidMount () {
    getManagedDomainJsonFromBackend(this.props.helper.name_EN).then((result) => {
      // Should check here if we should build a new state or populate one with stored values (depending on if the user
      // has navigated through creating a new managed domain or fetching a stored one
      this.setState(buildNewState(this.props.helper.name_EN, result))
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
      [this.props.helper.name_EN.toLowerCase()]: {
        ...this.state[this.props.helper.name_EN.toLowerCase()],
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
      [this.props.helper.name_EN.toLowerCase()]: {
        ...this.state[this.props.helper.name_EN.toLowerCase()],
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
      [this.props.helper.name_EN.toLowerCase()]: {
        ...this.state[this.props.helper.name_EN.toLowerCase()],
        [name]: value
      }
    })
  }

  validateInputData = () => {
    const errors = {}

    this.state.required.forEach((element) => {
      if (this.props.helper.formConfig[element].hasOwnProperty('stateMapping')) {
        if (this.props.helper.formConfig[element].stateMapping === 'multilingualText') {
          if (!this.state[this.props.helper.name_EN.toLowerCase()][element][0].languageText) {
            errors[element] = 'Feltet kan ikke være tomt'
          }
        } else {
          if (!this.state[this.props.helper.name_EN.toLowerCase()][element]) {
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

      sendDataToBackend(this.props.helper.name_EN + '/' + this.state[this.props.helper.name_EN.toLowerCase()].id,
        this.props.helper.name_NO_definitive, this.state[this.props.helper.name_EN.toLowerCase()]).then((result) => {
        this.setState({
          response: result,
          waitingForResponse: false
        })
      })
    }
  }

  render () {
    const {helper} = this.props
    const {readOnlyMode, waitingForResponse, response, errors, form} = this.state

    return (
      <Form loading={typeof form === 'undefined' && typeof response === 'undefined'}>
        <Header as='h2' dividing content={helper.name_NO} />

        {typeof form !== 'undefined' ? editModeCheckbox(readOnlyMode, this.handleEditModeClick) : null}
        {errorMessages(errors, helper.name_NO_definitive)}
        {responseMessage(response)}

        {typeof form !== 'undefined' && Object.keys(form).map((item, index) => {
          let itemInNorwegian = translateToNorwegian[item]

          if (helper.formConfig.hasOwnProperty(item) && helper.formConfig[item].type !== 'autofilled') {
            if (helper.formConfig[item].type === 'textArea') {
              if (commonFormComponents[item].stateMapping === 'multilingualText') {
                return (
                  formFieldTextArea(index, item, itemInNorwegian, readOnlyMode, errors, this.handleInputChangeDeep,
                    this.state[helper.name_EN.toLowerCase()][item][0].languageText)
                )
              } else {
                return (
                  formFieldTextArea(index, item, itemInNorwegian, readOnlyMode, errors, this.handleInputChange,
                    this.state[helper.name_EN.toLowerCase()][item])
                )
              }
            }

            if (helper.formConfig[item].type === 'dropdownSingle') {
              return (
                formFieldDropdownSingle(index, item, itemInNorwegian, readOnlyMode, errors,
                  ((event, {value}) => this.handleDropdownChange(value, item)), helper.formConfig[item].values)
              )
            }

            if (helper.formConfig[item].type === 'text') {
              if (commonFormComponents[item].stateMapping === 'multilingualText') {
                return (
                  formFieldText(index, item, itemInNorwegian, readOnlyMode, errors, this.handleInputChangeDeep,
                    this.state[helper.name_EN.toLowerCase()][item][0].languageText)
                )
              } else {
                return (
                  formFieldText(index, item, itemInNorwegian, readOnlyMode, errors, this.handleInputChange,
                    this.state[helper.name_EN.toLowerCase()][item])
                )
              }
            }

            //TODO: Add more generic form components
          }
        })}

        {typeof form !== 'undefined' ? <Button primary disabled={readOnlyMode} loading={waitingForResponse} icon='save'
                                               content={helper.submitButtonText} onClick={this.saveToBackend} /> : null}
      </Form>
    )
  }
}

export default FormBuilder