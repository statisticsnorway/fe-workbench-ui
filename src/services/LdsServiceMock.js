import Roles from '../__tests__/test-data/Roles'
import UnitDatasets from '../__tests__/test-data/AllDatasets'
import DatasetsFromVariable from '../__tests__/test-data/GetDatasetByVariable'
import RepresentedVariableById from '../__tests__/test-data/RepresentedVariableById'
import DatasetSearchResults from '../__tests__/test-data/DatasetSearchResults'
import { filterByText } from './graphql/QueryHelper'
import { mapSearchResult } from './graphql/SearchQuery'
import _ from 'lodash'
import dataset from '../__tests__/test-data/DatasetWithStructure'
import StatisticalProgram from '../__tests__/test-data/StatisticalPrograms'
import { mapResult } from './graphql/DatasetQuery'
import {
  mapDatasetsByVariableIdResult,
  mapVariableByIdResult
} from './graphql/AllDatasetsAndVariablesQuery'

function simpleMockSearch(result, value) {
  const re = new RegExp(_.escapeRegExp(value), 'i')
  const isMatch = obj => re.test(flattenTexts(obj.node.name)) || re.test(flattenTexts(obj.node.description))
  return {
    data: {
      Search: {
        edges: _.filter(result.data.Search.edges.filter(nonEmptyNode), isMatch)
      }
    }
  }
}

function flattenTexts(arr) {
  return arr.map(value => value.languageText).join(' ');
}

function nonEmptyNode(edge) {
    return edge.node.name;
}

class LdsServiceMock {

  // Note: cannot use arrow functions with jest.mock() or jest.spyOn()
  getRoles() {
    console.info('(MOCK) getting roles')
    return Promise.resolve(Roles)
  }

  getStatisticalPrograms() {
    console.info('(MOCK) getting statistical programs')
    return Promise.resolve(StatisticalProgram)
  }

  getDatasets() {
    console.info('(MOCK) Datasets')
    return Promise.resolve(UnitDatasets)
  }

  getDatasetsFromVariable() {
    console.info('Calling getDatasetsFromVariable() from LdsServiceMock')
    return Promise.resolve(mapDatasetsByVariableIdResult(DatasetsFromVariable))
  }

  getVariable() {
    console.info('Calling getVariable() from LdsServiceMock')
    return Promise.resolve(mapVariableByIdResult(RepresentedVariableById))
  }

  searchDatasets(value) {
    console.debug('Calling searchDatasets() from LdsServiceMock')
    return Promise.resolve(filterByText(UnitDatasets, value));
  }

  searchDatasetsFullText(query) {
    console.debug('Calling searchDatasetsFullText() from LdsServiceMock')
    return Promise.resolve(mapSearchResult(simpleMockSearch(DatasetSearchResults, query.text)));
  }

  getDatasetStructure() {
    console.debug('Calling getDatasetStructure() from LdsServiceMock')
    return Promise.resolve(mapResult(dataset));
  }

}

export default LdsServiceMock