import React, { Component, Fragment } from 'react'
import { Accordion, Divider, Header, Icon, Message, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../../context/ContextProvider'

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

  // TODO
  // Show overall paragraph status (see Zeppelin/jobs) on top
  // Show individual paragraph status and run button for each paragraph
  render () {
    const { accordionIndex, error, note, ready } = this.state

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

          <Divider hidden />

          <Accordion fluid>
            {note.paragraphs.map( (paragraph, index) =>
              <Fragment key={paragraph.id}>
                <Accordion.Title active={accordionIndex === index} index={index} onClick={this.handleAccordionClick}>
                  <Icon name='dropdown' />
                    {paragraph.title === undefined ? 'INGEN_TITTEL' : paragraph.title}
                </Accordion.Title>
                <Accordion.Content active={accordionIndex === index}>
                  <pre>{paragraph.text}</pre>
                </Accordion.Content>
              </Fragment>
            )}
          </Accordion>
        </>
        }
      </Segment>
    )
  }
}

export default Note
