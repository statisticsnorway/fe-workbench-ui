import React, { Component } from 'react'
import { Dropdown, Icon, Table } from 'semantic-ui-react'

import StaticStatus from './StaticStatus'
import CustomStatus from './CustomStatus'
import { STATUS_TABLE } from '../../../utilities/enum'
import { mockDataResource } from '../../../mocks/MockDataResource'

class StatusTable extends Component {
  state = {
    dataResource: this.props.user.dataResource[0]
  }

  handleChange = (event, data) => {
    this.setState({[data.name]: data.value})
  }

  render () {
    const {languageCode, user} = this.props
    const {dataResource} = this.state
    const dataResourceOptions = Object.keys(mockDataResource).filter(dataResource =>
      user.dataResource.includes(dataResource)).map(dataResource => ({
      key: dataResource,
      text: mockDataResource[dataResource].name[languageCode],
      value: dataResource
    }))

    return (
      <Table celled compact selectable singleLine>
        <Table.Header>
          <Table.Row>
            {Object.keys(STATUS_TABLE).map(header =>
              <Table.HeaderCell key={header}>
                <Icon name='cog' color='blue' />
                {STATUS_TABLE[header][languageCode]}
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Dropdown name='dataResource' value={dataResource} options={dataResourceOptions}
                        onChange={this.handleChange} />
            </Table.Cell>
            <Table.Cell>{mockDataResource[dataResource].unitType[languageCode]}</Table.Cell>
            <Table.Cell><StaticStatus {...this.props} /></Table.Cell>
            <Table.Cell><CustomStatus {...this.props} /></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

export default StatusTable
