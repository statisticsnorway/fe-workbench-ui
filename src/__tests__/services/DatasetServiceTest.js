import 'jest-dom/extend-expect'
import DatasetServiceMock from '../../services/DatasetServiceMock'

describe('Test DatasetService', () => {

  let service = DatasetServiceMock

  test('It should return dataset', async () => {
    let dataset = await service.getDataset('id', {page: 1, sort: null, order: null, limit: 10})
    expect(dataset.data.length).toBe(10)
    expect(dataset.totalCount).toBe(21)
  })

  test('It should sort dataset ascending', async () => {
    let dataset = await service.getDataset('id', {page: 1, sort: 'INCOME', order: 'asc', limit: 10})
    expect(dataset.data.length).toBe(10)
    expect(dataset.data[0]['INCOME']).toBe(436312)
  })

  test('It should sort dataset descending', async () => {
    let dataset = await service.getDataset('id', {page: 1, sort: 'INCOME', order: 'desc', limit: 10})
    expect(dataset.data.length).toBe(10)
    expect(dataset.data[0]['INCOME']).toBe(1419596)
  })

})
