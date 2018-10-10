import React from 'react'
import _ from 'lodash'
import { Button, Modal, Form, Search } from 'semantic-ui-react'
import '../../assets/css/site.css'
import { getDataFromBackend } from "../../utils/Common";

class InformationProviderSearchModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoProviderModalOpen: false,
      informationProviderList: [],
      selectedInformationProvider: '',
      value: '',
      suggestions: []
    }
  }

  componentDidMount() {
    getDataFromBackend('InformationProvider/', this.state.informationProviderList).then((result) => {
      let searchList = []
      if(result.data){
        for(let i = 0, l = result.data.length; i < l; i++) {
          let searchOption = {
            title: result.data[i].name[0].languageText,
            description: result.data[i].description[0].languageText,
            id: result.data[i].id
          }
          searchList.push(searchOption)
        }
      }
      this.setState(prevState => ({
        informationProviderList: searchList,
        waitingForResponse: false
      }))
    })
  }

  componentWillMount() {
    this.resetComponent()
  }

  onChange = (event, {newValue, method}) => {
    this.setState({
      value: newValue
    });
  };

  resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

  handleResultSelect = (e, {result}) => {
    this.setState({value: result.title})
    this.props.getSelectedValue(result);
    this.handleInfoProviderModalClose()
  }

  handleSearchChange = (e, {value}) => {
    this.setState({isLoading: true, value})
    setTimeout(() => {
      if(this.state.value.length < 1) return this.resetComponent()
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      this.setState({
        isLoading: false,
        results: _.filter(this.state.informationProviderList, isMatch),
      })
    }, 300)
  }

  handleInfoProviderModalOpen = () => {
    this.setState({
      infoProviderModalOpen: true
    })
  }

  handleInfoProviderModalClose = (event) => {
    this.setState({
      infoProviderModalOpen: false
    })
  }


  render() {
    const {infoProviderModalOpen, value, isLoading, results} = this.state

    return (
      <Modal trigger={<Button primary floated='right' content='select'
                              onClick={this.props.getInfoProvider}></Button>}
             open={infoProviderModalOpen}
             onClose={this.handleInfoProviderModalClose}
             dimmer='inverted'
             centered={false}
             closeOnEscape={true}>
        <Modal.Header content='Velge Leverandør' />
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <Search fluid
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                  results={results}
                  value={value}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default InformationProviderSearchModal

