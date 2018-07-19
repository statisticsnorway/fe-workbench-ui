import {userConstants} from '../constants'


const initialState = {loggedIn: true}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      }
    case userConstants.LOGIN_FAILURE:
      return {}
    default:
      return state
  }
}