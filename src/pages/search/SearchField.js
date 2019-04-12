import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import { ALL_DATASETS, filterByText} from './AllDatasetsQuery'
import { UI } from '../../utilities/enum'
import { WorkbenchContext } from '../../context/ContextProvider'

class SearchField extends Component {
  static contextType = WorkbenchContext

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

    if (value.length > 1) {
      this.setState({isLoading: true, value})

      this.props.client.query({
        query: ALL_DATASETS
      }).then(results => {
        this.setState({
          isLoading: false,
          results: filterByText(results, value)
        })
      })

    } else {
      this.setState({isLoading: false, value})
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
      let pathname = '/search'
      if (this.props.history.location.pathname === pathname) {
        this.props.history.replace({
          pathname: pathname,
          state: {
            value: value
          }
        })
      } else {
        this.props.history.push({
          pathname: pathname,
          state: {
            value: value
          }
        })
      }
    }
  }

  render () {
    const {isLoading, value, results} = this.state
    const {alignement} = this.props

    let context = this.context

    return (
      <Search
        aligned={alignement}
        placeholder={UI.SEARCH[context.languageCode]}
        onKeyPress={this.handleKeyPress}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
        results={results}
        value={value}
        minCharacters={2}
        size='tiny'
        showNoResults={false}
        data-testid='global-search'
      />
    )
  }
}

export default withRouter(SearchField)
