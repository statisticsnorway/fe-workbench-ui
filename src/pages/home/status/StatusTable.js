import React, { Component, Fragment } from 'react'
import { Checkbox, Dropdown, Icon, Table } from 'semantic-ui-react'

import StaticStatus from './StaticStatus'
import CustomStatus from './CustomStatus'
import { WorkbenchContext } from '../../../context/ContextProvider'
import { STATUS_TABLE } from '../../../utilities/enum'
import { mockStatusData } from '../../../mocks/MockStatusData'

class StatusTable extends Component {
  static contextType = WorkbenchContext

  state = {
    customStatus: {},
    statisticalProgram: this.context.user.userPrefs !== undefined
      ? this.context.user.userPrefs.preferences.statisticalProgram[0] : [],
    staticStatus: {},
    statisticalProgramOptions: null
  }

  componentDidMount () {
    let context = this.context
    const { statusType } = this.props
    const user = context.user

    const customStatus = {}
    const staticStatus = {}

    Object.entries(mockStatusData).filter(statusData =>
      user.userPrefs.preferences.statisticalProgram.includes(statusData[1].id)).forEach(statusData => {
      Object.keys(mockStatusData[statusData[0]].customData[statusType]).forEach(status =>
          customStatus[status] = { data: mockStatusData[statusData[0]].customData[statusType][status], show: true }
      )

      Object.keys(mockStatusData[statusData[0]].staticData[statusType]).forEach(status =>
        staticStatus[status] = mockStatusData[statusData[0]].staticData[statusType][status]
      )
    })

    this.setState({
      customStatus: customStatus,
      staticStatus: staticStatus
    })

    context.ldsService.getStatisticalPrograms().then(statisticalPrograms => {
      let statisticalProgramOptions = statisticalPrograms.filter(statisticalProgram =>
        user.userPrefs.preferences.statisticalProgram.includes(statisticalProgram.id)).map(statisticalProgram => ({
        key: statisticalProgram.id,
        text: context.getLocalizedGsimObjectText(statisticalProgram.name),
        value: statisticalProgram.id
      }))
      this.setState({
        statisticalProgramOptions: statisticalProgramOptions
      })
    })
  }

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
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
    const { customStatus, statisticalProgram, staticStatus, statisticalProgramOptions } = this.state

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
                <Dropdown icon='cog' style={{ float: 'right' }} closeOnBlur={false}>
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
              <Dropdown name='statisticalProgram' value={statisticalProgram} options={statisticalProgramOptions}
                        onChange={this.handleChange} disabled={!statisticalProgramOptions} loading={!statisticalProgramOptions}/>
            </Table.Cell>
            { statisticalProgramOptions && statisticalProgramOptions.length > 0 &&
            <Fragment>
              <Table.Cell verticalAlign='top'><StaticStatus {...staticStatus} /></Table.Cell>
              <Table.Cell verticalAlign='top'><CustomStatus {...customStatus} /></Table.Cell>
            </Fragment>}
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

export default StatusTable
