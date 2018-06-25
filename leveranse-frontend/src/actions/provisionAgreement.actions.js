import {provisionAgreementConstants} from '../constants'
import {provisionAgreementService} from '../services'
import {alertActions} from './'

export const provisionAgreementActions = {
  create
}

function create(provisionAgreement) {
  return dispatch => {
    dispatch(request(provisionAgreement))
    provisionAgreementService.create(provisionAgreement)
      .then(
        () => {
          dispatch(success(provisionAgreement.id))
          dispatch(alertActions.success('Creation successful'))
          setTimeout(() => {
            dispatch(alertActions.clear())
          }, 3000)
        },
        error => {
          dispatch(failure(error.message))
          dispatch(alertActions.error(error.message))
        }
      )
  }

  function request(provisionAgreement) {
    return {type: provisionAgreementConstants.CREATE_REQUEST, provisionAgreement}
  }

  function success(provisionAgreementId) {
    return {type: provisionAgreementConstants.CREATE_SUCCESS, provisionAgreementId}
  }

  function failure(error) {
    return {type: provisionAgreementConstants.CREATE_FAILURE, error}
  }
}
