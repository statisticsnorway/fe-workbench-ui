import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { store } from './helpers'
import App from './app/App'
import { AppContainer } from 'react-hot-loader';

const render = () => ReactDOM.render(
  <AppContainer>
  <Provider store={store}>
    <App />
  </Provider>
  </AppContainer>,
  document.getElementById('root')
)

render()

if (module.hot) {
  module.hot.accept('./app/App', () => {
    render();
  });
}
