import React, { Component } from 'react'
import { decorators, Treebeard } from 'react-treebeard'
import { Confirm, Divider, Grid, Header as UiHeader, Icon, Message, Segment } from 'semantic-ui-react'
import { WorkbenchContext } from '../../context/ContextProvider'
import Note from './note/Note'
import CreateNote from './note/CreateNote'
import Header from "./note/TreeBeardNodeHeader"
import { UI } from "../../utilities/enum/UI"

const treebeardStyle = { // TODO move to css
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: '#fff',
      margin: 0,
      padding: 0,
      color: 'rgba(0,0,0,0.87)',
      fontFamily: 'Lato, Helvetica Neue, Arial, Helvetica,sans-serif',
      fontSize: '14px'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },
      activeLink: {
        background: 'rgba(0, 181, 173, .25)'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: 'rgba(0,0,0,0.87)',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: 'rgba(0,0,0,0.87)'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#00b5ad'
      }
    }
  }
}

const Toggle = () => {
  return (<div/>)
}

class NotebookAdmin extends Component {
  static contextType = WorkbenchContext

  state = {
    activeNote: null,
    error: false,
    notebookTree: null,
    ready: false
  }

  componentDidMount () {
    this.loadNotes()
  }

  reloadNotes = () => {
    this.loadNotes()
  }

  loadNotes = () => {
    let context = this.context
    const { user } = this.props
    const self = this

    context.notebookService.getNotes(user).then(notes => {
      const notebookTree = []

      function addToTree (folders, notebook, element, notebookTree) {
        if (folders.length > 0) {
          const node = {
            name: folders[0],
            toggled: false,
            children: [],
            hover: false
          }

          folders.shift()

          const existingFolder = notebookTree.filter(
            element => element.name === node.name && element.children)

          if (existingFolder.length === 0) {
            notebookTree.push(node)
            addToTree(folders, notebook, element, node.children)
          } else {
            addToTree(folders, notebook, element, existingFolder[0].children)
          }
        } else {
          notebookTree.push({
            name: notebook,
            id: element.id,
            toggled: false,
            hover: true,
            loadNotes: self.reloadNotes,
            user: user,
            noteurl: element.noteurl,
            deleteCallback: (note) => self.setState({showConfirm: true, noteToDelete: note})
          })
        }
      }

      notes.body.forEach(element => {
        const folders = element.name.split('/').filter(element => element !== '')
        const note = folders.pop()

        addToTree(folders, note, element, notebookTree)
      })
      notebookTree.sort(this.compareNoteNode)
      this.setState({
        notebookTree: notebookTree,
        ready: true
      })
    }).catch(error => {
      this.setState({
        error: error,
        ready: true
      })
    })
  }

  /**
   * Comparator for Notes and Folders. Sort by name, but Folders will sort before Notes.
   * The folder with the name ~Trash will always be sorted last
   * @param a element to compare
   * @param b element to compare
   */
  compareNoteNode = (a, b) => {
    if(a.name === '~Trash') {return 1} // Trash will always be at the bottom
    if (
      (a.children === undefined && b.children === undefined) || // Neither is a folder
      (a.children !== undefined && b.children !== undefined) // Both are folders
       // Neither is a folder
    ) {
      if (a.name.toUpperCase() > b.name.toUpperCase()) { return 1 }
      else { return -1}
    }
    if (a.children !== undefined && b.children === undefined) { return -1}
    if (a.children === undefined && b.children !== undefined) { return 1}
  }

  notebookTreeOnToggle = (node, toggled) => {
    const { cursor, notebookTree } = this.state

    if (cursor) {
      cursor.active = false
    }

    node.active = true

    if (node.children) {
      node.toggled = toggled
    }

    this.setState(({
      cursor: node,
      notebookTree: Object.assign([], notebookTree),
      activeNote: node.hasOwnProperty('id') ? node.id : null,
      deleted: false
    }))
  }

  deleteNote = () => {
    this.setState({
      showConfirm: false
    }, () => {
      const { user } = this.props
      const { noteToDelete } = this.state

      let context = this.context

      context.notebookService.deleteNote(noteToDelete.id, user).then(() => {
        this.setState({
          deleted: true,
          message: `${noteToDelete.name} ${UI.NOTE_DELETED[context.languageCode]}`
        })
        this.loadNotes() // TODO remember folder collapsed status
      }).catch(error => {
        this.setState({
          deleted: false,
          error: true,
          message: `${UI.NOTE_DELETED_ERROR[context.languageCode]} ${error})`
        })
      })
    })
  }

  render () {
    const { activeNote, error, notebookTree, ready, showConfirm, deleted, message, noteToDelete } = this.state
    const { user } = this.props
    const context = this.context

    return (
      <Segment basic loading={!ready}>
        {ready && message && deleted &&
          <Message floating onDismiss={() => this.setState({deleted: false})} positive={deleted} negative={!deleted} icon={deleted ? 'check' : 'warning'} content={message}/>}
        {ready && error && <Message negative icon='warning' header='Error' content={message} />}
        {ready && !error &&
        <>
          <UiHeader as='h1' dividing icon={{ name: 'book', color: 'teal' }}
                  content={UI.NOTEBOOK_NOTES[context.languageCode]} subheader={UI.NOTEBOOK_ADMIN_HEADER[context.languageCode]} />

          <Grid>
            <Grid.Column width={5}>
              <CreateNote loadNotes={this.loadNotes} user={user}/>

              <Divider hidden />

              <Icon link name='sync' color='blue' onClick={this.loadNotes} />

              <Treebeard data={notebookTree} onToggle={this.notebookTreeOnToggle} style={treebeardStyle}
                decorators={{ ...decorators, Toggle, Header }}/>
            </Grid.Column>
            <Grid.Column width={8}>{activeNote && <Note id={activeNote} user={user} loadNotes={this.loadNotes} />}</Grid.Column>
          </Grid>
          {noteToDelete &&
          <Confirm open={showConfirm} onCancel={() => this.setState({showConfirm: false})} onConfirm={this.deleteNote}
                   header={UI.NOTE_DELETE_DIALOG_HEADER[context.languageCode]}
                   content={`${UI.NOTE_DELETE_DIALOG_CONTENT[context.languageCode]} '${noteToDelete.name}' (id: ${noteToDelete.id})?`}
                   cancelButton={{
                     color: 'red',
                     content: UI.GENERIC_CANCEL[context.languageCode],
                     icon: 'close',
                     floated: 'left'
                   }}
                   confirmButton={{content: UI.GENERIC_CONFIRM[context.languageCode], icon: 'check'}}/>}
        </>
        }
      </Segment>
    )
  }
}

export default NotebookAdmin