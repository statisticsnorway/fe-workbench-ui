import '@testing-library/jest-dom/extend-expect'
import datasets from '../../test-data/AllDatasets'
import datasetsAndVariables from '../../test-data/AllDatasetsAndVariables'
import { filterByText } from '../../../services/graphql/QueryHelper'

describe('Test QueryHelper', () => {

  test('It should find dataset by text', () => {
    let result = filterByText(datasets, "person")
    expect(result.length).toBe(1)
    expect(result[0]['type']).toBe('UnitDataSet')
    expect(result[0]['id']).toBe('b9c10b86-5867-4270-b56e-ee7439fe381e')

    result = filterByText(datasets, "families")
    expect(result.length).toBe(1)
    expect(result[0]['id']).toBe('d7f1a566-b906-4561-92cb-4758b766335c')
  })

  test('It should find datasets and variables by text', () => {
    let result = filterByText(datasetsAndVariables, "person")
    let datasets = result.filter(entry => entry.type !== 'RepresentedVariable')
    let variables = result.filter(entry => entry.type === 'RepresentedVariable')
    expect(datasets.length).toBe(1)
    expect(datasets[0]['id']).toBe('b9c10b86-5867-4270-b56e-ee7439fe381e')
    expect(variables.length).toBe(5)

    result = filterByText(datasetsAndVariables, "marital")
    datasets = result.filter(entry => entry.type !== 'RepresentedVariable')
    variables = result.filter(entry => entry.type === 'RepresentedVariable')
    expect(datasets.length).toBe(0)
    expect(variables.length).toBe(1)
    expect(variables[0]['id']).toBe('e46ede82-cc41-441c-bd77-f1925afbd342')
    expect(variables[0]['variable']['id']).toBe('f680664f-1eb0-47b5-970b-c21d81537581')
  })

})
