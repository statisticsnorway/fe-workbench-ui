import Roles from '../__tests__/test-data/Roles'
import UnitDatasets from '../__tests__/test-data/AllDatasets'
import DatasetSearchResults from '../__tests__/test-data/DatasetSearchResults'
import { filterByText } from './graphql/AllDatasetsQuery'
import { mapSearchResult } from './graphql/SearchQuery'
import _ from 'lodash'
import dataset from '../__tests__/test-data/DatasetWithStructure'
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

  static getRoles = () => {
    console.debug('Calling getRoles() from LdsServiceMock')
    return Promise.resolve(Roles)
  }
  static searchDatasets = (value) => {
    console.debug('Calling searchDatasets() from LdsServiceMock')
    return Promise.resolve(filterByText(UnitDatasets, value));
  }

  static searchDatasetsFullText = (query) => {
    console.debug('Calling searchDatasetsFullText() from LdsServiceMock')
    return Promise.resolve(mapSearchResult(simpleMockSearch(DatasetSearchResults, query.text)));
  }

  static getDatasetStructure = (id) => {
    return Promise.resolve(mapResult(dataset));
  }
}

export default LdsServiceMock