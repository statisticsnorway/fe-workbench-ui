const credentials = process.env.NODE_ENV === 'production' ? 'include' : 'same-origin'
const defaultHeaders = { 'Content-Type': 'application/json; charset=utf-8'}

export const get = (url, headers) => {
  return new Promise((resolve) => {
    resolve(methodfetch('GET', url, headers ))
  })
}

export const post = (url, body, headers) => {
  return new Promise((resolve) => {
    methodfetch('POST', url, headers, body )
  })
}

export const put = (url, body, headers) => {
  return new Promise((resolve) => {
    methodfetch('PUT', url, headers, body )
  })
}

export const del = (url, headers) => {
  return new Promise((resolve) => {
    methodfetch('DELETE', url, headers )
  })
}

export const methodfetch = (method, url, headers, body)  => {
  console.log('methodfetch: ' + method + ' ' + url + ' - headers:' + headers)
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: credentials,
      method: method,
      headers: headers ,
      body: body
    }).then(response => {
      handleResponse(response, resolve, reject)
    }).catch(error => reject(`${error} (${url})`))
  })
}

const handleResponse  = (response, resolve, reject) => {
  console.log(response)
  if (response.ok) {
    console.log("Reponse", response.status)
    response.json().then(json => resolve(json))
  } else if (response.status === 404) {
    resolve([])
  } else {
    response.text().then(text => reject({text: text, status:response.status}))
  }
}
