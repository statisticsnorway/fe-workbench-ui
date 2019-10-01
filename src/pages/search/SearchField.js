import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
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

  // TODO see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillMount () {
    this.resetComponent()
  }

  resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

  handleResultSelect = (e, {result}) => {
    this.setState({results: []})
      this.props.history.push({
        pathname: '/dataset/' + result.id,
      })
  }

  handleSearchChange = (e, {value}) => {

    if (value.length > 1) {
      this.setState({isLoading: true, value})

      this.context.ldsService.searchDatasets(value).then(results => {
        this.setState({
          isLoading: false,
          results: results.map(this.mapSearchResult)
        })
      })

    } else {
      this.setState({isLoading: false, value})
    }
  }

  mapSearchResult = (obj) => {
    return {
      id: obj.id,
      title: this.context.getLocalizedGsimObjectText(obj.name),
      description: this.context.getLocalizedGsimObjectText(obj.description)
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
          search: '?query=' + value
        })
      } else {
        this.props.history.push({
          pathname: pathname,
          search: '?query=' + value
        })
      }
    }
  }

  render () {
    const {isLoading, value, results} = this.state
    const {alignment} = this.props

    let context = this.context

    return (
      <Search
        aligned={alignment}
        placeholder={context.getLocalizedText(UI.SEARCH)}
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
