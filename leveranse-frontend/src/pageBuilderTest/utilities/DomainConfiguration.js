import { translateToNorwegian } from './Translation'
import { commonFormConfigurations, formConfigurations } from '../configurations/Domains'
import { findLastUppercaseWord, makeNorwegianWordDefinitive, upperCaseFirst } from './Helpers'

function buildDomainConfiguration (name, nameInNorwegian, formConfig) {
  let nameDefinitive = makeNorwegianWordDefinitive(nameInNorwegian)

  return {
    name: name,
    nameInNorwegian: nameInNorwegian,
    nameDefinitive: nameDefinitive,
    formConfig: formConfig
  }
}

const configurations = {}

Object.entries(formConfigurations).forEach(([key, value]) => {
  let domainKey = key
  let name

  if (findLastUppercaseWord(key) === 'Population') {
    name = findLastUppercaseWord(upperCaseFirst(key))
  } else {
    name = upperCaseFirst(key)
  }

  configurations[key] = buildDomainConfiguration(name, translateToNorwegian[key], value)

  Object.entries(commonFormConfigurations).forEach(([key, value]) => {
    configurations[domainKey].formConfig[key] = value
  })
})

export const domains = configurations
