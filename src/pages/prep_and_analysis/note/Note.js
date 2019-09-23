import React, { Component, Fragment } from 'react'
import { Accordion, Divider, Header, Icon, Message, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../../context/ContextProvider'
import { PARAGRAPH_RUN_STATUS as Status_text } from "../../../utilities/enum/PARAGRAPH_RUN_STATUS"
import { NOTEBOOK_TOOLBAR as Notes_text } from "../../../utilities/enum/NOTEBOOK_TOOLBAR"

class Note extends Component {
  static contextType = WorkbenchContext

  state = {
    accordionIndex: null,
    error: false,
    note: null,
    ready: false,
    running: false
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

  runParagraph = (paragraphId) => {
    let context = this.context
    const { user } = this.props
    const { note } = this.state
    this.setState({ready: false})

    context.notebookService.runParagraphSync(note.id, paragraphId, user)
      .then(result => {
        // TODO reload paragraph only
        this.getNote(note.id)
      this.setState({ready: true})
      })
      .catch(error => {
        // TODO handle error
        this.setState({ready: true})
      })
  }

  runAlParagraphs = () => {
    let context = this.context
    const { user } = this.props
    const { note } = this.state
    this.setState({running: true})

    context.notebookService.startJobs(note.id, user)
      .then(result => {
        this.getNote(note.id)
        this.setState({running: false})
      })
      .catch(error => {
        // TODO handle error
        this.setState({running: false})
      })

  }

  handleAccordionClick = (e, titleProps) => {
    // prevent accordion to be opened/closed when clicking action buttons
    if (e.target.parentElement.id !== 'donotexpand') {
      const { index } = titleProps
      const { accordionIndex } = this.state
      const newIndex = accordionIndex === index ? -1 : index

      this.setState({ accordionIndex: newIndex })
    }
  }

  render () {
    const { accordionIndex, error, note, ready, running } = this.state
    let context = this.context

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
          {running === false ?
            <Icon name='play' color='green' size='large' title={context.getLocalizedText(Notes_text.PARAGRAPH_RUN_ALL)}
                  onClick={this.runAlParagraphs} data-testid='runAllParagraphs'/>
            : <Icon name='circle notched' color='blue' loading />
          }
          <Divider hidden />

          <Accordion fluid>
            {note.paragraphs.map( (paragraph, index) =>
              // TODO move paragraph to own component (NoteParagraph)
              <Fragment key={paragraph.id}>
                <Accordion.Title active={accordionIndex === index} index={index} onClick={this.handleAccordionClick}>
                  <Icon name='dropdown' />
                  <Icon name={paragraph.results ? Status_text[paragraph.results.code].icon : Status_text[paragraph.status].icon}
                        color={paragraph.results ? Status_text[paragraph.results.code].color : Status_text[paragraph.status].color}
                        title={paragraph.results ? context.getLocalizedText(Status_text[paragraph.results.code].text)
                          : context.getLocalizedText(Status_text[paragraph.status].text)}
                        loading={Status_text[paragraph.status].loading}/>
                  <span style={{paddingRight: '5px'}}>{paragraph.title === undefined ? 'INGEN_TITTEL' : paragraph.title}</span>
                  <span id='donotexpand'>
                      <Icon name='play' color='green' title={context.getLocalizedText(Notes_text.PARAGRAPH_RUN)}
                            onClick={() => this.runParagraph(paragraph.id)}/>
                  </span>
                </Accordion.Title>
                <Accordion.Content active={accordionIndex === index}>
                  <pre>{paragraph.text}</pre>
                  <div>Result:
                    <div>
                      {paragraph.results && paragraph.results.msg.map( (element, index) =>
                      <span key={paragraph.id + element.code + index}>{element.data}</span>)}
                    </div>
                  </div>
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
