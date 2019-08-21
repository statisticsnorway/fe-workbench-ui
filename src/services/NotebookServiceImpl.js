import { deleteData, get, post } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'

class NotebookServiceImpl {

  getNotebooks = () => {
    return new Promise((resolve, reject) => {

      // TODO get only notebooks available for given user
      get(Properties.api.notebookService + 'notebook')
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  getNotebook = (id) => {
    return new Promise((resolve, reject) => {

      get(Properties.api.notebookService + 'notebook/' + id)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  postNotebook = (body) => {
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

  deleteNotebook = (id) => {
    return new Promise((resolve, reject) => {

      deleteData(Properties.api.notebookService + 'notebook/' + id)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}

export default NotebookServiceImpl