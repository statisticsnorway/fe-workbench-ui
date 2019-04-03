import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Label, Search } from 'semantic-ui-react'
import _ from 'lodash'

import { datasets } from '../../mocks/MockData'
import { UI } from '../../utilities/enum'

const resultRenderer = ({title}) => <Label content={title} />

class SearchField extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }
  }

  componentWillMount () {
    this.resetComponent()
  }

  resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

  handleResultSelect = (e, {result}) => {
    this.setState({results: []})

    this.props.history.push({
      pathname: '/dataset',
      state: {dataset: result}

    })
  }

  handleSearchChange = (e, {value}) => {
    if (value.length > 2) {
      this.setState({isLoading: true, value})

      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(datasets, isMatch)
      })
    } else {
      this.setState({value})
    }
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()

      let value = this.state.value

      this.setState({
        value: '',
        results: []
      })
      this.props.history.push({
        pathname: '/search',
        state: {
          value: value
        }
      })
    }
  }

  render () {
    const {isLoading, value, results} = this.state
    const {alignement, languageCode} = this.props

    return (
      <Search
        aligned={alignement}
        placeholder={UI.SEARCH[languageCode]}
        onKeyPress={this.handleKeyPress}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        resultRenderer={resultRenderer}
        minCharacters={3}
        showNoResults={false}
        data-testid='global-search'
      />
    )
  }
}

export default withRouter(SearchField)
