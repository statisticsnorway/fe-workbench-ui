//TODO: Clean this up when LDM-Team is further along

export const commonFormComponents = {
  name: {
    type: 'text',
    stateMapping: 'multilingualText',
    renderOrder: 3
  },
  description: {
    type: 'textArea',
    stateMapping: 'multilingualText',
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