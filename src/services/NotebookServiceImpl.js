import { deleteData, get, post } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'

class NotebookServiceImpl {

  getHeaders = (user) => {
    return new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.user.access_token
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