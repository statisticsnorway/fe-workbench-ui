import React, { Component } from 'react'
import { Accordion, Message } from 'semantic-ui-react'

import StatusTable from './StatusTable'
import { INFO } from '../../../utilities/enum'
import { mockStatusType } from '../../../mocks/MockStatusType'

class Status extends Component {
  state = {
    ready: false,
    statusTypes: []
  }

  componentDidMount () {
    const {user} = this.props

    this.setState({
      ready: true,
      statusTypes: Object.keys(mockStatusType).filter(statusType =>
        mockStatusType[statusType].approvedRoles.includes(user.role)
      )
    })
  }

  render () {
    const {statusTypes} = this.state
    const {languageCode} = this.props

    return (
      <div>
        {statusTypes.length > 0 ?
          <Accordion exclusive={false} fluid styled panels={statusTypes.map(statusType => ({
            key: statusType,
            title: {
              content: mockStatusType[statusType].name[languageCode],
              icon: {
                name: 'chart bar',
                color: 'green'
              }
            },
            content: {
              content: (
                <StatusTable {...this.props} statusType={statusType} />
              )
            }
          }))} />
          : <Message info icon='info' content={INFO.NOTHING_TO_SHOW[languageCode]} />}
      </div>
    )
  }
}

export default Status
