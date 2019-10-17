import React, { Component } from 'react'
import { Accordion, Message } from 'semantic-ui-react'

import StatusTable from './StatusTable'
import { WorkbenchContext } from '../../../context/ContextProvider'
import { lowerCaseFirst } from '../../../utilities/common/StringHandling'
import _ from 'lodash'

import { mockStatusType } from '../../../mocks/MockStatusType'
import { INFO, UI } from '../../../utilities/enum'

class Status extends Component {
  static contextType = WorkbenchContext

  state = {
    statusTypes: []
  }

  componentDidMount () {
    const user = this.context.user

    this.setState({
      statusTypes: Object.keys(mockStatusType).filter(statusType =>
        mockStatusType[statusType].approvedRoles.includes(_.get(user.userPrefs, 'preferences.role'))
      )
    })
  }

  render () {
    const { statusTypes } = this.state

    let context = this.context

    return (
      <div>
        {statusTypes.length > 0 ?
          <Accordion exclusive={false} fluid styled panels={statusTypes.map(statusType => ({
            key: statusType,
            title: {
              content: `${mockStatusType[statusType].name[context.languageCode]} ${lowerCaseFirst(UI.STATUS[context.languageCode])}`,
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
          : <Message info icon='info' content={context.getLocalizedText(INFO.NOTHING_TO_SHOW)} />}
      </div>
    )
  }
}

export default Status
