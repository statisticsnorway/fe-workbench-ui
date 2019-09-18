import '@testing-library/jest-dom/extend-expect'
import LdsServiceMock from '../../services/LdsServiceMock'

describe('Test LDS service', () => {

  let service = new LdsServiceMock()

  test('It should return mock roles', async () => {
    let roles = await service.getRoles()
    expect(roles.length).toBe(7)
  })

  test('It should filter dataset by text', async () => {
    let result = await service.searchDatasets('person')
    expect(result.length).toBe(1)
    expect(result[0].title).toBe('PersonWithIncomeDataset')
  })

  test('It should search for dataset by text', async () => {
    let result = await service.searchDatasetsFullText({ text: 'income' })
    expect(result.datasets.length).toBe(1)
    expect(result.variables.length).toBe(1)
    expect(result.datasets[0].title).toBe('PersonWithIncomeDataset')
  })

  test('It should return no results for search', async () => {
    let result = await service.searchDatasetsFullText({ text: 'xxx' })
    expect(result.datasets.length).toBe(0)
    expect(result.variables.length).toBe(0)
  })

  test('It should get dataset structure', async () => {
    let result = await service.getDatasetStructure()
    expect(result.structure.instanceVariables.length).toBe(6)
    let attributes = result.structure.instanceVariables.filter(v => v.componentType === 'ATTRIBUTE')
    let identifiers = result.structure.instanceVariables.filter(v => v.componentType === 'IDENTIFIER')
    let measures = result.structure.instanceVariables.filter(v => v.componentType === 'MEASURE')
    expect(attributes.length).toBe(1)
    expect(attributes[0].name).toBe('DATA_QUALITY')
    expect(identifiers.length).toBe(1)
    expect(identifiers[0].name).toBe('PERSON_ID')
    expect(measures.length).toBe(4)
  })
})
