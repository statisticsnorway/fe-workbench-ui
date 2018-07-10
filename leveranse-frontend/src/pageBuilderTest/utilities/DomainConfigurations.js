import { formConfiguration } from './FormConfiguration'
import { tempUnitTypeOptions} from './FormData'

const variable = {
  name_EN: 'Variable',
  name_NO: 'Variabel',
  name_NO_definitive: 'Variabelen',
  formConfig: {
    unitType: {
      type: 'dropdownSingle',
      renderOrder: 3,
      values: tempUnitTypeOptions
    }
  }
}

const targetPopulation = {
  name_EN: 'Population',
  name_NO: 'Målpopulasjon',
  name_NO_definitive: 'Målpopulasjonen',
  formConfig: {
    populationType : {
      type: 'autofilled',
      value: 'targetPopulation'
    },
    referencePeriod : {
      type: 'text',
      renderOrder: 3,
    },
    geography : {
      type: 'text',
      renderOrder: 4,
    },
    unitType : {
      type: 'dropdownSingle',
      renderOrder: 5,
      values: tempUnitTypeOptions
    },

    // This one is bugged and not configured right in ssb-im
    respondantUnitType : {
      type: 'dropdownSingle',
      renderOrder: 6,
      values: tempUnitTypeOptions
    }
  }
}

Object.entries(formConfiguration).forEach(([key, value]) => {
  variable.formConfig[key] = value
  targetPopulation.formConfig[key] = value
})

export const domains = {
  variable,
  targetPopulation
}