import { get } from '../utilities/fetch/FetchOrMock'
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
import Roles from '../__tests__/test-data/Roles'
import StatisticalProgram from '../__tests__/test-data/StatisticalPrograms'
import StatisticalProgramCycle from '../__tests__/test-data/StatisticalProgramCycle'



// see https://github.com/apollographql/apollo-client/issues/4843
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost'

// Some queries contain union or interface types, so Apollo Client's simple (heuristic) fragment matcher can not
// be used. See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData })
const cache = new InMemoryCache({ fragmentMatcher })

const mockparameter = 'lds'

class LdsServiceImpl {

  constructor(ldsUrl) {
    this.client = new ApolloClient({
      uri: ldsUrl + '/graphql',
      cache: cache
    })
    this.ldsUrl = ldsUrl

    this.hasSearchSupport = () => {
      return new Promise((resolve, reject) => {
        this.client.query({
          query: GET_QUERY_FIELDS
        }).then(result => {
          return resolve(hasSearchQueryField(result))
        }).catch(error => {
          return reject(error)
        })
      })
    }
  }

  searchDatasets = (value) => this.client.query({
    query: ALL_DATASETS
  }).then(result => Promise.resolve(filterByText(result, value)))

  searchDatasetsAndVariables = (value) => this.client.query({
    query: ALL_DATASETS_AND_VARIABLES
  }).then(result => Promise.resolve(filterByText(result, value)))

  getVariable = (varibleId) => this.client.query({
    query: GET_VARIABLE,
    variables: { id: varibleId }
  }).then(result => Promise.resolve(mapVariableByIdResult(result)))

  getDatasetsFromVariable = (varibleId) => this.client.query({
    query: GET_DATASETS_FROM_VARIABLE,
    variables: { id: varibleId }
  }).then(result => Promise.resolve(mapDatasetsByVariableIdResult(result)))

  searchDatasetsFullText = (variables) => {
    console.log('client.query searchDatasetsFullText ')
    console.log(FULL_TEXT_SEARCH)
    console.log(variables)
    return new Promise((resolve, reject) => {
      this.hasSearchSupport().then(hasSearch => {
        if (hasSearch) {
          // Perform a text search query
          this.client.query({
            query: FULL_TEXT_SEARCH,
            variables: variables
          }).then(result => resolve(mapSearchResult(result)))
        } else {
          // Text search query is not supported. Fetch all datasets and variables and use text filtering instead
          return resolve(this.searchDatasetsAndVariables(variables.text))
        }
      }).catch(error => {
        reject(error)
      })
    })
  }

  getDatasetStructure (id) {
    this.client.query({
      query: DATASET_WITH_STRUCTURE,
      variables: { id: id }
    }).then(result => Promise.resolve(mapResult(result)))
  }

  getRoles = () => {
    return get(this.ldsUrl + Properties.api.namespace + '/Role', mockparameter, Roles)
  }

  getStatisticalPrograms = () => {
    return get(this.ldsUrl + Properties.api.namespace + '/StatisticalProgram', mockparameter, StatisticalProgram)
  }

  getStatisticalProgramCycle = (id) => {
    return get(this.ldsUrl + Properties.api.namespace + '/StatisticalProgramCycle/' + id, mockparameter, StatisticalProgramCycle)
  }

  getDatasets = () => this.client.query({
    query: ALL_DATASETS
  })

}

export default LdsServiceImpl
