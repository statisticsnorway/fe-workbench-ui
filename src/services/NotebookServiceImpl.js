import { deleteData, get, post } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'

class NotebookServiceImpl {

  getNotes = () => {
    return new Promise((resolve, reject) => {

      // TODO get only notes available for given user
      get(Properties.api.notebookService + 'notebook')
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  getNote = (id) => {
    return new Promise((resolve, reject) => {

      get(Properties.api.notebookService + 'notebook/' + id)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  postNote = (body) => {
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook', JSON.stringify(body))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  postParagraph = (id, body) => {
    return new Promise((resolve, reject) => {

      post(Properties.api.notebookService + 'notebook/' + id + '/paragraph', JSON.stringify(body))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  deleteNote = (id) => {
    return new Promise((resolve, reject) => {

      deleteData(Properties.api.notebookService + 'notebook/' + id)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}

export default NotebookServiceImpl