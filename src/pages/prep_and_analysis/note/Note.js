import React, { Component } from 'react'
import { Accordion, Divider, Header, Icon, Message, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../../context/ContextProvider'
import DeleteNote from './DeleteNote'

class Note extends Component {
  static contextType = WorkbenchContext

  state = {
    accordionIndex: null,
    error: false,
    note: null,
    ready: false
  }

  componentDidMount () {
    this.props.id ? this.getNote(this.props.id) : this.setState({ ready: true })
  }

  componentDidUpdate (prevProps) {
    prevProps.id !== this.props.id && this.getNote(this.props.id)
  }

  getNote = (id) => {
    const { user } = this.props
    if (id) {
      this.setState({
        error: false,
        ready: false
      }, () => {
        let context = this.context

        context.notebookService.getNote(id, user).then(note => {
          this.setState({
            note: note.body,
            noteurl: note.noteurl,
            ready: true
          })
        }).catch(error => {
          this.setState({
            error: error,
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

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps
    const { accordionIndex } = this.state
    const newIndex = accordionIndex === index ? -1 : index

    this.setState({ accordionIndex: newIndex })
  }

  render () {
    const { loadNotes, user } = this.props
    const { accordionIndex, error, note, noteurl, ready } = this.state

    return (
      <Segment basic loading={!ready}>
        {ready && error && <Message negative icon='warning' header='Error' content={error} />}
        {ready && !error &&
        <>
          <Header
            as='h2'
            icon={{ name: 'file alternate outline', color: 'teal' }}
            content={`Note: ${note.name.substring(note.name.lastIndexOf('/') + 1)}`}
            subheader={`ID: ${note.id}`}
          />

          <DeleteNote id={note.id} name={note.name} loadNotes={loadNotes} user={user} />

          <a href={noteurl}
             target='_blank' rel='noopener noreferrer'>
            <Icon name='share' color='blue' />
          </a>

          <Divider hidden />

          <Accordion fluid>
            <Accordion.Title active={accordionIndex === 0} index={0} onClick={this.handleAccordionClick}>
              <Icon name='dropdown' />
              JSON
            </Accordion.Title>
            <Accordion.Content active={accordionIndex === 0}>
              <pre>{JSON.stringify(note, null, 2)}</pre>
            </Accordion.Content>
          </Accordion>
        </>
        }
      </Segment>
    )
  }
}

export default Note
