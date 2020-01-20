import { del, get, post } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'


class NotebookServiceImpl {

  // Using a custom header (X-Authorization) to pass the access token that should be used to get access to
  // the external notebook service.
  // (The standard Authorization header is automatically set by the platform, and is used for communication between internal services).
  // If the backend is mocked and the application calls a local Zeppelin instance directly, skip the custom X-Authorization header
  getHeaders = (user) => {
    console.log(user, 'user i getHeaders i NotebookService')
    return undefined
    //TODO: use headers. When collecting from mockserver, header has to be undefined (or something mockserver accepts)
    // return Properties.mock.backend === true ?
    //   undefined :
    //   new Headers({
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-Authorization': 'Bearer ' + user.access_token
    // })
  }

  getLDSInstance = (user) => {
    const lds = user.userPrefs.preferences.lds
    return lds ? "?lds=" + lds : ""
  }

  getNotes = (user) => {
    console.log('getNotes')
    console.log(Properties.api.notebookService + 'notebook' + this.getLDSInstance(user))
    console.log(this.getHeaders(user), 'header i getNotes')
    return new Promise((resolve, reject) => {

      // TODO get only notes available for given user
      get(Properties.api.notebookService + 'notebook' + this.getLDSInstance(user), this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  getNote = (id, user) => {
    console.log('getNote')
    console.log(Properties.api.notebookService + 'notebook/' + id + this.getLDSInstance(user))
    console.log(this.getHeaders(user), 'header i getNote')
    return new Promise((resolve, reject) => {

      get(Properties.api.notebookService + 'notebook/' + id + this.getLDSInstance(user), this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  postNote = (body, user, autostart = false) => {
    console.log('postNote')
    console.log(Properties.api.notebookService + 'notebook' + this.getLDSInstance(user))
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook' + this.getLDSInstance(user),
        JSON.stringify(body), this.getHeaders(user))
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
    console.log('startJobs')
    console.log(Properties.api.notebookService + 'notebook/job/' + id + this.getLDSInstance(user))
    return new Promise((resolve, reject) => {
      post(Properties.api.notebookService + 'notebook/job/' + id + this.getLDSInstance(user),
        null, this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  runParagraphSync = (noteId, paragraphId, user) => {
    console.log('run paragraph sync')
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook/run/' + noteId + '/' + paragraphId + this.getLDSInstance(user),
        null, this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  postParagraph = (id, body, user) => {
    console.log('post paragraph')
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook/' + id + '/paragraph' + this.getLDSInstance(user),
        JSON.stringify(body), this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  getParagraph = (noteId, paragraphId, user) => {
    console.log('get paragraph ')
    return new Promise( (resolve, reject ) => {

      get(Properties.api.notebookService + 'notebook/' + noteId + '/paragraph/' + paragraphId + this.getLDSInstance(user),
        this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  stopParagraph = (noteId, paragraphId, user) => {
    console.log('stop paragraph')
    return new Promise( (resolve, reject ) => {

      del(Properties.api.notebookService + 'notebook/' + noteId + '/paragraph/' + paragraphId + this.getLDSInstance(user),
        this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  deleteNote = (id, user) => {
    console.log('delete log')
    return new Promise((resolve, reject) => {

      del(Properties.api.notebookService + 'notebook/' + id + this.getLDSInstance(user), this.getHeaders(user))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}

export default NotebookServiceImpl