import { get } from '../utilities/fetch/Fetch'
import { FULL_TEXT_SEARCH, GET_QUERY_FIELDS, hasSearchQueryField, mapSearchResult } from './graphql/SearchQuery'
import { ALL_DATASETS } from './graphql/AllDatasetsQuery'
import {
  ALL_DATASETS_AND_VARIABLES,
  GET_DATASETS_FROM_VARIABLE, GET_VARIABLE,
  mapDatasetsByVariableIdResult, mapVariableByIdResult
} from './graphql/AllDatasetsAndVariablesQuery'
import introspectionQueryResultData from './graphql/fragmentTypes.json'
import { DATASET_WITH_STRUCTURE, mapResult } from './graphql/DatasetQuery'
import { filterByText } from './graphql/QueryHelper'
import Properties from '../properties/properties'

// see https://github.com/apollographql/apollo-client/issues/4843
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost'

// Some queries contain union or interface types, so Apollo Client's simple (heuristic) fragment matcher can not
// be used. See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData })
const cache = new InMemoryCache({ fragmentMatcher })
const client = new ApolloClient({
  uri: Properties.api.lds + '/graphql',
  cache: cache
})

const hasSearchSupport = () => {
  return new Promise(resolve => {
    client.query({
      query: GET_QUERY_FIELDS
    }).then(result => {
      return resolve(hasSearchQueryField(result))
    })
  })
}

class LdsServiceImpl {

  searchDatasets = (value) => client.query({
    query: ALL_DATASETS
  }).then(result => Promise.resolve(filterByText(result, value)))

  searchDatasetsAndVariables = (value) => client.query({
    query: ALL_DATASETS_AND_VARIABLES
  }).then(result => Promise.resolve(filterByText(result, value)))

  getVariable = (varibleId) => client.query({
    query: GET_VARIABLE,
    variables: { id: varibleId }
  }).then(result => Promise.resolve(mapVariableByIdResult(result)))

  getDatasetsFromVariable = (varibleId) => client.query({
    query: GET_DATASETS_FROM_VARIABLE,
    variables: { id: varibleId }
  }).then(result => Promise.resolve(mapDatasetsByVariableIdResult(result)))

  searchDatasetsFullText = (variables) => {
    return new Promise((resolve, reject) => {
      hasSearchSupport().then(hasSearch => {
        if (hasSearch) {
          // Perform a text search query
          client.query({
            query: FULL_TEXT_SEARCH,
            variables: variables
          }).then(result => resolve(mapSearchResult(result)))
        } else {
          // Text search query is not supported. Fetch all datasets and variables and use text filtering instead
          return resolve(this.searchDatasetsAndVariables(variables.text))
        }
      })
    })
  }

  getDatasetStructure = (id) => client.query({
    query: DATASET_WITH_STRUCTURE,
    variables: { id: id }
  }).then(result => Promise.resolve(mapResult(result)))

  getRoles = () => {
    return get(Properties.api.role)
  }

  getDataResources = () => {
    return get(Properties.api.dataResource)
  }

  getDatasets = () => client.query({
    query: ALL_DATASETS
  })
}

export default LdsServiceImpl
