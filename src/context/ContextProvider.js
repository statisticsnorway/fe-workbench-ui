import _ from 'lodash'
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
import { stringFormat } from "../utilities/common/StringHandling"

const IllegalAccessError = new Error("Accessing context outside of WorkbenchContext")

// Creating default context
export const WorkbenchContext = React.createContext({
  languageCode: 'nb',
  backendService: BackendServiceMock,
  ldsService: LdsServiceMock,
  datasetService: new DatasetServiceMock(),
  notebookService: new NotebookServiceMock(),
  notification: false,
  notificationType: null,
  notificationMessage: null,
  user: null,
  setUser: () => { throw IllegalAccessError },
  updateUserPrefs: () => { throw IllegalAccessError },
  setNotification: () => { throw IllegalAccessError },
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
    notebookService: Properties.mock.notebookService === true ? new NotebookServiceMock(): new NotebookServiceImpl(),
    notification: false,
    notificationType: null,
    notificationMessage: null,
    user: this.props.user
  }

  setUser (ref) {
    return (user) => {
      ref.setState(
        {
          user: user,
          ldsService: Properties.mock.lds === true ? new LdsServiceMock()
            : new LdsServiceImpl(ref.getLdsUrl(_.get(user, 'userPrefs.preferences.lds')))
        })
    }
  }

  updateUserPrefs (ref) {
    return (userPrefs, callback) => {
      if (ref.state.user) {
        this.setState(prevState => ({
          user: {
            ...prevState.user,
            userPrefs: userPrefs
          },
          ldsService: Properties.mock.lds === true ? new LdsServiceMock()
            : new LdsServiceImpl(ref.getLdsUrl(userPrefs.preferences.lds))
        }))
      }
      // TODO could this be used for refreshing current page?
      if (callback) {
        callback()
      }
    }
  }

  getLdsUrl (ldsInstance) {
      switch (ldsInstance) {
        default:
        /* falls through */
        case 'A': return Properties.api.lds
        case 'B': return Properties.api.ldsB
        case 'C': return Properties.api.ldsC
    }
  }

  setLanguage (ref) {
    return (language) => {
      ref.setState({ languageCode: language })
    }
  }

  // Global search replace (regex) \{(.*)\.(.*)\[context\.languageCode\]\}
  // with {context.getLocalizedText($1.$2)}
  getLocalizedText (state) {
    return (key, ...args) => {
        return stringFormat(key[state.languageCode], ...args)
    }
  }

  getLocalizedGsimObjectText (state) {
    return (codeTextObj) => {
      if (codeTextObj === undefined) {
        return null
      } else {
        let text = codeTextObj.find(name => name.languageCode === state.languageCode) || codeTextObj[0]
        return text === undefined ? null : text.languageText
      }
    }
  }

  setNotification(ref) {
    return (notification, notificationType, notificationMessage) => {
      ref.setState({
        notification: notification,
        notificationType: notificationType,
        notificationMessage: notificationMessage
      })
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
          notification: this.state.notification,
          notificationType: this.state.notificationType,
          notificationMessage: this.state.notificationMessage,
          user: this.state.user,
          setUser: this.setUser(this),
          updateUserPrefs: this.updateUserPrefs(this),
          setNotification: this.setNotification(this),
          setLanguage: this.setLanguage(this),
          getLocalizedText: this.getLocalizedText(this.state),
          getLocalizedGsimObjectText: this.getLocalizedGsimObjectText(this.state)
        }}>
        {children}
      </WorkbenchContext.Provider>
    )
  }
}
