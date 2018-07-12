import { lowerCaseFirst } from '../utilities/Helpers'
import * as moment from 'moment'
import 'moment/min/locales'

moment.locale('nb')
const uuidv1 = require('uuid/v1')

export const buildNewState = (name, formConfig, user, object) => {
  let state = {}
  let component = {}
  let form = object.definitions[name].properties
  let sortedForm = {}

  component['administrativeDetails'] = [{
    administrativeDetailType: '',
    values: []
  }]
  component['administrativeStatus'] = ''
  component['createdBy'] = user
  component['createdDate'] = moment()
  component['id'] = uuidv1()
  component['lastUpdatedBy'] = ''
  component['lastUpdatedDate'] = null
  component['validFrom'] = null
  component['validUntil'] = null
  component['version'] = '1.0'
  component['versionRationale'] = [{
    languageCode: 'nb',
    languageText: ''
  }]
  component['versionValidFrom'] = moment()

  Object.entries(form).forEach(([key, value]) => {
    if (typeof formConfig[key] !== 'undefined') {
      if (formConfig[key].type === 'autofilled') {
        if (formConfig[key].hasOwnProperty('value')) {
          component[key] = formConfig[key].value
        }
      } else {
        if (value.type === 'string') {
          if (value.hasOwnProperty('format') && value.format === 'date-time') {
            component[key] = null
          } else {
            component[key] = ''
          }
        }

        if (value.type === 'array') {
          if (value.items.hasOwnProperty('$ref')) {
            if (value.items['$ref'] === '#/definitions/MultilingualText') {
              component[key] = [{
                languageCode: 'nb',
                languageText: ''
              }]
            }
          } else {
            component[key] = []
          }
        }

        if (value.type === 'boolean') {
          component[key] = ''
        }

        //TODO: Add more checks when LDM-Team is further along
      }
    }
  })

  Object.entries(formConfig).forEach(([key, value]) => {
    if (value.hasOwnProperty('renderOrder')) {
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
  state['required'] = object.definitions[name].required
  state['form'] = sortedForm
  state['readOnlyMode'] = false
  state['response'] = {}
  state['errors'] = {}
  state['waitingForResponse'] = false

  return state
}

export const populateState = () => {
  // This is for when fetching a stored object and filling the state with its values
}


