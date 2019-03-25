import React, { Component } from 'react'
import SearchResultDataset from './SearchResultDataset'
import SearchResultVariable from './SearchResultVariable'
import { Search, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash'
import { datasets, variables } from '../../mocks/MockData'
import { METADATA } from '../../utilities/Enum'

class SearchPage extends Component {


  constructor (props) {
    super(props)
    const { state } = props.location
    this.state = {
      isLoading: false,
      results: [],
      value: state && state.value
        ? state.value
        : '',
      enterIsPressed: state && state.value
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  componentDidMount () {
    if (this.props.location.state) {
      this.setState(
        {
          value: this.props.location.state.value,
          enterIsPressed: true,
        }
      )
      this.doSearch()
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    this.setState({
      value: nextProps.location.state.value,
      enterIsPressed: true,
    })

    this.doSearch()
  }

  resetComponent = () => this.setState({
    isLoading: false, results: [],
    value: this.props.location && this.props.location.state
      ? this.props.location.state.value : ''
  })

  handleSearchChange = (e, { value }) => {
      this.setState({value})
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.doSearch()
    }
  }

  doSearch = () => {
    this.setState({ isLoading: true })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isDatasetMatch = dataset => re.test(dataset.title)
      const isVariableMatch = variable => re.test(variable.title)

      this.setState({
        isLoading: false,
        results: _.filter(datasets, isDatasetMatch).concat(_.filter(variables, isVariableMatch)),
        enterIsPressed: true
      })
  }, 300)
}

    render () {
      const { languageCode } = this.props
      const { isLoading, value, results} = this.state
      const datasetResults = this.state.results.filter(value => value.type === 'dataset')
      const variableResults = this.state.results.filter(value => value.type === 'variable')
      return (
        //TODO Planned layout:
        // -- Search field (remember to keep search string from menu search field
        // -- Filter checkboxes
        // -- Results in datasets
        // -- Results i variables
        // -- Results in ...?
        <div>
          <div>
            <Grid stretched centered >
              <Grid.Row>  {/*Main row for layout*/}
                <Grid.Column floated='left' width={1}> {/*Left padding column*/}
                </Grid.Column>
                <Grid.Column width={12}>
                  <Grid.Row>
                    <Grid.Column style={{'paddingBottom': '10px', 'textAlign': 'center'}}>
                      <h1>{METADATA.SEARCH_RESULTS[languageCode]}</h1>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{'paddingBottom': '30px', 'textAlign': 'center'}}>
                    <Grid.Column style={{'textAlign': '-webkit-center'}}>
                      {/*TODO reuse SearchField here, improve customizability*/}
                      <Search
                        autoFocus
                        style={{'width':'70%'}}
                        onKeyPress={this.handleKeyPress}
                        loading={isLoading}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                        results={results}
                        value={value}
                        minCharacters={3}
                        size='large'
                        input={{fluid: true}}
                        open={false}
                        {...this.props}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{'paddingBottom': '30px'}}>
                    <Grid.Column>
                      {this.state.enterIsPressed} //TODO show headers only after an actual search has been performed
                      <Header>{METADATA.MATCHES_IN[languageCode]} {METADATA.TABLES[languageCode]}</Header>
                      <hr style={{color: 'black', height: 0}}/>
                      {
                        datasetResults.length > 0 ? datasetResults.map((value, idx) =>
                             <SearchResultDataset key={idx} result={value} languageCode={languageCode}/>
                        )
                        : value.length > 1 && this.state.enterIsPressed ? "0 treff" : ''
                      }
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Header>{METADATA.MATCHES_IN[languageCode]} {METADATA.VARIABLES[languageCode]}</Header>
                      <hr style={{color: 'black', height: 0}}/>
                      {  variableResults.length > 0 ? variableResults.map((value, idx) =>
                          <SearchResultVariable key={idx} result={value} languageCode={languageCode}/>
                        )
                        : value.length > 1 && this.state.enterIsPressed ? "0 treff" : ''
                      }
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column floated='right' width={1}> {/*Right padding column*/}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      )
  }
}

export default SearchPage
