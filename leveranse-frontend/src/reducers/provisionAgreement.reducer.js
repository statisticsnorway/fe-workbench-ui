import {provisionAgreementConstants} from '../constants'

const provisionAgreementDefaultState = {};
export function createdPA(state = provisionAgreementDefaultState, action) {
  switch (action.type) {
    case provisionAgreementConstants.CREATE_REQUEST:
      return {creating: true}
    case provisionAgreementConstants.CREATE_SUCCESS:
      return {id: action.provisionAgreementId}
    case provisionAgreementConstants.CREATE_FAILURE:
      return {}
    case provisionAgreementConstants.RESET:
      return provisionAgreementDefaultState;
    default:
      return state
  }
}