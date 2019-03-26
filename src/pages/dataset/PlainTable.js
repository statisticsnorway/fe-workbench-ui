import React, { Component } from 'react'
import ReactTable from 'react-table'
import { Segment } from 'semantic-ui-react'

class PlainTable extends Component {
  render () {
    const {data} = this.props
    const columns = Object.entries(data[0]).map(elem => ({Header: elem[0], accessor: elem[0]}))

    return (
      <Segment>
        <ReactTable
          data={data}
          columns={columns}
          noDataText='No data!'
          loadingText='Laster...'
          className='-striped -highlight'
          minRows={1}
          filterable={true}
        />
      </Segment>
    )
  }
}

export default PlainTable
