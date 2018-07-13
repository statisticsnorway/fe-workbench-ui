import {
  tempAttributeComponentOptions,
  tempExchangeChannelOptions,
  tempIdentifierComponentOptions,
  tempMeasureComponentOptions,
  tempPopulationOptions,
  tempProtocolOptions,
  tempRepresentedVariableOptions,
  tempSentinelValueDomainOptions,
  tempSubstantiveValueDomainOptions,
  tempUnitTypeOptions,
  tempVariableOptions
} from '../utilities/FormData'

const population = {
  populationType: {
    type: 'autofilled',
    value: ''
  },
  referencePeriod: {
    type: 'text',
    renderOrder: 3
  },
  geography: {
    type: 'text',
    renderOrder: 4
  },
  unitType: {
    type: 'dropdownSingle',
    renderOrder: 5,
    values: tempUnitTypeOptions
  },
  respondantUnitType: {
    type: 'dropdownSingle',
    renderOrder: 6,
    values: tempUnitTypeOptions
  }
}

const component = {
  format: {
    type: 'text',
    renderOrder: 3
  },
  representedVariable: {
    type: 'dropdownSingle',
    renderOrder: 4,
    values: tempRepresentedVariableOptions
  }
}

export const formConfigurations = {
  variable: {
    unitType: {
      type: 'dropdownSingle',
      renderOrder: 3,
      values: tempUnitTypeOptions
    }
  },
  representedVariable: {
    variable: {
      type: 'dropdownSingle',
      renderOrder: 3,
      values: tempVariableOptions
    },
    substantiveValueDomain: {
      type: 'dropdownSingle',
      values: tempSubstantiveValueDomainOptions
    }
  },
  instanceVariable: {
    representedVariable: {
      type: 'dropdownSingle',
      renderOrder: 3,
      values: tempRepresentedVariableOptions
    },
    population: {
      type: 'dropdownSingle',
      renderOrder: 4,
      values: tempPopulationOptions
    },
    sentinelValueDomain: {
      type: 'dropdownSingle',
      renderOrder: 5,
      values: tempSentinelValueDomainOptions
    }
  },
  surveyPopulation: {
    ...population,
    populationType: {
      ...population.populationType,
      value: 'surveyPopulation'
    }
  },
  targetPopulation: {
    ...population,
    populationType: {
      ...population.populationType,
      value: 'targetPopulation'
    }
  },
  role: {},
  agent: {
    agentType: {
      type: 'text',
      renderOrder: 3
    },
    parentAgent: {
      type: 'text',
      renderOrder: 4
    }
  },
  unitDataStructure: {
    identifierComponents: {
      type: 'dropdownMultiple',
      renderOrder: 3,
      values: tempIdentifierComponentOptions
    },
    measureComponents: {
      type: 'dropdownMultiple',
      renderOrder: 4,
      values: tempMeasureComponentOptions
    },
    attributeComponents: {
      type: 'dropdownMultiple',
      renderOrder: 5,
      values: tempAttributeComponentOptions
    },
    temporalityType: {
      type: 'text',
      renderOrder: 6
    },
    planDate: {
      type: 'date-time',
      renderOrder: 7
    }
  },
  protocol: {
    protocolType: {
      type: 'text',
      renderOrder: 3
    }
  },
  measureComponent: {
    ...component
  },
  identifierComponent: {
    ...component,
    role: {
      type: 'text',
      renderOrder: 5
    },
    isUnique: {
      type: 'boolean',
      renderOrder: 6
    },
    isComposite: {
      type: 'boolean',
      renderOrder: 7
    }
  },
  attributeComponent: {
    ...component,
    assignmentStatus: {
      type: 'text',
      renderOrder: 5
    },
    attachmentLevel: {
      type: 'text',
      renderOrder: 6
    }
  },
  exchangeChannel: {
    exchangeType: {
      type: 'text',
      renderOrder: 3
    },
    protocol: {
      type: 'dropdownSingle',
      renderOrder: 4,
      values: tempProtocolOptions
    }
  },
  provisionAgreement: {
    informationProvider: {
      type: 'search',
      renderOrder: 3,
      values: ''
    },
    regulation: {
      type: 'text',
      renderOrder: 4
    },
    status: {
      type: 'text',
      renderOrder: 5
    },
    valuation: {
      type: 'text',
      renderOrder: 6
    },
    changeManagement: {
      type: 'textArea',
      renderOrder: 7
    },
    informationSource: {
      type: 'text',
      renderOrder: 8
    },
    exchangeChannel: {
      type: 'dropdownSingle',
      renderOrder: 9,
      values: tempExchangeChannelOptions
    },
    frequency: {
      type: 'text',
      renderOrder: 10
    }
  }
}

export const commonFormConfigurations = {
  name: {
    type: 'text',
    renderOrder: 1
  },
  description: {
    type: 'textArea',
    renderOrder: 2
  },
  administrativeDetails: {
    type: 'autofilled'
  },
  administrativeStatus: {
    type: 'autofilled'
  },
  id: {
    type: 'autofilled'
  },
  createdDate: {
    type: 'autofilled'
  },
  createdBy: {
    type: 'autofilled'
  },
  version: {
    type: 'autofilled'
  },
  versionValidFrom: {
    type: 'autofilled'
  },
  versionRationale: {
    type: 'autofilled'
  },
  lastUpdatedDate: {
    type: 'autofilled'
  },
  lastUpdatedBy: {
    type: 'autofilled'
  },
  validFrom: {
    type: 'autofilled'
  },
  validUntil: {
    type: 'autofilled'
  }
}
