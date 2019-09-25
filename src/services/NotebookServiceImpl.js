import { del, get, post } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'


class NotebookServiceImpl {

  // Using a custom header (X-Authorization) to pass the access token that should be used to get access to
  // the external notebook service.
  // (The standard Authorization header is automatically set by the platform, and is used for communication between internal services).
  // If the backend is mocked and the application calls a local Zeppelin instance directly, skip the custom X-Authorization header
  getHeaders = (user) => {
    return Properties.mock.backend === true ?
      new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    } ) :
      new Headers({
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

  postNote = (body, user, autostart = false) => {
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook', JSON.stringify(body), this.getHeaders(user))
        .then(response => {
          if (autostart) {
            this.startJobs(response.body, user)
          }
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }

  startJobs = (id, user) => {
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook/job/' + id, null, this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  runParagraphSync = (noteId, paragraphId, user) => {
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook/run/' + noteId + '/' + paragraphId, null, this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  postParagraph = (id, body, user) => {
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook/' + id + '/paragraph', JSON.stringify(body), this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  getParagraph = (noteId, paragraphId, user) => {
    return new Promise( (resolve, reject ) => {

      get(Properties.api.notebookService + 'notebook/' + noteId + '/paragraph/' + paragraphId, this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  stopParagraph = (noteId, paragraphId, user) => {
    return new Promise( (resolve, reject ) => {

      del(Properties.api.notebookService + 'notebook/' + noteId + '/paragraph/' + paragraphId, this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  deleteNote = (id, user) => {
    return new Promise((resolve, reject) => {

      del(Properties.api.notebookService + 'notebook/' + id, this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}

export default NotebookServiceImpl