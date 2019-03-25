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
        <b>{METADATA.CODELIST_URL[languageCode]}:</b> {result.codelist} <br />
      </p>
    )
  }
}

export default SearchResultDataset
