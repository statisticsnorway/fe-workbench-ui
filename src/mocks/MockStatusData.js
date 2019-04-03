/*
This data would be retrieved from different sources (both GSIM-objects and metadata from other services) for each
dataResource and/or provisionAgreement or something else.
*/

const customData = {
  collection: {
    provider: 'Someone',
    unitsRecieved: 12,
    unitsRejected: 3,
    eventsRecieved: 43,
    inputDataEstablshed: true
  },
  statisticalProduction: {
    preparedDataEstablshed: false,
    statusAnalytics: 'terminated',
    unitsWithPotentialErrors: 143,
    correctedUnits: 1495
  }
}

const staticData = {
  collection: {
    period: 'Continous',
    status: 'Started'
  },
  statisticalProduction: {
    basisStatisticalUnit: 'Something',
    period: 'Weekly'
  }
}

export const mockStatusData = {
  personTaxStatistics: {
    customData: customData,
    staticData: staticData
  },
  businessTaxStatistics: {
    customData: customData,
    staticData: staticData
  },
  structuralBusinessStatistics: {
    customData: customData,
    staticData: staticData
  },
  accountsStatistics: {
    customData: customData,
    staticData: staticData
  },
  freg: {
    customData: customData,
    staticData: staticData
  },
  sirius: {
    customData: customData,
    staticData: staticData
  }
}
