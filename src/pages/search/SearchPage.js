import React, { Component } from 'react'
import SearchResultDataset from './SearchResultDataset'

class SearchPage extends Component {


    render () {
        const { location, languageCode } = this.props
        return (
          //TODO Planned layout:
          // -- Search field (remember to keep search string from menu search field
          // -- Filter checkboxes
          // -- Results in datasets
          // -- Results i variables
          // -- Results in ...?
            <div>
                <h1>Søkeresultater</h1>
                { location === undefined || location.state === undefined
                  ?
                    "0 treff"
                  : location.state.results.map((value, idx) => (
                    <SearchResultDataset key={idx} result={value} languageCode={languageCode}/>

                  ))
                }
            </div>
        )
    }
}

export default SearchPage
