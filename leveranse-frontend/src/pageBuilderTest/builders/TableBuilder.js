import React from 'react'
import ReactTable from 'react-table'
import { Button, Divider, Header, Icon, Input, Popup } from 'semantic-ui-react'
import { enums } from '../utilities/Enums'
import { lowerCaseFirst } from '../utilities/Helpers'
import { NavLink } from 'react-router-dom'

class TableBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      tableData: [],
      loadingTable: false
    }

    this.domainName = lowerCaseFirst(this.props.table.name)
    this.tableNameNorwegianLowerCase = lowerCaseFirst(this.props.table.nameInNorwegian)
    this.tableNameNorwegianPlural = this.props.table.namePlural
    this.tableNameNorwegianPluralLowerCase = lowerCaseFirst(this.props.table.namePlural)

    const tableColumns = []

    this.props.table.tableConfig.headers.forEach((element) => {
      let tableColumn = {}
      tableColumn['Header'] = element.name
      tableColumn['accessor'] = element.accessor

      switch (element.accessor) {
        case enums.PROPERTY.NAME:
          tableColumn['Cell'] = props => (
            <NavLink to={'/generic/' + this.domainName + '/' + props.original.id}>
              {props.value}
            </NavLink>
          )
          break

        case enums.PROPERTY.DESCRIPTION:
          tableColumn['Cell'] = props => (
            // Using <a> because that is the only thing (found so far) in Semantic UI using '...' to cutoff text
            <Popup trigger={<a className='noStyle'>{props.value}</a>} wide hideOnScroll position='top left'>
              {props.value}
            </Popup>
          )
          break

        default:
          tableColumn['Cell'] = props => (
            <div className='textCenter'>{props.value}</div>
          )
      }

      tableColumns.push(tableColumn)
    })

    this.state.tableColumns = tableColumns
  }

  searchInputOnChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  handleButtonClick = () => {
    console.log(this.state)
  }

  render () {
    const {search, tableData, tableColumns, loadingTable} = this.state
    let filteredTableData = tableData
    let noDataText = 'Fant ingen ' + this.tableNameNorwegianPluralLowerCase

    if (search) {
      noDataText = 'Fant ingen ' + this.tableNameNorwegianPluralLowerCase + ' med navnet: \'' + search + '\''

      filteredTableData = tableData.filter(row => {
        return row.name.toUpperCase().includes(search.toUpperCase())
      })
    }

    return (
      <div>
        <Header as='h2' dividing content={this.tableNameNorwegianPlural} />

        <Popup trigger={<Input icon='search' placeholder={enums.CONTENT.SEARCH} value={search}
                               onChange={this.searchInputOnChange} />}
               flowing hoverable hideOnScroll position='right center'>
          <Icon color='blue' name='info circle' />
          {enums.CONTENT.FILTER_TABLE_DATA}
        </Popup>

        <NavLink to={'/generic/' + this.domainName}>
          <Button primary floated='right' icon='edit'
                  content={enums.CONTENT.CREATE_NEW + ' ' + this.tableNameNorwegianLowerCase} />
        </NavLink>

        <Divider hidden />

        <ReactTable
          sortable
          data={filteredTableData}
          loading={loadingTable}
          resizable={false}
          columns={tableColumns}
          defaultPageSize={10}
          noDataText={noDataText}
          previousText='Forrige'
          nextText='Neste'
          loadingText='Laster...'
          pageText='Side'
          ofText='av'
          rowsText='rader'
          className='-striped -highlight'
        />

        <Button onClick={this.handleButtonClick} content={'Test'} />
      </div>
    )
  }
}

export default TableBuilder