import {userConstants} from '../constants'
import {history} from '../helpers'

export const userActions = {
  login
}

function login(username, password) {
  return dispatch => {
    dispatch(request({username}))
    dispatch(success(username))
    history.push('/home')
  }

  function request(user) {
    return {type: userConstants.LOGIN_REQUEST, user}
  }

  function success(user) {
    return {type: userConstants.LOGIN_SUCCESS, user}
  }

  /*function failure(error) {
    return {type: userConstants.LOGIN_FAILURE, error}
  }*/
}