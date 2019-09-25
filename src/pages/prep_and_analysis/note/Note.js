import React, { Component } from 'react'
import { Divider, Header, Icon, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../../context/ContextProvider'
import { NOTEBOOK_TOOLBAR as Notes_text } from "../../../utilities/enum/NOTEBOOK_TOOLBAR"
import { NOTIFICATION_TYPE } from "../../../utilities/enum/NOTIFICATION_TYPE"
import { UI } from "../../../utilities/enum/UI"
import NoteParagraph from "./NoteParagraph"

class Note extends Component {
  static contextType = WorkbenchContext

  state = {
    accordionIndex: null,
    note: null,
    ready: false,
    running: false
  }

  componentDidMount () {
    this.props.id ? this.loadNote(this.props.id) : this.setState({ ready: true })
  }

  componentDidUpdate (prevProps) {
    prevProps.id !== this.props.id && this.loadNote(this.props.id)
  }

  loadNote = (id) => {
    const { user } = this.props
    if (id) {
      this.setState({
        notification: false,
        ready: false
      }, () => {
        let context = this.context

        context.notebookService.getNote(id, user).then(note => {
          if (note && note.length !== 0) {
            this.setState({
              note: note.body,
              noteurl: note.noteurl,
              ready: true
            })
          } else { // Note not found
            this.setNotification(context.getLocalizedText(UI.NOTE_NOT_FOUND, id))
            this.setState({ready: true})
          }
        }).catch(error => {
          this.setNotification(error.text)
          this.setState({
            ready: true
          })
        })
      })
    } else {
      this.setState({
        note: null,
        ready: true
      })
    }
  }

  runAllParagraphs = () => {
    let context = this.context
    const { user } = this.props
    const { note } = this.state
    this.setState({running: true})

    context.notebookService.startJobs(note.id, user)
      .then(() => {
        // TODO do not collapse expanded paragraphs
        this.loadNote(note.id)
        this.setState({running: false})
      })
      .catch(error => {
        this.setNotification(error.text)
        this.loadNote(note.id)
      }
      )
  }

  stopAllParagraphs = () => {
    let context = this.context
    const { user } = this.props
    const { note } = this.state

    context.notebookService.stopAllParagraphs(note.id, user)
      .then(() => {
        this.loadNote(note.id)
        this.setState({running: false})
      })
      .catch(error => {
        this.setNotification(error.text)
        this.loadNote(note.id)
      })
  }

  setNotification = (text) => {
    const context = this.context
    context.setNotification(true, NOTIFICATION_TYPE.ERROR, text)
    this.setState({running: false})
  }

  render () {
    const { note, ready, running } = this.state
    const { user } = this.props
    let context = this.context

    return (
      <Segment basic loading={!ready}>
        {ready && note &&
        <>
          <Header
            as='h2'
            icon={{ name: 'file alternate outline', color: 'teal' }}
            content={`Note: ${note.name.substring(note.name.lastIndexOf('/') + 1)}`}
            subheader={`ID: ${note.id}`}
          />
          {running === false ?
            <Icon style={{cursor: 'pointer'}} name='play' color='green' size='large' title={context.getLocalizedText(Notes_text.PARAGRAPH_RUN_ALL)}
                  onClick={this.runAllParagraphs} data-testid='runAllParagraphs'/>
            : <Icon name='pause' color='grey' />
          }
          <Divider hidden />
            {note.paragraphs.map( (paragraph) =>
              <NoteParagraph noteId={note.id} user={user} paragraph={paragraph} key={paragraph.id}/>
            )}
        </>
        }
      </Segment>
    )
  }
}

export default Note
