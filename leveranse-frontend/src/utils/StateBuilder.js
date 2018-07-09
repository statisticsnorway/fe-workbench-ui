import moment from 'moment'

export const buildNewState = (name, object) => {
  let state = {}
  let component = {}

  Object.entries(object.definitions).forEach(([key, value]) => {
    if (typeof value === 'object' && key === name) {
      state['form'] = value.properties
      state['required'] = value.required

      Object.entries(value.properties).forEach(([key, value]) => {
        if (value.type === 'string') {
          if (typeof value.format !== 'undefined' && value.format === 'date-time') {
            component[key] = moment().toJSON()
          } else {
            component[key] = ''
          }
        } else if (typeof value.type !== 'undefined' && value.type === 'array') {
          if (typeof value.items !== 'undefined' && value.items['$ref'] === '#/definitions/MultilingualText') {
            component[key] = [{
              languageCode: 'nb',
              languageText: ''
            }]
          } else if (typeof value.items !== 'undefined' && value.items['$ref'] === '#/definitions/AdministrativeDetails') {
            component[key] = [{
              administrativeDetailType: '',
              values: []
            }]
          } else {
            component[key] = []
          }
        }
        //TODO: Add more checks when LDM-Team is further along
      })
    }
  })

  const uuidv1 = require('uuid/v1')
  component['id'] = uuidv1()

  state[name.toLowerCase()] = component
  state['readOnlyMode'] = false
  state['response'] = {}
  state['errors'] = {}
  state['waitingForResponse'] = false

  return state
}

export const populateState = (name, object) => {
  // This is for when fetching a stored object and filling the state with its values
}


