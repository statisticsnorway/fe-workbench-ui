import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import TopMenu from './TopMenu'
import SearchPage from '../search/SearchPage'
import DatasetView from '../dataset/DatasetView'

class Home extends Component {
  render () {
    const {handleChange, handleLogout, languageCode, user} = this.props

    console.log(user)

    return (
      <div>
        <TopMenu handleChange={handleChange} handleLogout={handleLogout} languageCode={languageCode} user={user} />
        <div>
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
