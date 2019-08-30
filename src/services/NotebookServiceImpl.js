import { deleteData, get, post } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'

class NotebookServiceImpl {

  // Using a custom header (X-Authorization) to pass the access token that should be used to get access to
  // the external notebook service.
  // (The standard Authorization header is automatically set by the platform, and is used for communication between internal services).
  getHeaders = (user) => {
    return new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Authorization': 'Bearer ' + user.user.access_token
    })
  }

  getNotes = (user) => {
    return new Promise((resolve, reject) => {

      // TODO get only notes available for given user
      get(Properties.api.notebookService + 'notebook', this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  getNote = (id, user) => {
    return new Promise((resolve, reject) => {

      get(Properties.api.notebookService + 'notebook/' + id, this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  postNote = (body, user) => {
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook', this.getHeaders(user), JSON.stringify(body))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  postParagraph = (id, body, user) => {
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook/' + id + '/paragraph', this.getHeaders(user), JSON.stringify(body))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  deleteNote = (id, user) => {
    return new Promise((resolve, reject) => {

      deleteData(Properties.api.notebookService + 'notebook/' + id, this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}

export default NotebookServiceImpl