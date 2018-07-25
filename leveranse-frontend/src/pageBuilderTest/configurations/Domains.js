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
    renderOrder: 5
  },
  respondantUnitType: {
    type: enums.TYPE.DROPDOWN_SINGLE,
    renderOrder: 6
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
    renderOrder: 4
  }
}

const tableHeaders = [enums.PROPERTY.NAME, enums.PROPERTY.DESCRIPTION]

export const formConfigurations = {
  variable: {
    unitType: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 3
    }
  },
  representedVariable: {
    variable: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 3
    },
    substantiveValueDomain: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 4
    }
  },
  instanceVariable: {
    representedVariable: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 3
    },
    population: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 4
    },
    sentinelValueDomain: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 5
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
      renderOrder: 4
    }
  },
  sentinelValueDomain: {
    ...valueDomain,
    valueDomain: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 4
    }
  },
  enumeratedValueDomain: {
    ...valueDomain,
    klassUrl: {
      type: enums.TYPE.KLASS_URL,
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
      renderOrder: 3
    },
    measureComponents: {
      type: enums.TYPE.DROPDOWN_MULTIPLE,
      renderOrder: 4
    },
    attributeComponents: {
      type: enums.TYPE.DROPDOWN_MULTIPLE,
      renderOrder: 5
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
      renderOrder: 4
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
      renderOrder: 9
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
      renderOrder: 3
    }
  },
  agentInRole: {
    role: {
      type: enums.TYPE.DROPDOWN_SINGLE,
      renderOrder: 3
    },
    agents: {
      type: enums.TYPE.DROPDOWN_MULTIPLE,
      renderOrder: 4
    }
  }
}

export const tableConfigurations = {
  unitType: {
    headers: tableHeaders.concat([enums.PROPERTY.ADMINISTRATIVE_STATUS, enums.PROPERTY.LAST_UPDATED_DATE])
  },
  enumeratedValueDomain: {
    headers: tableHeaders.concat([enums.PROPERTY.DATATYPE])
  },
  substantiveValueDomain: {
    headers: tableHeaders.concat([enums.PROPERTY.DATATYPE])
  },
  sentinelValueDomain: {
    headers: tableHeaders.concat([enums.PROPERTY.DATATYPE])
  },
  describedValueDomain: {
    headers: tableHeaders.concat([enums.PROPERTY.DATATYPE])
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