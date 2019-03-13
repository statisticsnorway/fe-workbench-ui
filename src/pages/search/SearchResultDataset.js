import React, { Component } from 'react'
import { DATASET } from '../../utilities/Enum'

class SearchResultDataset extends Component {

  render(){
    const { languageCode, result } = this.props

    return (
      <div>
        <p style={{marginBottom: 10 + "px"}}>
          <b>{DATASET.TITLE[languageCode]}:</b> {result.title} <br/>
          <b>{DATASET.DESCRIPTION[languageCode]}:</b> {result.description} <br/>
          <b>{DATASET.CREATED_DATE[languageCode]}:</b> {new Intl.DateTimeFormat(languageCode,
          {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(result.created)} <br/>
          <b>{DATASET.NO_OF_ROWS[languageCode]}:</b> {new Intl.NumberFormat(languageCode,
          {maximumSignificantDigits: 3}).format(result.rows)} <br/>
        </p>
      </div>
    )
  }
}

export default SearchResultDataset