import Notes from '../__tests__/test-data/Notes'

class NotebookServiceMock {

  getNotes() {
    // TODO get only notes available for given user
    console.info( '(MOCK) getting all notes')
    return Promise.resolve(Notes)
  }
}

export default NotebookServiceMock