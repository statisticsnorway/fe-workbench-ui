/*
If these are in fact the GSIM-object statisticalProgram (not dataResource) the way to get unitType would be this way:
  From StatisticalProgam --> UnitType:
    StatisticalProgramDesign
      BusinessCase []
        ChangeDefinition []
          Population []
            Universe []
              UnitType []

Note that there could also be multiple unitTypes, not just one, for each statisticalProgram
*/

export const mockDataResource = {
  personTaxStatistics: {
    name: {
      en: 'Person tax statistics',
      nb: 'Skattestatistikk person'
    },
    unitType: {
      en: 'Person',
      nb: 'Person'
    }
  },
  businessTaxStatistics: {
    name: {
      en: 'Business tax statistics',
      nb: 'Skattestatistikk næring'
    },
    unitType: {
      en: 'Business',
      nb: 'Foretak'
    }
  },
  structuralBusinessStatistics: {
    name: {
      en: 'Structural business statistics',
      nb: 'Strukturstatistikk'
    },
    unitType: {
      en: 'Business',
      nb: 'Foretak'
    }
  },
  accountsStatistics: {
    name: {
      en: 'Accounts statistics',
      nb: 'Regnskapsstatistikk'
    },
    unitType: {
      en: 'Business',
      nb: 'Foretak'
    }
  },
  freg: {
    name: {
      en: 'FREG',
      nb: 'FREG'
    },
    unitType: {
      en: 'Person',
      nb: 'Person'
    }
  },
  sirius: {
    name: {
      en: 'Sirius',
      nb: 'Sirius'
    },
    unitType: {
      en: 'Person',
      nb: 'Person'
    }
  }
}
