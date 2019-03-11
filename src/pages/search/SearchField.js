import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'
import { withRouter } from 'react-router-dom'

// TODO remove when search API is available
const source = _.times(5, () => ({
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  created: faker.date.recent(),
  rows: faker.random.number({min: 1, max: 50000000}),
}))

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

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {

    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.props.history.push({
        pathname: '/home/search',
        state: {results: this.state.results}
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
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
      )
  }
}

export default withRouter(SearchField)
