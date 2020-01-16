import Properties from '../../properties/properties'
import { methodfetch } from './Fetch'


export const get = (url, mockparam, mockresult, headers) => {
  console.log(url, 'url')
  console.log(mockparam,'mockparam')
  console.log(Properties.mock[mockparam], 'skal mockes')
  return new Promise((resolve) => {
    resolve(Properties.mock[mockparam] === true ? mockresult : methodfetch( 'GET', url, headers))
  })
}

export const post = (url, mockparam, mockresult, body, headers) => {
  return new Promise((resolve) => {
    resolve(Properties.mock[mockparam] === true ? mockresult : methodfetch( 'POST', url, headers, body))
  })
}

export const put = (url, mockparam, mockresult, body, headers) => {
  return new Promise((resolve) => {
    resolve(Properties.mock[mockparam] === true ? mockresult : methodfetch( 'PUT', url, headers, body))
  })
}

export const del = (url, mockparam, mockresult, headers) => {
  return new Promise((resolve) => {
    resolve(Properties.mock[mockparam] === true ? mockresult : methodfetch( 'DELETE', url, headers))
  })
}

