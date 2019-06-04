import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-table/react-table.css'

import App from './App'
import { ContextProvider } from './context/ContextProvider'

let ldsURL = process.env.REACT_APP_LDS

const properties = {
  ldsURL: ldsURL
}

ReactDOM.render(
  <HashRouter>
    <ContextProvider>
      <App {...properties} />
    </ContextProvider>
  </HashRouter>,
  document.getElementById('root')
)
