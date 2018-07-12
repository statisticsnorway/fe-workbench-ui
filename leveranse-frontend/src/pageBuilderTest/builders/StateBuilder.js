import { lowerCaseFirst } from '../utilities/Helpers'

export const buildNewState = (name, formConfig, user, object) => {
  let state = {}
  let component = {}
  let form = object.definitions[name].properties
  let sortedForm = {}

  Object.entries(form).forEach(([key, value]) => {
    if (key === 'createdBy') {
      component[key] = user
    } else {
      if (typeof formConfig[key] !== 'undefined' && formConfig[key].type === 'autofilled' && formConfig[key].hasOwnProperty('value')) {
        component[key] = formConfig[key].value
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

            if (value.items['$ref'] === '#/definitions/AdministrativeDetails') {
              component[key] = [{
                administrativeDetailType: '',
                values: []
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

  const uuidv1 = require('uuid/v1')
  component['id'] = uuidv1()

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


