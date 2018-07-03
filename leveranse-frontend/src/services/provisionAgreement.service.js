import axios from 'axios'

export const provisionAgreementService = {
  create
}

function create(provisionAgreement) {
  let url = process.env.REACT_APP_BACKENDHOST + "ProvisionAgreement/" + provisionAgreement.id
  return axios.put(url, provisionAgreement, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(handleResponse)
}

function handleResponse(response) {
  if (response.status !== 200) {
    return Promise.reject(response.statusText)
  }
  return response.data
}