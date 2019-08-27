const credentials = process.env.NODE_ENV === 'production' ? 'include' : 'same-origin'
const defaultHeaders = { 'Content-Type': 'application/json; charset=utf-8' }

export const get = (url, headers) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: credentials,
      method: 'GET',
      headers: headers || defaultHeaders,
      mode: 'no-cors',
    }).then(response => {
      handleResponse(response, resolve, reject)
    }).catch(error => reject(`${error} (${url})`))
  })
}

export const post = (url, headers, body) => {
  return new Promise( (resolve, reject) => {
    fetch(url, {
      credentials: credentials,
      method: 'POST',
      headers: headers || defaultHeaders,
      body: body
    }).then(response => {
      handleResponse(response, resolve, reject)
    }).catch(error => reject(`${error} (${url})`))
  })
}

export const put = (url, headers, body) => {
  return new Promise( (resolve, reject) => {
    fetch(url, {
      credentials: credentials,
      method: 'PUT',
      headers: headers || defaultHeaders,
      body: body
    }).then(response => {
      handleResponse(response, resolve, reject)
    }).catch(error => reject(`${error} (${url})`))
  })
}

export const deleteData = (url, headers) => {
  return new Promise( (resolve, reject) => {
    fetch(url, {
      credentials: credentials,
      method: 'DELETE',
      headers: headers || defaultHeaders
    }).then(response => {
      handleResponse(response, resolve, reject)
    }).catch(error => reject(`${error} (${url})`))
  })
}

const handleResponse  = (response, resolve, reject) => {
  if (response.ok) {
    console.log("Reponse", response.status)
    response.json().then(json => resolve(json))
  } else if (response.status === 404) {
    resolve([])
  } else {
    response.text().then(text => reject(text))
  }
}
