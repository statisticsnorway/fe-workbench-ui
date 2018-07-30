import React from 'react'
import ReactTable from 'react-table'
import { Button, Container, Dimmer, Divider, Header, Icon, Input, Loader, Popup } from 'semantic-ui-react'
import { enums } from '../utilities/Enums'
import { lowerCaseFirst } from '../utilities/Helpers'
import { NavLink } from 'react-router-dom'
import { getDomainData } from '../utilities/DataExchange'
import * as moment from 'moment'
import 'moment/min/locales'
import { responseMessage } from '../utilities/FormComponents'

moment.locale(enums.LANGUAGE_CODE.NORWEGIAN)

class TableBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      tableData: [],
      loadingTable: true,
      response: ''
    }

    this.tableName = this.props.table.name
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

  componentDidMount () {
    getDomainData(this.tableName, enums.URL_AFFIX.LIST).then((result) => {
      let tableColumns = this.state.tableColumns
      let tableData = []

      for (let i = 0, l = result.length; i < l; i++) {
        let tableObject = {}

        tableObject[enums.PROPERTY.ID] = result[i][enums.PROPERTY.ID]

        for (let ii = 0, ll = tableColumns.length; ii < ll; ii++) {
          if (result[i].hasOwnProperty(tableColumns[ii].accessor)) {
            if (result[i][tableColumns[ii].accessor].constructor === Array) {
              tableObject[tableColumns[ii].accessor] = result[i][tableColumns[ii].accessor][0][enums.PROPERTY.LANGUAGE_TEXT]
            } else if (tableColumns[ii].accessor === enums.PROPERTY.LAST_UPDATED_DATE) {
              let date = moment(result[i][tableColumns[ii].accessor])

              if (date.isValid()) {
                tableObject[tableColumns[ii].accessor] = date.format('LLL')
              } else {
                tableObject[tableColumns[ii].accessor] = result[i][tableColumns[ii].accessor]
              }
            } else {
              tableObject[tableColumns[ii].accessor] = result[i][tableColumns[ii].accessor]
            }
          }
        }

        tableData.push(tableObject)
      }

      this.setState({
        tableData: tableData,
        loadingTable: false
      })
    }).catch((reason) => {
      this.setState({
        response: reason,
        loadingTable: false
      })
    })
  }

  searchInputOnChange = (event) => {
    this.setState({search: event.target.value})
  }

  render () {
    const {search, tableData, tableColumns, loadingTable, response} = this.state

    let filteredTableData = tableData
    let noDataText = ''

    if (!loadingTable) {
      noDataText = enums.CONTENT.FOUND_NOTHING + ' ' + this.tableNameNorwegianPluralLowerCase

      if (search) {
        noDataText = enums.CONTENT.FOUND_NOTHING + ' ' + this.tableNameNorwegianPluralLowerCase + ' ' +
          enums.CONTENT.WITH_NAME + ': \'' + search + '\''

        filteredTableData = tableData.filter(row => {
          return row.name.toUpperCase().includes(search.toUpperCase())
        })
      }
    }

    return (
      <Container fluid>
        <Dimmer active={loadingTable} inverted>
          <Loader inverted inline='centered' />
        </Dimmer>

        <Header as='h2' dividing content={this.tableNameNorwegianPlural} />

        <Popup trigger={<Input icon='search' placeholder={enums.CONTENT.SEARCH} value={search}
                               onChange={this.searchInputOnChange} />}
               flowing hoverable hideOnScroll position='right center'>
          <Icon color='blue' name='info circle' />
          {enums.CONTENT.FILTER_TABLE_DATA}
        </Popup>

        <NavLink to={'/generic/' + this.domainName + '/new'}>
          <Button primary floated='right' icon='edit'
                  content={enums.CONTENT.CREATE_NEW + ' ' + this.tableNameNorwegianLowerCase} />
        </NavLink>

        {response ? responseMessage(response) : <Divider hidden />}

        <ReactTable
          sortable
          data={filteredTableData}
          resizable={false}
          columns={tableColumns}
          defaultPageSize={10}
          noDataText={noDataText}
          previousText={enums.CONTENT.TABLE.PREVIOUS}
          nextText={enums.CONTENT.TABLE.NEXT}
          loadingText={enums.CONTENT.TABLE.LOADING}
          pageText={enums.CONTENT.TABLE.PAGE}
          ofText={enums.CONTENT.TABLE.OF}
          rowsText={enums.CONTENT.TABLE.ROWS}
          className='-striped -highlight'
        />
      </Container>
    )
  }
}

export default TableBuilder
