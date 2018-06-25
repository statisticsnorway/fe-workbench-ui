import {provisionAgreementConstants} from '../constants'

export function createdPA(state = {}, action) {
  switch (action.type) {
    case provisionAgreementConstants.CREATE_REQUEST:
      return {creating: true}
    case provisionAgreementConstants.CREATE_SUCCESS:
      return {id: action.provisionAgreementId}
    case provisionAgreementConstants.CREATE_FAILURE:
      return {}
    default:
      return state
  }
}