// see https://github.com/apollographql/apollo-client/issues/4843
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost'

import introspectionQueryResultData from './fragmentTypes.json'
import Properties from '../../properties/properties'
import { methodfetch } from '../fetch/Fetch'

// Some queries contain union or interface types, so Apollo Client's simple (heuristic) fragment matcher can not
// be used. See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData })
const cache = new InMemoryCache({ fragmentMatcher })


class QueryGraphql {
  constructor(ldsUrl) {
    this.client = new ApolloClient({
      uri: ldsUrl + '/graphql',
      cache: cache
    })
  }

  graphqlSearch = (query, mockparameter, mockresult) =>
    new Promise((resolve) => {
      console.log(this.mock(mockparameter))
      console.log(mockresult)
      resolve(this.mock(mockparameter) ? mockresult :
        this.client.query({ query: query })
      )
    })


  graphqlSearchParam = (query, variables, mockparameter, mockresult) =>
    new Promise((resolve) => {
      resolve(this.mock(mockparameter) ? mockresult :
        this.client.query({
          query: query,
          variables: variables
        })
      )
    })

  mock(mockparameter) {
    console.log(mockparameter)
    console.log(Properties.mock[mockparameter])
    return Properties.mock[mockparameter] === true
  }


}
export default QueryGraphql