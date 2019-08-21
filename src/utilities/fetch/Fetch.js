const credentials = process.env.NODE_ENV === 'production' ? 'include' : 'same-origin'
const headers = { 'Content-Type': 'application/json; charset=utf-8' }

export const get = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: credentials,
      method: 'GET',
      headers: headers
    }).then(response => {
      handleResponse(response, resolve, reject)
    }).catch(error => reject(`${error} (${url})`))
  })
}

export const post = (url, body) => {
  return new Promise( (resolve, reject) => {
    fetch(url, {
      credentials: credentials,
      method: 'POST',
      headers: headers,
      body: body
    }).then(response => {
      handleResponse(response, resolve, reject)
    }).catch(error => reject(`${error} (${url})`))
  })
}

export const put = (url, body) => {
  return new Promise( (resolve, reject) => {
    fetch(url, {
      credentials: credentials,
      method: 'PUT',
      headers: headers,
      body: body
    }).then(response => {
      handleResponse(response, resolve, reject)
    }).catch(error => reject(`${error} (${url})`))
  })
}

export const deleteData = (url) => {
  return new Promise( (resolve, reject) => {
    fetch(url, {
      credentials: credentials,
      method: 'DELETE',
      headers: headers
    }).then(response => {
      handleResponse(response, resolve, reject)
    }).catch(error => reject(`${error} (${url})`))
  })
}

const handleResponse  = (response, resolve, reject) => {
  if (response.ok) {
    response.json().then(json => resolve(json))
  } else if (response.status === 404) {
    resolve([])
  } else {
    response.text().then(text => reject(text))
  }
}
