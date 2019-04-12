import React, { Component } from 'react'
import { Checkbox, Dropdown, Icon, Table } from 'semantic-ui-react'

import StaticStatus from './StaticStatus'
import CustomStatus from './CustomStatus'
import { WorkbenchContext } from '../../../context/ContextProvider'
import { STATUS_TABLE } from '../../../utilities/enum'

import { mockDataResource } from '../../../mocks/MockDataResource'
import { mockStatusData } from '../../../mocks/MockStatusData'

class StatusTable extends Component {
  static contextType = WorkbenchContext

  state = {
    customStatus: {},
    dataResource: this.props.user.dataResource[0],
    staticStatus: {}
  }

  componentDidMount () {
    const {statusType, user} = this.props

    const customStatus = {}
    const staticStatus = {}

    Object.keys(mockStatusData).filter(statusData =>
      user.dataResource.includes(statusData)).forEach(statusData => {
      Object.keys(mockStatusData[statusData].customData[statusType]).forEach(status =>
        customStatus[status] = {data: mockStatusData[statusData].customData[statusType][status], show: true}
      )

      Object.keys(mockStatusData[statusData].staticData[statusType]).forEach(status =>
        staticStatus[status] = mockStatusData[statusData].staticData[statusType][status]
      )
    })

    this.setState({
      customStatus: customStatus,
      staticStatus: staticStatus
    })
  }

  filterOptions = () => {
    const {user} = this.props

    let context = this.context

    return Object.keys(mockDataResource).filter(dataResource =>
      user.dataResource.includes(dataResource)).map(dataResource => ({
      key: dataResource,
      text: mockDataResource[dataResource].name[context.languageCode],
      value: dataResource
    }))
  }

  handleChange = (event, data) => {
    this.setState({[data.name]: data.value})
  }

  handleToggle = (event, data) => {
    this.setState({
      customStatus: {
        ...this.state.customStatus,
        [data.name]: {
          ...this.state.customStatus[data.name],
          show: data.value
        }
      }
    })
  }

  render () {
    const {customStatus, dataResource, staticStatus} = this.state

    let context = this.context

    return (
      <Table celled compact singleLine>
        <Table.Header>
          <Table.Row>
            {Object.keys(STATUS_TABLE).map(header =>
              <Table.HeaderCell key={header}>
                <Icon name={STATUS_TABLE[header].icon} color='blue' />
                {`${STATUS_TABLE[header].text[context.languageCode]} `}
                {header === 'CUSTOM' &&
                <Dropdown icon='cog' style={{float: 'right'}} closeOnBlur={false}>
                  <Dropdown.Menu>
                    {Object.keys(customStatus).map(status =>
                      <Dropdown.Item key={status} onClick={event => event.stopPropagation()}>
                        <Checkbox label={status} checked={customStatus[status].show}
                                  onChange={() => this.handleToggle(null, {
                                    name: status,
                                    value: !customStatus[status].show
                                  })} />
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                }
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Dropdown name='dataResource' value={dataResource} options={this.filterOptions()}
                        onChange={this.handleChange} />
            </Table.Cell>
            <Table.Cell>{mockDataResource[dataResource].unitType[context.languageCode]}</Table.Cell>
            <Table.Cell verticalAlign='top'><StaticStatus {...staticStatus} /></Table.Cell>
            <Table.Cell verticalAlign='top'><CustomStatus {...customStatus} /></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

export default StatusTable
