import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { METADATA } from '../../utilities/enum'
import { WorkbenchContext } from '../../context/ContextProvider'

class SearchResultDataset extends Component {
  static contextType = WorkbenchContext

  render2() {
    return <></>
  }

  render () {
    const { result } = this.props
    let context = this.context

    return (
      <p style={{marginBottom: 10 + 'px'}}>
        <Link to={{
          'pathname': '/dataset/' + result.id
        }}
        ><b>{METADATA.TITLE[context.languageCode]}:</b> {context.getLocalizedGsimObjectText(result.name)} </Link><br />
        <b>{METADATA.DESCRIPTION[context.languageCode]}:</b> {context.getLocalizedGsimObjectText(result.description)} <br />
        <b>{METADATA.CREATED_DATE[context.languageCode]}:</b> {new Intl.DateTimeFormat(context.languageCode,
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
