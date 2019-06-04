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
    id: '3a44047a-d760-42c3-9f8a-d5e544042908',
    customData: customData,
    staticData: staticData
  },
  businessTaxStatistics: {
    id: '5e508083-49e6-4cae-a144-e4b575f9ac19',
    customData: customData,
    staticData: staticData
  },
  structuralBusinessStatistics: {
    id: '3a44047a-d760-42c3-9f8a-d5e5440429aa',
    customData: customData,
    staticData: staticData
  }
}
