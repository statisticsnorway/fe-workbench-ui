import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-table/react-table.css'

import App from './App'
import { ContextProvider } from './context/ContextProvider'
import Properties from './properties/properties'

const properties = {
  ldsURL: Properties.api.lds
}

ReactDOM.render(
  <HashRouter>
    <ContextProvider>
      <App {...properties} />
    </ContextProvider>
  </HashRouter>,
  document.getElementById('root')
)
