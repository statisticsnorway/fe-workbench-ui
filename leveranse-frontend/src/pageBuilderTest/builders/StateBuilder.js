import { lowerCaseFirst } from '../utilities/Helpers'
import { enums } from '../utilities/Enums'
import * as moment from 'moment'
import 'moment/min/locales'

moment.locale(enums.LANGUAGE_CODE.NORWEGIAN)
const uuidv1 = require('uuid/v1')

export const buildNewState = (name, formConfig, user, object) => {
  let state = {}
  let component = {}
  let form = object.definitions[name].properties
  let sortedForm = {}

  component[enums.PROPERTY.ADMINISTRATIVE_DETAILS] = [{
    administrativeDetailType: '',
    values: []
  }]
  component[enums.PROPERTY.ADMINISTRATIVE_STATUS] = ''
  component[enums.PROPERTY.CREATED_BY] = user
  component[enums.PROPERTY.CREATED_DATE] = moment()
  component[enums.PROPERTY.ID] = uuidv1()
  component[enums.PROPERTY.LAST_UPDATED_BY] = ''
  component[enums.PROPERTY.LAST_UPDATED_DATE] = null
  component[enums.PROPERTY.VALID_FROM] = null
  component[enums.PROPERTY.VALID_UNTIL] = null
  component[enums.PROPERTY.VERSION] = '0.9'
  component[enums.PROPERTY.VERSION_RATIONALE] = [{
    languageCode: enums.LANGUAGE_CODE.NORWEGIAN,
    languageText: ''
  }]
  component[enums.PROPERTY.VERSION_VALID_FROM] = null

  Object.entries(form).forEach(([key, value]) => {
    if (typeof formConfig[key] !== 'undefined') {
      if (formConfig[key].type === enums.TYPE.AUTOFILLED) {
        if (formConfig[key].hasOwnProperty(enums.PROPERTY.VALUE)) {
          component[key] = formConfig[key].value
        }
      } else {
        if (value.type === enums.TYPE.STRING) {
          if (value.hasOwnProperty(enums.PROPERTY.FORMAT) && value.format === enums.TYPE.DATE) {
            component[key] = null
          } else {
            component[key] = ''
          }
        }

        if (value.type === enums.TYPE.ARRAY) {
          if (value.items.hasOwnProperty(enums.PROPERTY.REF)) {
            if (value.items[enums.PROPERTY.REF] === enums.REFERENCE.MULTILINGUAL_TEXT) {
              component[key] = [{
                languageCode: enums.LANGUAGE_CODE.NORWEGIAN,
                languageText: ''
              }]
            }
          } else {
            component[key] = []
          }
        }

        if (value.type === enums.TYPE.BOOLEAN) {
          component[key] = ''
        }

        //TODO: Add more checks when LDM-Team is further along
      }
    }
  })

  Object.entries(formConfig).forEach(([key, value]) => {
    if (value.hasOwnProperty(enums.PROPERTY.RENDER_ORDER)) {
      form[key].renderOrder = value.renderOrder
    } else {
      form[key].renderOrder = 100
    }
  })

  Object.keys(form).map((data) => {
    return [data, form[data]]
  }).sort((a, b) => a[1].renderOrder - b[1].renderOrder).forEach((object) => {
    sortedForm = {
      ...sortedForm,
      [object[0]]: object[1]
    }
  })

  state[lowerCaseFirst(name)] = component
  state[enums.STATE.REQUIRED] = object.definitions[name].required
  state[enums.STATE.FORM] = sortedForm
  state[enums.STATE.READ_ONLY_MODE] = false
  state[enums.STATE.RESPONSE] = {}
  state[enums.STATE.ERRORS] = {}
  state[enums.STATE.WAITING_FOR_RESPONSE] = false

  return state
}

export const populateState = () => {
  // This is for when fetching a stored object and filling the state with its values
}


