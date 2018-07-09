import React from 'react'
import FormBuilder from '../../utils/FormBuilder'
import { commonFormComponents } from '../../utils/CommonFormComponents'

const uuidv1 = require('uuid/v1')

const tempUnitTypeOptions = [
  {key: '1', text: 'Person', value: '/UnitType/' + uuidv1()},
  {key: '2', text: 'Husholdning', value: '/UnitType/' + uuidv1()},
  {key: '3', text: 'Virksomhet', value: '/UnitType/' + uuidv1()}
]

const objectInfo = {
  name_EN: 'Variable',
  name_NO: 'Variabel',
  name_NO_definitive: 'Variabelen',
  submitButtonText: 'Lagre variabel',
  formConfig: {
    unitType: {
      type: 'dropdownSingle',
      stateMapping: '',
      values: tempUnitTypeOptions
    }
  }
}

Object.entries(commonFormComponents).forEach(([key, value]) => {
  objectInfo.formConfig[key] = value
})

class GenericVariableTest extends React.Component {
  render () {
    return (
      <FormBuilder helper={objectInfo} />
    )
  }
}

export default GenericVariableTest