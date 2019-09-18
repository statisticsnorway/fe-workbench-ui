import React, { Component } from 'react'
import BackendServiceMock from '../services/BackendServiceMock'
import BackendServiceImpl from '../services/BackendServiceImpl'
import LdsServiceMock from '../services/LdsServiceMock'
import LdsServiceImpl from '../services/LdsServiceImpl'
import DatasetServiceImpl from '../services/DatasetServiceImpl'
import DatasetServiceMock from '../services/DatasetServiceMock'
import NotebookServiceMock from '../services/NotebookServiceMock'
import NotebookServiceImpl from '../services/NotebookServiceImpl'
import Properties from '../properties/properties'

const IllegalAccessError = new Error("Accessing context outside of WorkbenchContext")

// Creating default context
export const WorkbenchContext = React.createContext({
  languageCode: 'nb',
  backendService: BackendServiceMock,
  ldsService: LdsServiceMock,
  datasetService: new DatasetServiceMock(),
  notebookService: new NotebookServiceMock(),
  setLanguage: () => { throw IllegalAccessError },
  getLocalizedText: () => { throw IllegalAccessError },
  getLocalizedGsimObjectText: () => { throw IllegalAccessError }
})

export class ContextProvider extends Component {
  state = {
    languageCode: 'nb',
    backendService: Properties.mock.backend === true ? new BackendServiceMock(): new BackendServiceImpl(),
    ldsService: Properties.mock.lds === true ? new LdsServiceMock(): new LdsServiceImpl(),
    datasetService: Properties.mock.datasetService === true ? new DatasetServiceMock(): new DatasetServiceImpl(),
    notebookService: Properties.mock.notebookService === true ? new NotebookServiceMock(): new NotebookServiceImpl()
  }

  setLanguage (ref) {
    return (language) => {
      ref.setState({ languageCode: language })
    }
  }

  // Global search replace (regex) \{(.*)\.(.*)\[context\.languageCode\]\}
  // with {context.getLocalizedText($1.$2)}
  getLocalizedText (state) {
    return (key) => {
        return key[state.languageCode]
    }
  }

  getLocalizedGsimObjectText (state) {
    return (codeTextObj) => {
      let text = codeTextObj.find(name => name.languageCode === state.languageCode) || codeTextObj[0]
      return text === undefined ? null : text.languageText
    }
  }

  render () {
    const { children } = this.props
    return (
      <WorkbenchContext.Provider
        value={{
        languageCode: this.state.languageCode,
        backendService: this.state.backendService,
        ldsService: this.state.ldsService,
        datasetService: this.state.datasetService,
        notebookService: this.state.notebookService,
        setLanguage: this.setLanguage(this),
        getLocalizedText: this.getLocalizedText(this.state),
        getLocalizedGsimObjectText: this.getLocalizedGsimObjectText(this.state)
        }}>
        {children}
      </WorkbenchContext.Provider>
    )
  }
}
