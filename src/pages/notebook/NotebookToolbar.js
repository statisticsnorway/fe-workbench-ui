import React, { Component } from 'react'
import { Button, Divider, Dropdown, Icon, Input, Label, Message, Popup } from 'semantic-ui-react'
import { NOTEBOOK_TOOLBAR } from '../../utilities/enum/NOTEBOOK_TOOLBAR'

import { WorkbenchContext } from '../../context/ContextProvider'
import NotebookTree from './NotebookTree'

const FolderToOptionsMapper = (folderName, index) => {
  let name = '/' + folderName + '/'
  return { key: index, text: name, value: name}
}

const RootFolderOption = {key: '/', text: '', value: ''}

const FileToOptionsMapper = (file) => {
  return { key: file.id, text: file.name, value: file.id}
}

class NotebookToolbar extends Component {
  static contextType = WorkbenchContext

  constructor (props) {
    super(props)
    this.state = {
      dataset: props.dataset,
      selectedNote: undefined,
      selectedFolder: '',
      name: '',
      noteFolders: [],
      existingNotes: [],
      error: false,
      response: false,
      createNote: false,
      updateNote: false
    }
  }

  loadExistingNotes = () => {
    let context = this.context
    const { user } = this.props

    context.notebookService.getNotes(user).then(notes => {
      let notebookTree = new NotebookTree(notes)
      this.setState({
        existingNotes: notebookTree.files.map(FileToOptionsMapper),
        noteFolders: [RootFolderOption].concat(notebookTree.folders.map(FolderToOptionsMapper))
      })
    })
  }

  toggleCreateNote = () => {
    this.setState((prevState) => ({
      createNote: !prevState.createNote,
      updateNote: false
    }))
    this.loadExistingNotes()
  }

  toggleUpdateNote = () => {
    this.setState((prevState) => ({
      updateNote: !prevState.updateNote,
      createNote: false
    }))
    this.loadExistingNotes()
  }

  updateNote = () => {
    const { user } = this.props
    const { selectedNote } = this.state
    let context = this.context
    console.log("Selected note", selectedNote)
    context.notebookService.getNote(selectedNote, user).then(response => {
      // Parse existing paragraphs to find already used variable names
      let existingVariables = response.body.paragraphs
        .filter(p => p.text && p.text.includes('spark.read.format("no.ssb.gsim.spark")'))
        // Map each paragraph
        .map(p => Array.from(p.text.matchAll('val (.*) = spark.read.format\\(\\"no.ssb.gsim.spark\\"\\)'))
          // The first group match (.*) is the variable name
          .map(match => match[1]))
        // Flatten - as there may be more than one variable per paragraph
        .flat().sort()
      let newVar
      if (existingVariables.length > 0) {
        // Assume that variable names are on the form ds1, ds2, etc...
        let lastVar = existingVariables.pop().match('(.*)(\\d)')
        newVar = '' + lastVar[1] + (++lastVar[2])
      } else {
        newVar = 'ds1'
      }
      let datasetname = context.getLocalizedGsimObjectText(this.state.dataset.name)
      let body = {
        title: context.getLocalizedText(NOTEBOOK_TOOLBAR.PARAGRAPH_HEADER),
        text: this.paragraphTemplate(datasetname, newVar, this.state.dataset.id),
        config: {
          title: true,
          editorHide: true
        }
      }
      context.notebookService.postParagraph(selectedNote, body, user).then(response => {
        let responseText = `Note ${selectedNote} updated with dataset ${datasetname}`
        this.setState({
          selectedNote: undefined,
          response: responseText
        })
      }).catch(error => {
        this.setState({
          error: error
        })
      })
    }).catch(error => {
      this.setState({
        error: error
      })
    })
  }


