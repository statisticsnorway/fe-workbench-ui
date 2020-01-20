import { get } from '../utilities/fetch/Fetch'
import { request } from 'graphql-request'
import { FULL_TEXT_SEARCH, GET_QUERY_FIELDS, hasSearchQueryField, mapSearchResult } from './graphql/SearchQuery'
import { ALL_DATASETS } from './graphql/AllDatasetsQuery'
import {
  ALL_DATASETS_AND_VARIABLES,
  GET_DATASETS_FROM_VARIABLE, GET_VARIABLE,
  mapDatasetsByVariableIdResult, mapVariableByIdResult
} from './graphql/AllDatasetsAndVariablesQuery'
import { DATASET_WITH_STRUCTURE, mapResult } from './graphql/DatasetQuery'
import { filterByText } from './graphql/QueryHelper'
import Properties from '../properties/properties'
import QueryGraphql from '../utilities/graphql/QueryGraphql'
import UnitDatasets from '../__tests__/test-data/AllDatasets'
import AllDatasetsAndVariables from '../__tests__/test-data/AllDatasetsAndVariables'
import RepresentedVariableById from '../__tests__/test-data/RepresentedVariableById'
import DatasetsFromVariable from '../__tests__/test-data/GetDatasetByVariable'
import Dataset from '../__tests__/test-data/DatasetWithStructure'
import AllQueryFields from '../__tests__/test-data/AllQueryFields'


const mockparameter = 'ldsGraphql'
const queryGraph = QueryGraphql

class LdsServiceImpl {


  constructor(ldsUrl) {
    this.queryGraph = new QueryGraphql(ldsUrl)
    this.ldsUrl = ldsUrl
    this.mockparameter = 'ldsGraphql'

    this.hasSearchSupport = () => {
      return new Promise((resolve, reject) => {
       this.queryGraph.graphqlSearch(GET_QUERY_FIELDS, this.mockparameter, AllQueryFields)
          .then(result => {
          return resolve(hasSearchQueryField(result))
        }).catch(error => {
          return reject(error)
        })
      })
    }
  }
  searchDatasets = (value) =>
    this.queryGraph.graphqlSearch(ALL_DATASETS, mockparameter, UnitDatasets)
      .then(result => Promise.resolve(filterByText(result, value)))

  searchDatasetsAndVariables = (value) =>
    this.queryGraph.graphqlSearch(ALL_DATASETS_AND_VARIABLES, mockparameter, AllDatasetsAndVariables)
      .then(result => Promise.resolve(filterByText(result, value)))

  getVariable = (varibleId) =>
    this.queryGraph.graphqlSearchParam(GET_VARIABLE, { id: varibleId }, mockparameter, RepresentedVariableById)
      .then(result => Promise.resolve(mapVariableByIdResult(result)))

  getDatasetsFromVariable = (varibleId) =>
    this.queryGraph.graphqlSearchParam(GET_VARIABLE, { id: varibleId }, mockparameter, DatasetsFromVariable)
      .then(result => Promise.resolve(mapDatasetsByVariableIdResult(result)))

  searchDatasetsFullText = (variables) => {
    return new Promise((resolve, reject) => {
      this.hasSearchSupport().then(hasSearch => {
        if (hasSearch) {
          // Perform a text search query
          this.queryGraph.graphqlSearchParam(FULL_TEXT_SEARCH, variables, mockparameter, UnitDatasets)
            .then(result => resolve(mapSearchResult(result)))
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
    this.queryGraph.graphqlSearchParam(DATASET_WITH_STRUCTURE, { id: id }, mockparameter, Dataset)
      .then(result => Promise.resolve(mapResult(result)))
  }

  getDatasets = () =>
    this.queryGraph.graphqlSearch(DATASET_WITH_STRUCTURE, mockparameter, UnitDatasets)



  getRoles = () => {
    return get(this.ldsUrl + Properties.api.namespace + '/Role')
  }

  getStatisticalPrograms = () => {
    return get(this.ldsUrl + Properties.api.namespace + '/StatisticalProgram')
  }

  getStatisticalProgramCycle = (id) => {
    return get(this.ldsUrl + Properties.api.namespace + '/StatisticalProgramCycle/' + id)
  }

}

export default LdsServiceImpl

