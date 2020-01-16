import Notes from '../__tests__/test-data/Notes'
import Note from '../__tests__/test-data/Note'
import Paragraph from '../__tests__/test-data/Paragraph'

class NotebookServiceMock {

  getNotes() {
    // TODO get only notes available for given user
    console.info( '(MOCK) getting all notes')
    console.log(Notes)
    return Promise.resolve(Notes)
  }

  getNote(id) {
    console.info('(MOCK) getting note ' + id)
    return Promise.resolve(Note)
  }

  postNote(body) {
    console.info('(MOCK) post note ' + body)
    return Promise.resolve({
      body: 'testId',
      noteurl: 'testUrl'
    })
  }

  startJobs(id) {
    console.info('(MOCK) starting job for note ' + id)
    return Promise.resolve(200)
  }

  runParagraphSync(id) {
    console.info( '(MOCK) running paragraph with id ' + id)
    return Promise.resolve({
      status: 'OK',
      body: 200
    })
  }

  getParagraph(id) {
    console.log('(MOCK) get paragraph with id ' + id)
    return Promise.resolve( {
      status: 'OK',
      body: Paragraph})
  }


}

export default NotebookServiceMock