  createNote = () => {
    const { user } = this.props
    const { name, selectedFolder } = this.state
    let context = this.context
    let note = { name: selectedFolder + name }
    let datasetname = context.getLocalizedGsimObjectText(this.state.dataset.name)
    note.paragraphs = [{
      title: context.getLocalizedText(NOTEBOOK_TOOLBAR.PARAGRAPH_HEADER),
      text: this.paragraphTemplate(datasetname, 'ds1', this.state.dataset.id),
      config: {
        title: true,
        editorHide: true
      }
    }]
    context.notebookService.postNote(note, user, true).then(response => {
      let responseText = `Note with id ${response.body} (${name}) created with initial dataset ${datasetname}`
      this.setState({
        name: '',
        response: responseText
      })
    }).catch(error => {
      this.setState({
        error: error
      })
    })
  }

  paragraphTemplate = (tableName, variableName, url) => (
    `print("%html Henter tabellen <strong>${tableName}</strong>. Alias for denne tabellen er <i>${variableName}</i>")\n`
    + `val ${variableName} = spark.read.format("no.ssb.gsim.spark").load("lds+gsim://${url}")\n`
    + `println("<pre>")\n${variableName}.printSchema()\nprintln("</pre>")`)

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render () {
    const { createNote, updateNote, noteFolders, name, existingNotes, selectedNote, selectedFolder, response, error } = this.state
    let context = this.context
    return (
      <>
        <div>
          <Popup flowing hoverable position='top left'
                 content={context.getLocalizedText(NOTEBOOK_TOOLBAR.CREATE_NOTE_TOOLTIP)} trigger={
            <Label as='a' basic={!createNote} onClick={this.toggleCreateNote}>
              <Icon.Group size='large'>
                <Icon link color='teal' name='file outline' />
                <Icon color='black' corner name='plus' />
              </Icon.Group>
              {context.getLocalizedText(NOTEBOOK_TOOLBAR.CREATE_NOTE_BUTTON)}
            </Label>
          }/>
          <Popup flowing hoverable position='top left'
                 content={context.getLocalizedText(NOTEBOOK_TOOLBAR.UPDATE_NOTE_TOOLTIP)} trigger={
            <Label as='a' basic={!updateNote} onClick={this.toggleUpdateNote}>
              <Icon.Group size='large'>
                <Icon link color='teal' name='file alternate outline' />
                <Icon color='black' corner name='reply' />
              </Icon.Group>
              {context.getLocalizedText(NOTEBOOK_TOOLBAR.UPDATE_NOTE_BUTTON)}
            </Label>
          }/>
        </div>

        <Divider fitted hidden />

        {createNote && <div>
          <Input label={<Dropdown name='selectedFolder' onChange={this.handleChange}
                          selectOnNavigation={false} options={noteFolders} value={selectedFolder}/>}
            style={{'maxWidth':'350px'}}
            placeholder={context.getLocalizedText(NOTEBOOK_TOOLBAR.CREATE_NOTE_PLACEHOLDER)} name='name'
            value={name} onChange={this.handleChange}/>
          <Button color='teal' onClick={this.createNote}
                  content={context.getLocalizedText(NOTEBOOK_TOOLBAR.CREATE_NOTE_SUBMIT)}/>

          </div>}
        {updateNote && <div>
            <Dropdown name='selectedNote' placeholder={context.getLocalizedText(NOTEBOOK_TOOLBAR.UPDATE_NOTE_PLACEHOLDER)}
                      search selection options={existingNotes} value={selectedNote}
                      selectOnNavigation={false} onChange={this.handleChange}
                      />
            <Button color='teal' onClick={this.updateNote}
                    content={context.getLocalizedText(NOTEBOOK_TOOLBAR.UPDATE_NOTE_SUBMIT)}/>
          </div>}

        {response && <Message positive icon='check' content={response}
                              onClick={() => this.setState({'response': false})}/>}
        {error && <Message negative icon='warning' header='Error' content={error}
                           onClick={() => this.setState({'error': false})}/>}
      </>
    )
  }
}

export default NotebookToolbar
