import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { WorkbenchContext } from '../../context/ContextProvider'
import DataTable from './DataTable'

class DatasetView extends Component {
  static contextType = WorkbenchContext

  constructor (props) {
    super(props)
    this.state = {
      pageInfo: {
        page: 1,
        sort: null,
        order: null,
        limit: 10,
      },
      totalCount: 0,
      loading: false,
    }
  }

  componentDidMount () {
    if (this.props.match.params.id) {
      this.context.ldsService.getDatasetStructure(this.props.match.params.id).then(results => {
        this.setState({
          structure: results,
        })
        console.log(this.state.structure, ' state.structure')
      })
      this.loadData(this.state.pageInfo)
    }
  }

  loadData (pageInfo) {
    // this.setState({ loading: true })
    const current = this.state.pageInfo
    Object.keys(current).forEach(function (element) {
      if (!(element in pageInfo)) {
        pageInfo[element] = current[element]
      }
    })
    this.context.datasetService.getDataset(this.props.match.params.id, pageInfo).then(results => {
      this.setState({
        loading: false,
        data: results.data,
        totalCount: results.totalCount,
        pageInfo: pageInfo
      })
      console.log(this.state, 'state')
    })
    console.log('load data ferdig')
    console.log(this.state)
  }

  onPageChange = (event, data) => {
    const { activePage } = data
    if (activePage !== this.state.pageInfo.page) {
      this.loadData({ page: activePage })
    }
  }

  onSortChange = (clickedColumn) => {
    const { sort, order } = this.state.pageInfo

    let newOrder = order === 'asc' ? 'desc' : 'asc'
    if (sort !== clickedColumn) {
      newOrder = 'asc'
    }

    this.loadData({
      sort: clickedColumn,
      page: 1,
      order: newOrder,
    })
  }

  // Converts to directions used by Semantic UI
  directionConverter(order) {
    if (order === 'asc') {
      return 'ascending';
    } else if (order === 'desc') {
      return 'descending';
    } else {
      return null;
    }
  }

  render () {
    console.log('DatasetView render')
    console.log(this.state)
    if (this.props.match.params.id !== undefined) {
      let structure = this.state ? this.state.structure : null
      let data = this.state ? this.state.data : null
      console.log(data, 'data')

      return (
        <DataTable
          loading={this.state.loading}
          totalCount={this.state.totalCount}
          totalPages={Math.ceil(this.state.totalCount / this.state.pageInfo.limit)}
          currentPage={this.state.pageInfo.page}
          onPageChange={this.onPageChange}
          onSortChange={this.onSortChange}
          limit={this.state.pageInfo.limit}
          sort={this.state.pageInfo.sort}
          sortOrder={this.directionConverter(this.state.pageInfo.order)}
          columns={structure}
          data={data}/>
      )
    } else {
      return (
        <div><Header> No dataset found </Header></div>
      )
    }
  }
}

export default DatasetView
