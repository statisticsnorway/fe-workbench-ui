class NotebookTree {

  constructor (notes) {
    this.notes = notes
  }

  get folders () {
    // Returns a set of unique folder names
    return [...new Set(this.notes.body.map(element => element.name)
      .filter(name => name.includes('/'))
      .map(name => name.substr(0, name.lastIndexOf('/')))
      .sort())]
  }

  get files () {
    return this.notes.body.sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1
      } else {
        return -1
      }
    })
  }

  //TODO: Implement the following method by extracting code from NotebookAdmin.loadNotes() so that this code is reusable.
  //get tree () {}

}

export default NotebookTree