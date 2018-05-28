import { USER_LOGGED_IN } from '../types'
import api from '../api'

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
})

//thunk function returning other function.
export const login = (credentials) => (dispatch) =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user))) // this returns promise
