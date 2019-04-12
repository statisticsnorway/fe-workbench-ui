import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import DatasetView from '../dataset/DatasetView'
import HomeMenu from './HomeMenu'
import SearchPage from '../search/SearchPage'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../search/fragmentTypes.json';

// Some queries contain union or interface types, so Apollo Client's simple (heuristic) fragment matcher can not
// be used. See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const cache = new InMemoryCache({ fragmentMatcher });

class Home extends Component {
  render () {
    const {handleChange, handleLogout, languageCode, user} = this.props

    const client = new ApolloClient({
      uri: this.props.graphqlURL,
      cache: cache
    });

    console.log(user)

    return (
      <div>
        <HomeMenu handleChange={handleChange} handleLogout={handleLogout} languageCode={languageCode} client={client} />
        <div style={{marginTop: '5em'}}>
          <Route path='/search'
                 render={({location}) => <SearchPage languageCode={languageCode} location={location} client={client} />} />
          <Route path='/dataset'
                 render={({location}) => <DatasetView languageCode={languageCode} location={location} />} />
        </div>
      </div>
    )
  }
}

export default Home
