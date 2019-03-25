import faker from 'faker'

import DyriSkogenData from './dyriskogen'
import DyriByenData from './dyribyen'

// TODO remove when search API is available
/*const datasets = _.times(10, () => ({
  title: 'Statistics for ' + faker.commerce.productMaterial()
    + ' in ' + faker.address.country(),
  description: faker.lorem.sentence(),
  created: faker.date.recent(),
  rows: faker.random.number({min: 1, max: 50000000}),
}))*/

export const datasets = [
  {
    title: 'Dyr i skogen',
    description: 'Har du noen gang lurt på hvor mange ugler det er i din lokale skog? Her får du svaret - og mer til',
    created: faker.date.recent(),
    rows: DyriSkogenData.length,
    data: DyriSkogenData,
    type: 'dataset'
  },
  {
    title: 'Dyr i byen',
    description: 'Har din bydel flest rotter? Les videre og finn ut!',
    created: faker.date.recent(),
    rows: DyriByenData.length,
    data: DyriByenData,
    type: 'dataset'
  },
  {
    title: 'Ekorn per elg',
    description: 'Antall ekorn per elg per skogholt',
    created: faker.date.recent(),
    rows: faker.random.number({min: 1, max: 50000000}),
    data: null,
    type: 'dataset'
  },
  {
    title: 'Rotter per måke',
    description: 'Antall rotter per måke fordelt på rundkjøringer og annet',
    created: faker.date.recent(),
    rows: faker.random.number({min: 1, max: 50000000}),
    data: null,
    type: 'dataset'
  }
]

export const variables = [
  {
    title: 'Periode',
    description: 'Periodevariabel',
    codelist: null,
    type: 'variable'
  },
  {
    title: 'Region',
    description: 'Regionsvariabel',
    codelist: 'http://data.ssb.no/api/klass/v1/classifications/131',
    type: 'variable'
  }
]
