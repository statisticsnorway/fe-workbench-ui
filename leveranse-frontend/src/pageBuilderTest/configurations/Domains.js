import {
  tempAgentInRolesOptions, tempAgentOptions,
  tempAttributeComponentOptions,
  tempExchangeChannelOptions,
  tempIdentifierComponentOptions,
  tempMeasureComponentOptions,
  tempPopulationOptions,
  tempProtocolOptions,
  tempRepresentedVariableOptions, tempRoleOptions,
  tempSentinelValueDomainOptions,
  tempSubstantiveValueDomainOptions,
  tempUnitTypeOptions, tempValueDomainOptions,
  tempVariableOptions
} from '../utilities/FormData'
import { enums } from '../utilities/Enums'

const population = {
  populationType: {
    type: enums.TYPE.AUTOFILLED,
    value: ''
  },
  referencePeriod: {
    type: enums.TYPE.TEXT,
    renderOrder: 3
  },
  geography: {
    type: enums.TYPE.TEXT,
    renderOrder: 4
  },
  unitType: {
    type: enums.TYPE.DROPDOWN_SINGLE,
    renderOrder: 5,
    values: tempUnitTypeOptions
  },
  respondantUnitType: {
    type: enums.TYPE.DROPDOWN_SINGLE,
    renderOrder: 6,
    values: tempUnitTypeOptions
  }
}

const valueDomain = {
  dataType: {
    type: enums.TYPE.TEXT,
    renderOrder: 3
  }
}

const component = {
  format: {
    type: enums.TYPE.TEXT,
    renderOrder: 3
  },
  representedVariable: {
    type: enums.TYPE.DROPDOWN_SINGLE,
    renderOrder: 4,
    values: tempRepresentedVariableOptions
  }
}

