import React, { useContext, useEffect, useRef, useState } from 'react'
import { Grid, Header, Search, Segment } from 'semantic-ui-react'
import _ from 'lodash'

import SearchResultDataset from './SearchResultDataset'
import SearchResultVariable from './SearchResultVariable'
import { METADATA } from '../../utilities/enum'
import { WorkbenchContext } from '../../context/ContextProvider'
import { NOTIFICATION_TYPE } from '../../utilities/enum/NOTIFICATION_TYPE'

const SearchPage = (props) => {
  const context = useContext(WorkbenchContext)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [value, setValue] = useState('')
  const [enterIsPressed, setEnterIsPressed] = useState(false)
  const [error, setError] = useState(false)

  const { location, history } = props
  // Workaround to be able to access context from useEffect
  // see https://stackoverflow.com/questions/56240067/accessing-context-from-useeffect
  const mutableContext = useRef(context).current

  useEffect(() => {
    const resetComponent = () => {
      setEnterIsPressed(false)
      setLoading(false)
      setResults([])
    }

    const getQuery = () => {
      return location.search ? new URLSearchParams(location.search).get('query') : ''
    }

    const doSearch = (value) => {
      console.log('Start search')
      setLoading(true)

      if (value.length < 1) return resetComponent()

      context.ldsService.searchDatasetsFullText({ text: value }).then(results => {
        setLoading(false)
        setResults(results)
      }).catch(error => {
        resetComponent()
        setError(error)
      })
    }

    if (location.search) {
      const query = getQuery()
      setValue(query)
      setEnterIsPressed(true)
      doSearch(query)
    }
  }, [location.search, context.ldsService])

  useEffect(() => {
    if (error && error.message) {
      mutableContext.setNotification(true, NOTIFICATION_TYPE.ERROR, error.message)
    }
  }, [error, mutableContext])

  const handleSearchChange = (e, { value }) => {
    setValue(value)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // Change in location will indirectly trigger a search in useEffect
      history.push({
        pathname: history.location.pathname,
        search: '?query=' + value
      })
    }
  }

  const datasetResults = results.filter(entry => entry.type !== 'RepresentedVariable')
  const variableResults = results.filter(entry => entry.type === 'RepresentedVariable')

  return (
    //TODO Planned layout:
    // -- Search field (remember to keep search string from menu search field
    // -- Filter checkboxes
    // -- Results in datasets
    // -- Results i variables
    // -- Results in ...?
    <Segment basic>
      <Grid stretched centered>
        <Grid.Row>  {/*Main row for layout*/}
          <Grid.Column floated='left' width={1}> {/*Left padding column*/}
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row>
              <Grid.Column style={{ 'paddingBottom': '10px', 'textAlign': 'center' }}>
                <h1>{METADATA.SEARCH_TITLE[context.languageCode]}</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ 'paddingBottom': '30px', 'textAlign': 'center' }}>
              <Grid.Column style={{ 'textAlign': '-webkit-center' }}>
                {/*TODO reuse SearchField here, improve customizability*/}
                <Search
                  autoFocus
                  style={{ 'width': '70%' }}
                  onKeyPress={handleKeyPress}
                  loading={loading}
                  onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                  value={value}
                  minCharacters={3}
                  size='large'
                  input={{ fluid: true }}
                  open={false}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ 'paddingBottom': '30px' }}>
              <Grid.Column>
                <Header>{METADATA.MATCHES_IN[context.languageCode]} {METADATA.TABLES[context.languageCode]}</Header>
                <hr style={{ color: 'black', height: 0 }}/>
                {
                  datasetResults.length > 0 ? datasetResults.map(value =>
                      <SearchResultDataset key={value.id} result={value}/>
                    )
                    : value.length > 1 && enterIsPressed ? '0 treff' : ''
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header>{METADATA.MATCHES_IN[context.languageCode]} {METADATA.VARIABLES[context.languageCode]}</Header>
                <hr style={{ color: 'black', height: 0 }}/>
                {variableResults.length > 0 ? variableResults.map(value =>
                    <SearchResultVariable key={value.id} result={value}/>
                  )
                  : value.length > 1 && enterIsPressed ? '0 treff' : ''
                }
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column floated='right' width={1}> {/*Right padding column*/}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default SearchPage
