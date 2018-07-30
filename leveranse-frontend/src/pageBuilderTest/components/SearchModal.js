import React from 'react'
import _ from 'lodash'
import { Modal, Search } from 'semantic-ui-react'
import { enums } from '../utilities/Enums'
import { lowerCaseFirst, upperCaseFirst } from '../utilities/Helpers'
import { getDomainData } from '../utilities/DataExchange'
import { responseMessage } from '../utilities/FormComponents'

class SearchModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchModalOpen: false,
      searchList: [],
      filteredSearchList: [],
      selectedResult: '',
      ready: false
    }

    this.nameInNorwegian = lowerCaseFirst(this.props.info.itemInNorwegian)
    this.domainUppercase = upperCaseFirst(this.props.info.item)
    this.domain = this.props.info.item
  }

  componentDidMount () {
    let searchList = []

    getDomainData(this.domainUppercase, enums.URL_AFFIX.LIST).then((result) => {
      for (let i = 0, l = result.length; i < l; i++) {
        let searchOption = {
          title: result[i][enums.PROPERTY.NAME][0][enums.PROPERTY.LANGUAGE_TEXT],
          description: result[i][enums.PROPERTY.DESCRIPTION][0][enums.PROPERTY.LANGUAGE_TEXT],
          id: result[i][enums.PROPERTY.ID]
        }

        searchList.push(searchOption)
      }
    }).catch((reason) => {
      this.setState({response: reason})
    })

    this.setState({searchList: searchList}, () => {this.setState({ready: true})})
  }

  handleSearchChange = (event, {value}) => {
    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = result => re.test(result.title)

    this.setState({
      filteredSearchList: _.filter(this.state.searchList, isMatch),
      selectedResult: value
    })
  }

  handleResultSelect = (event, {result}) => {
    let url = '/' + this.domainUppercase + '/' + result.id
    let text = {title: result.title, url: url, description: result.description, domain: this.domain}

    this.setState({
      selectedResult: result.title,
      searchModalOpen: false
    })

    this.props.text(text)
  }

  handleSearchModalOpen = () => {
    this.setState({searchModalOpen: true})
  }

  handleSearchModalClose = () => {
    this.setState({searchModalOpen: false})
  }

  render () {
    const {searchModalOpen, filteredSearchList, selectedResult, response, ready} = this.state

    return (
      <Modal open={searchModalOpen} onClose={this.handleSearchModalClose} dimmer='inverted' centered={false}
             size='tiny'>
        <Modal.Header content={enums.CONTENT.SEARCH_AND_CHOOSE + ' ' + this.nameInNorwegian} />

        <Modal.Content>
          {typeof response === 'undefined' && ready ?
            <Search
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={filteredSearchList}
              value={selectedResult}
              noResultsMessage={enums.CONTENT.FOUND_NOTHING}
              minCharacters={1}
            />
            : responseMessage(response)}
        </Modal.Content>
      </Modal>
    )
  }
}

export default SearchModal
