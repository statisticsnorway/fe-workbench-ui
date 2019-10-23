/*
This data would be retrieved from different sources (both GSIM-objects and metadata from other services) for each
statisticalProgram and/or provisionAgreement or something else.
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
    id: '2627fd32-5913-4fa4-8236-8648a8acddc8',
    customData: customData,
    staticData: staticData
  },
  businessTaxStatistics: {
    id: '99ce8940-400e-475f-90a2-204eca77886a',
    customData: customData,
    staticData: staticData
  }
}
