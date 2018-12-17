import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import 'semantic-ui-css/semantic.min.css'
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.css'

let lds

if (process.env.REACT_APP_LDS === undefined) {
  lds = 'http://localhost:9090/'
} else {
  lds = process.env.REACT_APP_LDS

  if (!lds.endsWith('/')) {
    lds = process.env.REACT_APP_LDS + '/'
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App lds={lds} />
  </BrowserRouter>,
  document.getElementById('root')
)
