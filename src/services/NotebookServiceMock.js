import Notes from '../__tests__/test-data/Notes'
import Note from '../__tests__/test-data/Note'

class NotebookServiceMock {

  getNotes() {
    // TODO get only notes available for given user
    console.info( '(MOCK) getting all notes')
    return Promise.resolve(Notes)
  }

  getNote(id) {
    console.info('(MOCK) getting note ' + id)
    return Promise.resolve(Note)
  }

  startJobs(id) {
    console.info('(MOCK) starting job for note ' + id)
    return Promise.resolve(200)
  }

  runParagraphSync(id) {
    console.info( '(MOCK) running paragraph with id ' + id)
    return Promise.resolve(200)
  }
}

export default NotebookServiceMock