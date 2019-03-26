import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import DatasetView from '../dataset/DatasetView'
import HomeMenu from './HomeMenu'
import SearchPage from '../search/SearchPage'

class Home extends Component {
  render () {
    const {handleChange, handleLogout, languageCode} = this.props

    return (
      <div>
        <HomeMenu handleChange={handleChange} handleLogout={handleLogout} languageCode={languageCode} />
        <div style={{marginTop: '5em'}}>
          <Route path='/search'
                 render={({location}) => <SearchPage languageCode={languageCode} location={location} />} />
          <Route path='/dataset'
                 render={({location}) => <DatasetView languageCode={languageCode} location={location} />} />
        </div>
      </div>
    )
  }
}

export default Home
