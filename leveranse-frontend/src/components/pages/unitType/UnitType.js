import React from 'react'
import { Header, Icon, Input, Popup } from 'semantic-ui-react'
import UnitTypeModal from '../unitType/UnitTypeModal'
import ReactTable from 'react-table'

const tableHeaders = [
  ['name', 'Navn'],
  ['description', 'Beskrivelse'],
  ['code', 'Kode'],
  ['status', 'Status'],
  ['lastUpdateDate', 'Siste endring'],
  ['action', '']
]

const tableData = [
  {
    name: 'Aksjonær',
    description: 'Aksjonær er en person eller sammenslutning som eier aksjer i et aksjeselskap eller allmennaksjeselskap',
    code: '69',
    status: 'Aktiv',
    lastUpdateDate: '01.01.1950',
    action: ''
  },
  {
    name: 'Kjøretøy',
    description: 'Et kjøretøy er en innretning som er bestemt til å kjøre på bakken.',
    code: '50',
    status: 'Aktiv',
    lastUpdateDate: '01.01.1950',
    action: ''
  },
  {
    name: 'Skogsareal',
    description: 'Skogareal har et krav til tresetting på seks trær som er, eller kan bli, 5 meter høye, per dekar. Trærne bør være jevnt fordelt på arealet',
    code: '99',
    status: 'Aktiv',
    lastUpdateDate: '01.01.1950',
    action: ''
  },
  {
    name: 'Person',
    description: 'Nært beslektet med apekatt, men er ikke apekatt',
    code: '112',
    status: 'Til godkjenning',
    lastUpdateDate: '01.05.2018',
    action: ''
  },
  {
    name: 'Innerst',
    description: 'En person som leier et rom eller et hus hos andre og som har egen husholdning',
    code: '10',
    status: 'Utgått',
    lastUpdateDate: '31.12.1950',
    action: ''
  }
]

let tableColumns = []

class UnitType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unitTypeModalOpen: false,
      search: '',
      tableData: tableData,
      loadingTable: false
    }

    tableHeaders.map((row) => {
      let tableColumn = {}
      tableColumn['Header'] = row[1]
      tableColumn['accessor'] = row[0]
      tableColumn['className'] = 'text-align center'
      tableColumns.push(tableColumn)
    })

    console.log(tableColumns)

    this.searchInputOnChange = this.searchInputOnChange.bind(this)
  }

  searchInputOnChange (event) {
    this.setState({
      search: event.target.value
    })
  }

  render () {
    const {search, tableData, loadingTable} = this.state

    let filteredTableData = tableData

    if (search) {
      filteredTableData = tableData.filter(row => {
        return row.name.toUpperCase().includes(search.toUpperCase())
      })
    }

    return (
      <div>
        <Header as='h3' content='Enhetstyper' dividing />
        <Popup trigger={<Input icon='search' placeholder='Søk...' value={search}
                               onChange={this.searchInputOnChange} />}
               flowing hoverable hideOnScroll position='right center'>
          <Icon color='blue' name='info circle' />
          Filtrerer tabellen etter navn
        </Popup>
        <UnitTypeModal />
        <ReactTable
          data={filteredTableData}
          loading={loadingTable}
          noDataText={'Fant ingen enhetstyper med navnet: \'' + search + '\''}
          previousText='Forrige'
          nextText='Neste'
          loadingText='Laster...'
          pageText='Side'
          ofText='av'
          rowsText='rader'
          sortable
          resizable={false}
          columns={tableColumns}
          className='-striped -highlight'
        />
      </div>
    )
  }
}

export default UnitType