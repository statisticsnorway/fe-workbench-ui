import React, { Component } from 'react'
import { Treebeard } from 'react-treebeard'
import { Divider, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
import { WorkbenchContext } from '../../context/ContextProvider'
import Note from './note/Note'
import CreateNote from './note/CreateNote'

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

const decorator = {
  Toggle: (props) => {
    return (<div/>) // Do not display any arrows
  },
  Header: (props) => {
    return (
      props.node.name === '~Trash' ?
        <><Icon name='trash alternate' />Trash</> :
        <><Icon name='folder' />{props.node.name}</>
    );
  }
};

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

  loadNotes = () => {
    let context = this.context
    const { user } = this.props

    context.notebookService.getNotes(user).then(notes => {
      const notebookTree = []

      function addToTree (folders, notebook, id, children) {
        if (folders.length > 0) {
          const node = {
            name: folders[0],
            toggled: false,
            children: [],
            decorators: decorator
          }

          folders.shift()

          const existingFolder = children.filter(
            element => element.name === node.name && element.children)

          if (existingFolder.length === 0) {
            children.push(node)
            addToTree(folders, notebook, id, node.children)
          } else {
            addToTree(folders, notebook, id, existingFolder[0].children)
          }
        } else {
          children.push({
            name: notebook,
            id: id,
            toggled: false
          })
        }
      }

      notes.body.forEach(element => {
        const folders = element.name.split('/').filter(element => element !== '')
        const notes = folders.pop()

        addToTree(folders, notes, element.id, notebookTree)
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
      activeNote: node.hasOwnProperty('id') ? node.id : null
    }))
  }

  render () {
    const { activeNote, error, notebookTree, ready } = this.state
    const { user } = this.props

    return (
      <Segment basic loading={!ready}>
        {ready && error && <Message negative icon='warning' header='Error' content={error} />}
        {ready && !error &&
        <>
          <Header as='h1' dividing icon={{ name: 'book', color: 'teal' }}
                  content='Notes' subheader='Notes from Zeppelin you have access to' />

          <Grid>
            <Grid.Column width={5}>
              <CreateNote loadNotes={this.loadNotes} />

              <Divider hidden />

              <Icon link name='sync' color='blue' onClick={this.loadNotes} />

              <Treebeard data={notebookTree} onToggle={this.notebookTreeOnToggle} style={treebeardStyle} />
            </Grid.Column>
            <Grid.Column width={8}>{activeNote && <Note id={activeNote} user={user} loadNotes={this.loadNotes} />}</Grid.Column>
          </Grid>
        </>
        }
      </Segment>
    )
  }
}

export default NotebookAdmin