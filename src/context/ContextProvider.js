import React, { Component } from 'react'
import BackendServiceMock from '../services/BackendServiceMock'
import BackendServiceImpl from '../services/BackendServiceImpl'
import LdsServiceMock from '../services/LdsServiceMock'
import LdsServiceImpl from '../services/LdsServiceImpl'
import DatasetServiceImpl from '../services/DatasetServiceImpl'
import DatasetServiceMock from '../services/DatasetServiceMock'
import Properties from '../properties/properties'

export const WorkbenchContext = React.createContext({
  languageCode: 'nb',
  backendService: BackendServiceMock,
  ldsService: LdsServiceMock,
  datasetService: new DatasetServiceMock(),
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
          setLanguage: this.state.setLanguage
        }}>
        {children}
      </WorkbenchContext.Provider>
    )
  }
}
