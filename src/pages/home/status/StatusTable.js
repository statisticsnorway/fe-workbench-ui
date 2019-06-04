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
    dataResource: this.props.user.userPrefs !== undefined ? this.props.user.userPrefs.preferences.dataResource[0] : [],
    staticStatus: {},
    dataResourcesOptions: null
  }

  componentDidMount () {
    let context = this.context
    const { statusType, user } = this.props

    const customStatus = {}
    const staticStatus = {}

    Object.entries(mockStatusData).filter(statusData =>
      user.userPrefs.preferences.dataResource.includes(statusData[1].id)).forEach(statusData => {
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

    context.ldsService.getDataResources().then(dataResources => {
      let dataResourcesOptions = dataResources.filter(dataResource =>
        user.userPrefs.preferences.dataResource.includes(dataResource.id)).map(dataResource => ({
        key: dataResource.id,
        text: dataResource.name.filter(name => name.languageCode === context.languageCode)[0].languageText,
        value: dataResource.id
      }))
      this.setState({
        dataResourcesOptions: dataResourcesOptions
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
    const { customStatus, dataResource, staticStatus, dataResourcesOptions } = this.state

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
              <Dropdown name='dataResource' value={dataResource} options={dataResourcesOptions}
                        onChange={this.handleChange} disabled={!dataResourcesOptions} loading={!dataResourcesOptions}/>
            </Table.Cell>
            { dataResourcesOptions && dataResourcesOptions.length > 0 &&
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
