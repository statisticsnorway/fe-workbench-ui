import React, { Component } from 'react'
import { Accordion, Divider, Header, Icon, Message, Segment } from 'semantic-ui-react'

import Properties from '../../../properties/properties'
import { WorkbenchContext } from '../../../context/ContextProvider'
import DeleteNotebook from './DeleteNotebook'

class Notebook extends Component {
  static contextType = WorkbenchContext

  state = {
    accordionIndex: null,
    error: false,
    notebook: null,
    ready: false
  }

  componentDidMount () {
    this.props.id ? this.getNotebook(this.props.id) : this.setState({ ready: true })
  }

  componentDidUpdate (prevProps) {
    prevProps.id !== this.props.id && this.getNotebook(this.props.id)
  }

  getNotebook = (id) => {
    if (id) {
      this.setState({
        error: false,
        ready: false
      }, () => {
        let context = this.context

        context.notebookService.getNotebook(id).then(notebook => {
          this.setState({
            notebook: notebook.body,
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
        notebook: null,
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
    const { accordionIndex, error, notebook, ready } = this.state

    return (
      <Segment basic loading={!ready}>
        {ready && error && <Message negative icon='warning' header='Error' content={error} />}
        {ready && !error &&
        <>
          <Header
            as='h2'
            icon={{ name: 'file alternate outline', color: 'teal' }}
            content={`Note: ${notebook.name.substring(notebook.name.lastIndexOf('/') + 1)}`}
            subheader={`ID: ${notebook.id}`}
          />

          <DeleteNotebook id={notebook.id} name={notebook.name} />

          <a href={`${Properties.api.notebookService.replace('/api/', '')}/#/notebook/${notebook.id}`}
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
              <pre>{JSON.stringify(notebook, null, 2)}</pre>
            </Accordion.Content>
          </Accordion>
        </>
        }
      </Segment>
    )
  }
}

export default Notebook
