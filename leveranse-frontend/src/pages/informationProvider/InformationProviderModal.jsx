import React from 'react'
import {Button, Modal, Form} from 'semantic-ui-react'
import '../../assets/css/site.css'
import {getDataFromBackend} from "../../utils/Common";
import Autosuggest from 'react-autosuggest';

class InformationProviderModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoProviderModalOpen: false,
      informationProviderList: [],
      selectedInformationProvider: '',
      value: '',
      suggestions: []
    }
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
  }

  componentDidMount() {
    getDataFromBackend('InformationProvider/', this.state.informationProviderList).then((result) => {
      this.setState(prevState => ({
        informationProviderList: [...prevState.informationProviderList, result.data],
        waitingForResponse: false
      }))
    })
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return this.state.informationProviderList.filter(
      provider =>
        regex.test(provider[0].description[0].languageText));
  }

  getSuggestionValue(suggestion) {
    this.setState(prevState => ({
      selectedInformationProvider: suggestion,
    }))
    this.props.getSelectedValue(suggestion);
    this.setState({
      infoProviderModalOpen: false
    })
    return suggestion[0].name[0].languageText;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion[0].name[0].languageText}----{suggestion[0].description[0].languageText}</span>
    );
  }

  onChange = (event, {newValue, method}) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleInfoProviderModalOpen = () => {
    this.setState({
      infoProviderModalOpen: true
    })
  }

  handleInfoProviderModalClose = (event) => {
    event.preventDefault()
    this.setState({
      infoProviderModalOpen: false
    })
  }


  render() {
    const {infoProviderModalOpen, value, suggestions} = this.state
    const inputProps = {
      placeholder: 'søk leverandør',
      value,
      onChange: this.onChange
    };
    return (
      <Modal trigger={<Button primary floated='right' content='select'
                              onClick={this.props.getInfoProvider}></Button>} open={infoProviderModalOpen}
             onClose={this.handleInfoProviderModalClose} dimmer='inverted' centered={false} closeOnEscape={false}
             closeOnRootNodeClick={false}>
        <Modal.Header content='Velge Leverandør'/>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={inputProps}/>
              </Form.Field>
              <Form.Field>
                <Button positive floated='right' onClick={this.handleInfoProviderModalClose} content='Tilbake'/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default InformationProviderModal

