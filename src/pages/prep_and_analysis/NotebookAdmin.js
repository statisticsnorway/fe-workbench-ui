import React, { Component } from 'react'
import { Header, Icon, Label } from 'semantic-ui-react'
import { WorkbenchContext } from '../../context/ContextProvider'
import _ from 'lodash'
import {Treebeard} from 'react-treebeard';
import { UI } from '../../utilities/enum'

class NotebookAdmin extends Component {
  static contextType = WorkbenchContext

  state = {
    notebookTree: null,
    error: false
  }

  componentDidMount () {
    let context = this.context

    context.notebookService.getNotebooks()
      .then(notebooks =>
        this.parseNotebooks(notebooks))
      .catch( error => {
        console.error('Error contacting Notebook', error)
        this.setState({
          error: true,
          errorMsg: error
        })
      })
  }

  onToggle = (node, toggled) => {
    const {cursor, notebookTree} = this.state;
    if (cursor) {
      cursor.active = false
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState(() => ({cursor: node, notebookTree: Object.assign({}, notebookTree)}));
  }

  parseNotebooks = (notebooks) => {

    let tree = {
      name: 'Notes',
      toggled: true,
      children: []
    }

    function addToTree (folders, name, id, children) {
      if (folders.length > 0) {
        let node = {
          name: folders[0],
          toggled: false,
          children: []
        }
        folders.shift()
        let existingFolder = children.filter(el => el.name === node.name && el.children)
        if (existingFolder.length === 0) {
          children.push(node)
          addToTree(folders, name, id, node.children)
        } else {
          addToTree(folders, name, id, existingFolder[0].children)
        }
      } else {
        children.push({
          name: name,
          id: id,
          toggled: false
        })
      }
    }

    notebooks.forEach(element => {
      let folders = _.split(element.name, '/')
      let name = folders.pop()
      addToTree(folders, name, element.id, tree.children)
    })

    this.setState({
      notebookTree: tree
    })
  }

  // layout, use tree layout
  // top menu item for creating new notebook
  // each notebook element must have icons for edit, delete and open
  // for each notebook, check if subfolder
    // if subfolder, check if exists
      // if exists, place notebook in folder
      // if not, create folder and place notebook
    // if not subfolder, place in root


  render () {
    const { notebookTree, error, errorMsg } = this.state
    const context = this.context
    return (
      <>
        <Header as='h1'>{UI.NOTEBOOK_NOTES[context.languageCode]}</Header>
        {notebookTree && <Treebeard
          data={notebookTree}
          onToggle={this.onToggle} />}
        {error &&
          <Label color='red'>
            <Icon name='times circle outline'/>{`${UI.NOTEBOOK_ERROR[context.languageCode]}`} {`${errorMsg}`}
          </Label> }
      </>
    )
  }
}

export default NotebookAdmin