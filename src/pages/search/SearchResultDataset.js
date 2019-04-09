import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { METADATA } from '../../utilities/enum'

class SearchResultDataset extends Component {
  render () {
    const {languageCode, result} = this.props

    return (
      <p style={{marginBottom: 10 + 'px'}}>
        <Link to={{
          'pathname': '/dataset',
          state: {dataset: result}
        }}
        ><b>{METADATA.TITLE[languageCode]}:</b> {result.title} </Link><br />
        <b>{METADATA.DESCRIPTION[languageCode]}:</b> {result.description} <br />
        <b>{METADATA.CREATED_DATE[languageCode]}:</b> {new Intl.DateTimeFormat(languageCode,
        {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }).format(result.created)} <br />
      </p>
    )
  }
}

export default SearchResultDataset
