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

export const WorkbenchContext = React.createContext({
  languageCode: 'nb',
  backendService: BackendServiceMock,
  ldsService: LdsServiceMock,
  datasetService: new DatasetServiceMock(),
  notebookService: new NotebookServiceMock(),
  setLanguage: (language) => {
    this.setState({ languageCode: language })
  }
})

export class ContextProvider extends Component {
  state = {
    languageCode: 'nb',
    backendService: Properties.mock.backend === true ? new BackendServiceMock(): new BackendServiceImpl(),
    ldsService: Properties.mock.lds === true ? new LdsServiceMock(): new LdsServiceImpl(),
    datasetService: Properties.mock.datasetService === true ? new DatasetServiceMock(): new DatasetServiceImpl(),
    notebookService: Properties.mock.notebookService === true ? new NotebookServiceMock(): new NotebookServiceImpl(),
    setLanguage: (language) => {
      this.setState({ languageCode: language })
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
          setLanguage: this.state.setLanguage
        }}>
        {children}
      </WorkbenchContext.Provider>
    )
  }
}
