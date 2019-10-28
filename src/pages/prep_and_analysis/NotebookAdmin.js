import React, { Component } from 'react'
import { decorators, Treebeard } from 'react-treebeard'
import { Confirm, Divider, Grid, Header as UiHeader, Icon, Message, Segment } from 'semantic-ui-react'
import { WorkbenchContext } from '../../context/ContextProvider'
import Note from './note/Note'
import CreateNote from './note/CreateNote'
import Header from "./note/TreeBeardNodeHeader"
import { UI } from "../../utilities/enum/UI"
import NotebookTree from '../notebook/NotebookTree'

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
    notebookTreeStructure: null,
    ready: false
  }

  componentDidMount () {
    this.loadNotes()
  }

  loadNotes = () => {
    let context = this.context
    const user = context.user
    const self = this

    context.notebookService.getNotes(user).then(notes => {
      this.notebookTree = new NotebookTree(notes, {
        deleteCallback: (note) => self.setState({showConfirm: true, noteToDelete: note})
      })

      this.setState({
        notebookTreeStructure: this.notebookTree.tree,
        ready: true
      })
    }).catch(error => {
      this.setState({
        error: error.text,
        ready: true
      })
    })
  }

  noteCreated = (note) => {
    this.notebookTree.addElement(note)
    this.notebookTree.sortTree()
    const element = this.notebookTree.findElement(e => e.id === note.id)
    // Set selected node
    this.notebookTreeOnToggle(element, true)
    // Expand all parent folders
    let e = element.parent
    while (e) {
      e.toggled = true
      e = e.parent
    }
    this.setState({
      notebookTreeStructure: this.notebookTree.tree,
    })
  }

  noteDeleted = (noteId) => {
    this.notebookTree.removeElement(noteId)
    this.setState({
      notebookTreeStructure: this.notebookTree.tree,
    })
  }

  notebookTreeOnToggle = (node, toggled) => {
    const { cursor, notebookTreeStructure } = this.state

    if (cursor) {
      cursor.active = false
    }

    node.active = true

    if (node.children) {
      node.toggled = toggled
    }

    this.setState(({
      cursor: node,
      notebookTreeStructure: Object.assign([], notebookTreeStructure),
      activeNote: node.hasOwnProperty('id') ? node.id : null,
    }))
  }

  createNote = (note, withDataset) => {
    let context = this.context
    const user = context.user

    context.notebookService.postNote(note, user, withDataset).then(response => {
      let responseText = !withDataset ? context.getLocalizedText(UI.NOTE_CREATED, response.body, note.name)
        : context.getLocalizedText(UI.NOTE_CREATE_WITH_DATASET, response.body, note.name)
      this.setState({
        message: responseText,
      }, () => {
        this.noteCreated({name: note.name, id: response.body, noteurl: response.noteurl})
      })
    }).catch(error => {
      this.setState({
        error: true,
        message: error.text
      })
    })
  }

  deleteNote = () => {
    this.setState({
      showConfirm: false
    }, () => {
      const user = this.context.user
      const { noteToDelete } = this.state

      let context = this.context

      context.notebookService.deleteNote(noteToDelete.id, user).then(() => {
        this.setState({
          message: `${noteToDelete.name} ${context.getLocalizedText(UI.NOTE_DELETED)}`
        })
        this.noteDeleted(noteToDelete.id)
      }).catch(error => {
        this.setState({
          error: true,
          message: `${context.getLocalizedText(UI.NOTE_DELETED_ERROR)} ${error.text})`
        })
      })
    })
  }

  render () {
    const { activeNote, error, notebookTreeStructure, ready, showConfirm, message, noteToDelete } = this.state
    const context = this.context
    const user = context.user

    return (
      <Segment basic loading={!ready}>
        {ready && message &&
        <Message floating onDismiss={() => this.setState({error: false, message: null})} positive={!error} negative={error} icon={error ? 'warning' : 'check'} content={message}/>}
        {ready &&
        <>
          {/*TODO The header text should not be static. Get from LDS (StatisticalProgram?) */}
          <UiHeader as='h1' dividing icon={{ name: 'book', color: 'teal' }}
                    content={context.getLocalizedText(UI.NOTEBOOK_ADMIN_HEADER)} subheader={context.getLocalizedText(UI.NOTEBOOK_ADMIN_SUB_HEADER)} />

          <Grid>
            <Grid.Column width={4}>
              <CreateNote createNote={this.createNote} user={user}/>

              <Divider hidden />

              <Icon link name='sync' color='blue' onClick={this.loadNotes} />

              <Treebeard data={notebookTreeStructure} onToggle={this.notebookTreeOnToggle} style={treebeardStyle}
                decorators={{ ...decorators, Toggle, Header }}/>
            </Grid.Column>
            <Grid.Column width={12}>{activeNote && <Note id={activeNote} user={user} loadNotes={this.loadNotes} />}</Grid.Column>
          </Grid>
          {noteToDelete &&
          <Confirm open={showConfirm} onCancel={() => this.setState({showConfirm: false})} onConfirm={this.deleteNote}
                   header={context.getLocalizedText(UI.NOTE_DELETE_DIALOG_HEADER)}
                   content={context.getLocalizedText(UI.NOTE_DELETE_DIALOG_CONTENT, noteToDelete.name, noteToDelete.id)}
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