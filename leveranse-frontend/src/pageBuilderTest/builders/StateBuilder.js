import { lowerCaseFirst } from '../utilities/Helpers'
import { enums } from '../utilities/Enums'
import * as moment from 'moment'
import 'moment/min/locales'
import { getDomainData } from '../utilities/DataExchange'

moment.locale(enums.LANGUAGE_CODE.NORWEGIAN)

const uuidv1 = require('uuid/v1')

export const buildDomainState = (name, formConfig, user, object, id) => {
  return new Promise((resolve) => {
    let state = {}
    let component = {}
    let form = object.definitions[name].properties
    let sortedForm = {}

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

    state[enums.STATE.REQUIRED] = object.definitions[name].required
    state[enums.STATE.FORM] = sortedForm
    state[enums.STATE.ERRORS] = {}
    state[enums.STATE.WAITING_FOR_RESPONSE] = false

    if (id === 'new') {
      component[enums.PROPERTY.ADMINISTRATIVE_DETAILS] = [{
        [enums.PROPERTY.ADMINISTRATIVE_DETAIL_TYPE]: '',
        [enums.PROPERTY.VALUES]: []
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
        [enums.PROPERTY.LANGUAGE_CODE]: enums.LANGUAGE_CODE.NORWEGIAN,
        [enums.PROPERTY.LANGUAGE_TEXT]: ''
      }]
      component[enums.PROPERTY.VERSION_VALID_FROM] = null

      Object.entries(form).forEach(([key, value]) => {
        if (typeof formConfig[key] !== 'undefined') {
          if (formConfig[key].type === enums.TYPE.AUTOFILLED) {
            if (formConfig[key].hasOwnProperty(enums.PROPERTY.VALUE)) {
              component[key] = formConfig[key].value
            }
          } else {
            switch (value.type) {
              case enums.TYPE.STRING:
                component[key] = ''
                break

              case (enums.TYPE.ARRAY):
                if (value.items.hasOwnProperty(enums.PROPERTY.REF)) {
                  if (value.items[enums.PROPERTY.REF] === enums.REFERENCE.MULTILINGUAL_TEXT) {
                    component[key] = [{
                      [enums.PROPERTY.LANGUAGE_CODE]: enums.LANGUAGE_CODE.NORWEGIAN,
                      [enums.PROPERTY.LANGUAGE_TEXT]: ''
                    }]
                  }
                } else {
                  component[key] = []
                }
                break

              case (enums.TYPE.BOOLEAN):
                component[key] = false
                break

              case (enums.TYPE.NUMBER):
                component[key] = ''
                break

              //TODO: Add more checks

              default:
            }
          }
        }
      })

      state[lowerCaseFirst(name)] = component
      state[enums.STATE.RESPONSE] = {}
      state[enums.STATE.READ_ONLY_MODE] = false

      resolve(state)
    } else {
      getDomainData(name, enums.URL_AFFIX.ID, id).then((result) => {
        Object.entries(result).forEach(([key, value]) => {
          component[key] = value
        })

        state[lowerCaseFirst(name)] = component
        state[enums.STATE.RESPONSE] = {}
        state[enums.STATE.READ_ONLY_MODE] = true

        resolve(state)
      }).catch((reason) => {
        state[enums.STATE.RESPONSE] = reason

        resolve(state)
      })
    }
  })
}