export const formConfigurations = {
  variable: {
    unitType: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 3,
      values: tempUnitTypeOptions
    }
  },
  representedVariable: {
    variable: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 3,
      values: tempVariableOptions
    },
    substantiveValueDomain: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      values: tempSubstantiveValueDomainOptions
    }
  },
  instanceVariable: {
    representedVariable: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 3,
      values: tempRepresentedVariableOptions
    },
    population: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 4,
      values: tempPopulationOptions
    },
    sentinelValueDomain: {
      type: enums.TYPE.DROPDOWN_SINGLE,
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
  describedValueDomain: {
    ...valueDomain,
    unitOfMeasure: {
      type: enums.TYPE.TEXT,
      renderOrder: 4
    },
    minValue: {
      type: enums.TYPE.NUMBER,
      renderOrder: 5
    },
    maxValue: {
      type: enums.TYPE.NUMBER,
      renderOrder: 6
    },
    minLength: {
      type: enums.TYPE.NUMBER,
      renderOrder: 7
    },
    maxLength: {
      type: enums.TYPE.NUMBER,
      renderOrder: 8
    },
    minDecimals: {
      type: enums.TYPE.NUMBER,
      renderOrder: 9
    },
    maxDecimals: {
      type: enums.TYPE.NUMBER,
      renderOrder: 10
    },
    optional: {
      type: enums.TYPE.BOOLEAN,
      renderOrder: 11
    }
  },
  substantiveValueDomain: {
    ...valueDomain,
    valueDomain: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 4,
      values: tempValueDomainOptions
    }
  },
  sentinelValueDomain: {
    ...valueDomain,
    valueDomain: {
     type: enums.TYPE.DROPDOWN_SINGLE,
     renderOrder: 4,
     values: tempValueDomainOptions
    }
  },
  enumeratedValueDomain: {
    ...valueDomain,
    klassUrl: {
      type: enums.TYPE.TEXT,
      renderOrder: 4
    }
  },
  role: {},
  agent: {
    agentType: {
      type: enums.TYPE.TEXT,
      renderOrder: 3
    },
    parentAgent: {
      type: enums.TYPE.TEXT,
      renderOrder: 4
    }
  },
  unitDataStructure: {
    identifierComponents: {
      type: enums.TYPE.DROPDOWN_MULTIPLE,
      renderOrder: 3,
      values: tempIdentifierComponentOptions
    },
    measureComponents: {
      type: enums.TYPE.DROPDOWN_MULTIPLE,
      renderOrder: 4,
      values: tempMeasureComponentOptions
    },
    attributeComponents: {
      type: enums.TYPE.DROPDOWN_MULTIPLE,
      renderOrder: 5,
      values: tempAttributeComponentOptions
    },
    temporalityType: {
      type: enums.TYPE.TEXT,
      renderOrder: 6
    },
    planDate: {
      type: enums.TYPE.DATE,
      renderOrder: 7
    }
  },
  protocol: {
    protocolType: {
      type: enums.TYPE.TEXT,
      renderOrder: 3
    }
  },
  measureComponent: {
    ...component
  },
  identifierComponent: {
    ...component,
    role: {
      type: enums.TYPE.TEXT,
      renderOrder: 5
    },
    isUnique: {
      type: enums.TYPE.BOOLEAN,
      renderOrder: 6
    },
    isComposite: {
      type: enums.TYPE.BOOLEAN,
      renderOrder: 7
    }
  },
  attributeComponent: {
    ...component,
    assignmentStatus: {
      type: enums.TYPE.TEXT,
      renderOrder: 5
    },
    attachmentLevel: {
      type: enums.TYPE.TEXT,
      renderOrder: 6
    }
  },
  exchangeChannel: {
    exchangeType: {
      type: enums.TYPE.TEXT,
      renderOrder: 3
    },
    protocol: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 4,
      values: tempProtocolOptions
    }
  },
  provisionAgreement: {
    informationProvider: {
      type: enums.TYPE.SEARCH,
      renderOrder: 3,
      values: ''
    },
    regulation: {
      type: enums.TYPE.TEXT,
      renderOrder: 4
    },
    status: {
      type: enums.TYPE.TEXT,
      renderOrder: 5
    },
    valuation: {
      type: enums.TYPE.TEXT,
      renderOrder: 6
    },
    changeManagement: {
      type: enums.TYPE.TEXT_AREA,
      renderOrder: 7
    },
    informationSource: {
      type: enums.TYPE.TEXT,
      renderOrder: 8
    },
    exchangeChannel: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 9,
      values: tempExchangeChannelOptions
    },
    frequency: {
      type: enums.TYPE.TEXT,
      renderOrder: 10
    }
  },
  unitType: {},
  informationProvider: {
    agentInRoles: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 3,
      values: tempAgentInRolesOptions
    }
  },
  agentInRole: {
    role: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 3,
      values: tempRoleOptions
    },
    agents: {
      type: enums.TYPE.DROPDOWN_MULTIPLE,
      renderOrder: 4,
      values: tempAgentOptions
    }
  }
}

export const commonFormConfigurations = {
  name: {
    type: enums.TYPE.TEXT,
    renderOrder: 1
  },
  description: {
    type: enums.TYPE.TEXT_AREA,
    renderOrder: 2
  },
  administrativeDetails: {
    type: enums.TYPE.AUTOFILLED
  },
  administrativeStatus: {
    type: enums.TYPE.AUTOFILLED
  },
  id: {
    type: enums.TYPE.AUTOFILLED
  },
  createdDate: {
    type: enums.TYPE.AUTOFILLED
  },
  createdBy: {
    type: enums.TYPE.AUTOFILLED
  },
  version: {
    type: enums.TYPE.AUTOFILLED
  },
  versionValidFrom: {
    type: enums.TYPE.AUTOFILLED
  },
  versionRationale: {
    type: enums.TYPE.AUTOFILLED
  },
  lastUpdatedDate: {
    type: enums.TYPE.AUTOFILLED
  },
  lastUpdatedBy: {
    type: enums.TYPE.AUTOFILLED
  },
  validFrom: {
    type: enums.TYPE.AUTOFILLED
  },
  validUntil: {
    type: enums.TYPE.AUTOFILLED
  }
}
