import Notebooks from '../__tests__/test-data/Notebooks'

class NotebookServiceMock {

  getNotebooks() {
    // TODO get only notebooks available for given user
    console.info( '(MOCK) getting all notebooks')
    return Promise.resolve(Notebooks.body)
  }
}

export default NotebookServiceMock