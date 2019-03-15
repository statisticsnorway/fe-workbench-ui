import React, { Component } from 'react'
import { Search, Label } from 'semantic-ui-react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { datasets } from '../../mocks/MockData'

const resultRenderer = ({ title }) => {
  return <Label content={title}/>
}

class SearchField extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: '',
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) =>
  {
    this.setState({results: []})

    this.props.history.push({
      pathname: '/home/dataset',
      state: {dataset: result}

  })}

  handleSearchChange = (e, { value }) => {

    if (value.length > 2) {
      this.setState({ isLoading: true, value })

      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(datasets, isMatch),
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
        pathname: '/home/search',
        state: {
          value: value
        }
      })
    }
  }

  render () {
    const { isLoading, value, results} = this.state
      return (
          <Search
            onKeyPress = {this.handleKeyPress}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            minCharacters={3}
            size='tiny'
            {...this.props}
            showNoResults={false}
          />
      )
  }
}

export default withRouter(SearchField)
