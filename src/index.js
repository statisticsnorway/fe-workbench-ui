import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-table/react-table.css'

import App from './App'

let ldsURL = window._env_.REACT_APP_LDS

const properties = {
  ldsURL: ldsURL
}

ReactDOM.render(
  <HashRouter>
    <App {...properties} />
  </HashRouter>,
  document.getElementById('root')
)
