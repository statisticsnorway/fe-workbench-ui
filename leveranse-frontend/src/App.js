import React from 'react'
import { Route } from 'react-router-dom'
import WelcomePage from './components/pages/WelcomePage'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import 'moment/locale/nb'

const App = () => (
  <div className='ui container'>
    <Route path='/' exact component={WelcomePage} />
    <Route path='/login' exact component={LoginPage} />
    <Route path='/home' exact component={HomePage} />
  </div>
)

export default App
