import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-table-6/react-table.css'

import App from './App'
import { ContextProvider } from './context/ContextProvider'
import Properties from './properties/properties'

const properties = {
  ldsURL: Properties.api.lds
}

ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <App {...properties} />
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
