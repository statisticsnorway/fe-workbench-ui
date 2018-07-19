import { tableConfigurations } from '../configurations/Domains'
import { findLastUppercaseWord, makeNorwegianWordDefinitive, makeNorwegianWordPlural, upperCaseFirst } from './Helpers'
import { translateToNorwegian } from './Translation'

function buildTableConfiguration (name, nameInNorwegian, tableConfig) {
  let nameDefinitive = makeNorwegianWordDefinitive(nameInNorwegian)
  let namePlural = makeNorwegianWordPlural(nameInNorwegian)

  return {
    name: name,
    nameInNorwegian: nameInNorwegian,
    namePlural: namePlural,
    nameDefinitive: nameDefinitive,
    tableConfig: tableConfig
  }
}

const configurations = {}

Object.entries(tableConfigurations).forEach(([key, value]) => {
  let name

  if (findLastUppercaseWord(key) === 'Population') {
    name = findLastUppercaseWord(upperCaseFirst(key))
  } else {
    name = upperCaseFirst(key)
  }

  let headers = []

  value.headers.forEach((element) => {
    headers.push({name: translateToNorwegian[element], accessor: element})
  })

  let tableConfig = {
    headers: headers
  }

  configurations[key] = buildTableConfiguration(name, translateToNorwegian[key], tableConfig)
})

export const tables = configurations