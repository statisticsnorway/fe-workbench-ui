import { getData } from '../utilities/fetch/Fetch'
import { FULL_TEXT_SEARCH, mapSearchResult } from './graphql/SearchQuery'
import { ALL_DATASETS, filterByText } from './graphql/AllDatasetsQuery'
import introspectionQueryResultData from './graphql/fragmentTypes.json'
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost'

// Some queries contain union or interface types, so Apollo Client's simple (heuristic) fragment matcher can not
// be used. See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData })
const cache = new InMemoryCache({ fragmentMatcher })
const client = new ApolloClient({
  uri: process.env.REACT_APP_LDS + 'graphql',
  cache: cache
})

class LdsServiceImpl {

  static getRoles = () => getData(process.env.REACT_APP_ROLES);

  static searchDatasets = (value) => client.query({
      query: ALL_DATASETS
    }).then(result => Promise.resolve(filterByText(result, value)))

  static searchDatasetsFullText = (variables) => client.query({
      query: FULL_TEXT_SEARCH,
      variables: variables
    }).then(result => Promise.resolve(mapSearchResult(result)))
}

export default LdsServiceImpl