import _ from 'lodash'

class NotebookTree {

  constructor (notes, callbacks = {}) {
    this.notes = notes
    this.callbacks = callbacks
    this.notebookTree = []
    this.notes.body.forEach(element => {
      this.addElement(element)
    })
    this.sortTree()
  }

  get folders () {
    // Returns a set of unique folder names
    return [...new Set(this.notes.body.map(element => element.name)
      .filter(name => name.includes('/'))
      .map(this.trimLeadingBackslash)
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

  get tree () {
    return this.notebookTree
  }

  trimLeadingBackslash = (name) => {
    if (name.indexOf('/') === 0) {
      return name.substr(1)
    } else {
      return name
    }
  }

  addElement = (element) => {
    const folders = element.name.split('/').filter(element => element !== '')
    const note = folders.pop()
    this.addToTree(folders, note, element, this.notebookTree)
  }

  addToTree = (folders, notebook, element, tree) => {
    if (folders.length > 0) {
      const node = {
        name: folders[0],
        toggled: false,
        children: [],
        hover: false
      }

      folders.shift()

      const existingFolder = tree.filter(
        element => element.name === node.name && element.children)

      if (existingFolder.length === 0) {
        tree.push(node)
        this.addToTree(folders, notebook, element, node.children)
      } else {
        this.addToTree(folders, notebook, element, existingFolder[0].children)
      }
    } else {
      tree.push({
        name: notebook,
        id: element.id,
        toggled: false,
        hover: true,
        noteurl: element.noteurl,
        ...this.callbacks
      })
    }
  }

  removeElement = (id) => {
    let element = this.findElement(e => e.id === id)
    if (element) {
      _.remove(element.parent.children, e => e.id === id)
      // Remove empty parent folders (by name since folders doesn' have ID)
      while (element.parent && element.parent.parent) {
        const parentFolder = element.parent
        if (parentFolder.children.length === 0) {
          _.remove(parentFolder.parent.children, e => e.name === parentFolder.name)
        }
        element = element.parent
      }
    }
  }


  // Find element in tree and add parent backreferences
  findElement = (predicate) => {
    const stack = [ ...this.tree ].map(e => {
      e.parent = {children: this.tree}
      return e
    })
    while (stack.length) {
      const node = stack.pop()
      if (predicate(node)) {
        return node
      } else if (node.children) {
        const children = node.children.map(e => {
          e.parent = node
          return e
        })
        stack.push(...children)
      }
    }
    return null
  }

  sortTree = () => {
    sortTree(this.notebookTree)
  }

}

const sortTree = (tree) => {
  tree.sort(compareNoteNode)
  tree.filter(node => node.children).forEach(node => sortTree(node.children))
}

/**
 * Comparator for Notes and Folders. Sort by name, but Folders will sort before Notes.
 * The folder with the name ~Trash will always be sorted last
 * @param a element to compare
 * @param b element to compare
 */
const compareNoteNode = (a, b) => {
  if (a.name === '~Trash') {return 1} // Trash will always be at the bottom
  if (
    (a.children === undefined && b.children === undefined) || // Neither is a folder
    (a.children !== undefined && b.children !== undefined) // Both are folders
  // Neither is a folder
  ) {
    if (a.name.toUpperCase() > b.name.toUpperCase()) { return 1 } else { return -1}
  }
  if (a.children !== undefined && b.children === undefined) { return -1}
  if (a.children === undefined && b.children !== undefined) { return 1}
}

export default NotebookTree