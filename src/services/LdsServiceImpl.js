import { get } from '../utilities/fetch/Fetch'
import { FULL_TEXT_SEARCH, mapSearchResult } from './graphql/SearchQuery'
import { ALL_DATASETS, filterByText } from './graphql/AllDatasetsQuery'
import introspectionQueryResultData from './graphql/fragmentTypes.json'
import { DATASET_WITH_STRUCTURE, mapResult } from './graphql/DatasetQuery'
import Properties from '../properties/properties'

// see https://github.com/apollographql/apollo-client/issues/4843
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost/lib/index'

// Some queries contain union or interface types, so Apollo Client's simple (heuristic) fragment matcher can not
// be used. See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData })
const cache = new InMemoryCache({ fragmentMatcher })
const client = new ApolloClient({
  uri: Properties.api.lds + '/graphql',
  cache: cache
})

class LdsServiceImpl {

  searchDatasets = (value) => client.query({
      query: ALL_DATASETS
    }).then(result => Promise.resolve(filterByText(result, value)))

  searchDatasetsFullText = (variables) => client.query({
      query: FULL_TEXT_SEARCH,
      variables: variables
    }).then(result => Promise.resolve(mapSearchResult(result)))

  getDatasetStructure = (id) => client.query({
      query: DATASET_WITH_STRUCTURE,
      variables: {id: id}
    }).then(result => Promise.resolve(mapResult(result)))

  getRoles = () =>
  {
    return get(Properties.api.role)
  }

  getDataResources()
  {
    return get(Properties.api.dataResource)
  }
}

export default LdsServiceImpl
