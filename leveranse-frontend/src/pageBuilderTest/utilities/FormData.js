const uuidv1 = require('uuid/v1')

export const tempUnitTypeOptions = [
  {key: '1', text: 'Person', value: '/UnitType/' + uuidv1()},
  {key: '2', text: 'Husholdning', value: '/UnitType/' + uuidv1()},
  {key: '3', text: 'Virksomhet', value: '/UnitType/' + uuidv1()}
]

//TODO: Fetch the data from KLASS and other places