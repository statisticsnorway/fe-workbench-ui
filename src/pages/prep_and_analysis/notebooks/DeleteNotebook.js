import React, { Component } from 'react'
import { Confirm, Icon, Message, Popup } from 'semantic-ui-react'

import { WorkbenchContext } from '../../../context/ContextProvider'

class DeleteNotebook extends Component {
  static contextType = WorkbenchContext

  state = {
    deleted: false,
    loading: false,
    message: false,
    showConfirm: false
  }

  deleteNotebook = () => {
    this.setState({
      loading: true,
      showConfirm: false
    }, () => {
      const { id } = this.props

      let context = this.context

      context.notebookService.deleteNotebook(id).then(() => {
        this.setState({
          deleted: true,
          loading: false,
          message: 'Was deleted'
        })
      }).catch(error => {
        this.setState({
          loading: false,
          message: `Could not delete (${error})`
        })
      })
    })
  }

  showConfirm = () => {
    this.setState({ showConfirm: true })
  }

  hideConfirm = () => {
    this.setState({ showConfirm: false })
  }

  render () {
    const { deleted, loading, message, showConfirm } = this.state
    const { id, name } = this.props

    return (
      <>
        <Popup basic flowing
               trigger={
                 <>
                   <Icon link name='trash alternate outline' color='red' size='large' loading={loading}
                         disabled={deleted}
                         onClick={this.showConfirm} />
                   <Confirm open={showConfirm} onCancel={this.hideConfirm} onConfirm={this.deleteNotebook}
                            header='Sure?'
                            content={`Are you sure? ${id} (${name})`}
                            cancelButton={{
                              color: 'red',
                              content: 'Cancel',
                              icon: 'close',
                              floated: 'left'
                            }}
                            confirmButton={{ content: 'Confirm', icon: 'check' }} />
                 </>
               }>
          <Icon color='blue' name='info circle' />
          Deleted
        </Popup>
        {message !== false &&
        <Message positive={deleted} negative={!deleted} icon={deleted ? 'check' : 'warning'} content={message} />
        }
      </>
    )
  }
}

export default DeleteNotebook
