import React, { Component } from 'react'
import { DATASET } from '../../utilities/Enum'

class DatasetView extends Component {

  render () {
    const { languageCode, location } = this.props
    const {state} = location
    const {dataset} = state
    return (
      <div>
        <h1>{dataset.title}</h1>
        <b>{DATASET.DESCRIPTION[languageCode]}:</b> {dataset.description}<br />
        <b>{DATASET.CREATED_DATE[languageCode]}:</b> {new Intl.DateTimeFormat(languageCode,
          {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(dataset.created)}<br />
        <b>{DATASET.NO_OF_ROWS[languageCode]}:</b> {new Intl.NumberFormat(languageCode,
          {maximumSignificantDigits: 3}).format(dataset.rows)}<br />
      </div>
    )
  }
}

export default DatasetView