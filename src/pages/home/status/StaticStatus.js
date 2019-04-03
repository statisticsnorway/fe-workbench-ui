import React, { Component } from 'react'
import { Checkbox, Label, Statistic } from 'semantic-ui-react'

import { mockStatusData } from '../../../mocks/MockStatusData'

class StaticStatus extends Component {
  state = {}

  componentDidMount () {
    const {statusType, user} = this.props

    const state = {}

    Object.keys(mockStatusData).filter(statusData =>
      user.dataResource.includes(statusData)).map(statusData => {
      Object.keys(mockStatusData[statusData].staticData[statusType]).forEach(status =>
        state[status] = mockStatusData[statusData].staticData[statusType][status]
      )
    })

    this.setState(state)
  }

  render () {
    return (
      <div>
        {Object.keys(this.state).map(data => {
          switch (typeof this.state[data]) {
            case 'string':
              return <Label key={data} detail={this.state[data]} content={data} />

            case 'boolean':
              return <Checkbox key={data} label={data} readOnly checked={this.state[data]} />

            default:
              return <Statistic key={data} color='green' label={data} value={this.state[data]} size='mini' />
          }
        })}
      </div>
    )
  }
}

export default StaticStatus
