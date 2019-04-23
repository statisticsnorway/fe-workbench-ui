import React, { Component } from 'react'

export const WorkbenchContext = React.createContext({
  languageCode: 'nb',
  setLanguage: (language) => {
    this.setState({ languageCode: language })
  }
})

export class ContextProvider extends Component {
  state = {
    languageCode: 'nb',
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
          setLanguage: this.state.setLanguage
        }}>
        {children}
      </WorkbenchContext.Provider>
    )
  }
}
