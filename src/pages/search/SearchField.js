import React, { Component } from 'react'
import { Search, Label } from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'
import { withRouter } from 'react-router-dom'

// TODO remove when search API is available
/*const source = _.times(10, () => ({
  title: 'Statistics for ' + faker.commerce.productMaterial()
    + ' in ' + faker.address.country(),
  description: faker.lorem.sentence(),
  created: faker.date.recent(),
  rows: faker.random.number({min: 1, max: 50000000}),
}))*/

const source = [
  {
    title: 'Dyr i skogen',
    description: 'Har du noen gang lurt på hvor mange ugler det er i din lokale skog? Her får du svaret - og mer til',
    created: faker.date.recent(),
    rows: faker.random.number({min: 1, max: 50000000}),
  },
  {
    title: 'Dyr i byen',
    description: 'Har din bydel flest rotter? Les videre og finn ut!',
    created: faker.date.recent(),
    rows: faker.random.number({min: 1, max: 50000000}),
  },
  {
    title: 'Ekorn per elg',
    description: 'Antall ekorn per elg per skogholt',
    created: faker.date.recent(),
    rows: faker.random.number({min: 1, max: 50000000}),
  },
  {
    title: 'Rotter per måke',
    description: 'Antall rotter per måke fordelt på rundkjøringer og annet',
    created: faker.date.recent(),
    rows: faker.random.number({min: 1, max: 50000000}),
  },
]

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
    this.props.history.push({
      pathname: '/home/dataset',
      state: {dataset: result}
    })

  handleSearchChange = (e, { value }) => {

    if (value.length > 2) {
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
    } else {
      this.setState({value})
    }
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
            resultRenderer={resultRenderer}
            minCharacters={3}
            {...this.props}
          />
      )
  }
}

export default withRouter(SearchField)
