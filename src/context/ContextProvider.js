import React, { Component } from 'react'
import BackendServiceMock from '../services/BackendServiceMock'
import BackendServiceImpl from '../services/BackendServiceImpl'
import LdsServiceMock from '../services/LdsServiceMock'
import LdsServiceImpl from '../services/LdsServiceImpl'
import DatasetServiceImpl from '../services/DatasetServiceImpl'
import DatasetServiceMock from '../services/DatasetServiceMock'

export const WorkbenchContext = React.createContext({
  languageCode: 'nb',
  backendService: BackendServiceMock,
  ldsService: LdsServiceMock,
  datasetService: DatasetServiceMock,
  setLanguage: (language) => {
    this.setState({ languageCode: language })
  }
})

export class ContextProvider extends Component {
  state = {
    languageCode: 'nb',
    backendService: process.env.REACT_APP_BACKEND_MOCK === 'true' ? BackendServiceMock : BackendServiceImpl,
    ldsService: process.env.REACT_APP_LDS_MOCK === 'true' ? LdsServiceMock : LdsServiceImpl,
    datasetService: process.env.REACT_APP_LDS_MOCK === 'true' ? DatasetServiceMock : DatasetServiceImpl,
    setLanguage: (language) => {
      this.setState({ languageCode: language })
    }
  }

  // TODO how to make this work? import() is async, which means that the component will render
  // TODO before the import is finished, which again means that the services in the context will be null
  // componentDidMount () {
  //   if (process.env.REACT_APP_BACKEND_MOCK === 'true') {
  //     import('../services/BackendServiceMock')
  //       .then( service => this.setState({backendService: service }))
  //   } else {
  //     import('../services/BackendServiceImpl')
  //       .then( service => this.setState({backendService: service }))
  //   }
  //
  //   if (process.env.REACT_APP_LDS_MOCK === 'true') {
  //     import('../services/LdsServiceMock')
  //       .then( service => this.setState({ldsService: service }))
  //   } else {
  //     import('../services/LdsServiceImpl')
  //       .then( service => this.setState({ldsService: service }))
  //   }
  // }

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
