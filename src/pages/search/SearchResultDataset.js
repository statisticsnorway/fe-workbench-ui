import React, { Component } from 'react'
import { SEARCH } from '../../utilities/Enum'

class SearchResultDataset extends Component {

  render(){
    const { languageCode, result } = this.props

    return (
      <div>
        <p style={{marginBottom: 10 + "px"}}>
          <b>{SEARCH.TITLE[languageCode]}:</b> {result.title} <br/>
          <b>{SEARCH.DESCRIPTION[languageCode]}:</b> {result.description} <br/>
          <b>{SEARCH.CREATED_DATE[languageCode]}:</b> {new Intl.DateTimeFormat(languageCode,
          {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(result.created)} <br/>
          <b>{SEARCH.NO_OF_ROWS[languageCode]}:</b> {new Intl.NumberFormat(languageCode,
          {maximumSignificantDigits: 3}).format(result.rows)} <br/>
        </p>
      </div>
    )
  }
}

export default SearchResultDataset