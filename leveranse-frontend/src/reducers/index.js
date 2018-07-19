import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { alert } from './alert.reducer'
import { createdPA } from "./provisionAgreement.reducer";

const rootReducer = combineReducers({
  authentication,
  alert,
  createdPA
})

export default rootReducer