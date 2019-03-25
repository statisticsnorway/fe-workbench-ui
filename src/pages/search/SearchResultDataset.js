import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { METADATA } from '../../utilities/Enum'

class SearchResultDataset extends Component {

  render(){
    const { languageCode, result } = this.props

    return (
      <div>
        <p style={{marginBottom: 10 + "px"}}>
          <Link to={{
            'pathname': '/home/dataset',
            state: {dataset: result}
          }}
          ><b>{METADATA.TITLE[languageCode]}:</b> {result.title} </Link><br/>
          <b>{METADATA.DESCRIPTION[languageCode]}:</b> {result.description} <br/>
          <b>{METADATA.CREATED_DATE[languageCode]}:</b> {new Intl.DateTimeFormat(languageCode,
          {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(result.created)} <br/>
          <b>{METADATA.NO_OF_ROWS[languageCode]}:</b> {new Intl.NumberFormat(languageCode,
          {maximumSignificantDigits: 3}).format(result.rows)} <br/>
        </p>
      </div>
    )
  }
}

export default SearchResultDataset