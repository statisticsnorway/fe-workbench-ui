import Roles from '../__tests__/test-data/Roles'
import UnitDatasets from '../__tests__/test-data/AllDatasets'
import DatasetSearchResults from '../__tests__/test-data/DatasetSearchResults'
import { filterByText } from './graphql/AllDatasetsQuery'
import { mapSearchResult } from './graphql/SearchQuery'
import _ from 'lodash'
import dataset from '../__tests__/test-data/DatasetWithStructure'
import DataResources from '../__tests__/test-data/DataResources'
import { mapResult } from './graphql/DatasetQuery'

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

  getDataResources() {
    console.info('(MOCK) DataResources')
    return Promise.resolve(DataResources)
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
    return Promise.resolve(mapResult(dataset));
  }

}

export default LdsServiceMock