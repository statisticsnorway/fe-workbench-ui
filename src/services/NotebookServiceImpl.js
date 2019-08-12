import { get } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'

class NotebookServiceImpl {

  getNotebooks = () => {
    return new Promise((resolve, reject) => {

      // TODO get only notebooks available for given user
      get(Properties.api.notebookService + 'notebook')
        .then(response => resolve(response.body))
        .catch(error => reject(error))
    })
  }
}

export default NotebookServiceImpl