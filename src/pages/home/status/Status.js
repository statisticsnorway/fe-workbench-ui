import React, { Component } from 'react'
import { Accordion, Message } from 'semantic-ui-react'

import StatusTable from './StatusTable'
import { lowerCaseFirst } from '../../../utilities/common/StringHandling'
import { INFO, UI } from '../../../utilities/enum'

import { mockStatusType } from '../../../mocks/MockStatusType'

class Status extends Component {
  state = {
    statusTypes: []
  }

  componentDidMount () {
    const {user} = this.props

    this.setState({
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
              content: `${mockStatusType[statusType].name[languageCode]} ${lowerCaseFirst(UI.STATUS[languageCode])}`,
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
