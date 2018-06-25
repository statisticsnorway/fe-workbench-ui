import React from 'react'
import { Divider, Header, Icon, Input, Popup } from 'semantic-ui-react'
import UnitTypeModal from './UnitTypeModal'
import ReactTable from 'react-table'

const tableHeaders = [
  ['name', 'Navn'],
  ['description', 'Beskrivelse'],
  ['code', 'Kode'],
  ['status', 'Status'],
  ['lastUpdateDate', 'Siste endring'],
  ['action', '']
]

let tableColumns

class UnitType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unitTypeModalOpen: false,
      search: '',
      tableData: tempTableData,
      loadingTable: false,
      selectedUnitTypeId: 'new'
    }

    tableColumns = tableHeaders.map((row) => {
      let tableColumn = {}
      tableColumn['Header'] = row[1]
      tableColumn['accessor'] = row[0]

      if (row[0] === 'name') {
        tableColumn['Cell'] = props => (
          // props.value will have to be changed to the unit types id when we implement fetching data from backend
          <a className='item cursorPointer' onClick={() => this.setStateThenOpenModal(props.value)}>{props.value}</a>
        )
      }

      if (row[0] === 'description') {
        tableColumn['Cell'] = props => (
          // Using <a> because that is the only thing (found so far) in Semantic UI using '...' to cutoff text
          <Popup trigger={<a className='noStyle'>{props.value}</a>} wide hideOnScroll position='top left'>
            {props.value}
          </Popup>
        )
      }

      if (row[0] === 'code' || row[0] === 'status' || row[0] === 'lastUpdateDate') {
        tableColumn['Cell'] = props => (
          <div className='textCenter'>{props.value}</div>
        )
      }

      return tableColumn
    })

    this.searchInputOnChange = this.searchInputOnChange.bind(this)
  }

  searchInputOnChange (event) {
    this.setState({
      search: event.target.value
    })
  }

  handleSelectedUnitType = (id) => {
    return new Promise((resolve) => {
      this.setState({selectedUnitTypeId: id})
      resolve(true)
    })
  }

  setStateThenOpenModal (id) {
    this.handleSelectedUnitType(id).then(() => {
      this.UnitTypeModal.handleUnitTypeModalOpen()
    })
  }

  // TODO: There is a bug here. If you open the modal to register a new unitType, then close it, then open it again,
  // TODO: its not generating a new one, however if you open one from the table in between it generates a new one.
  handleIsNewUnitType = () => {
    this.handleSelectedUnitType('new').then(() => {
      this.UnitTypeModal.handleUnitTypeModalOpen()
    })
  }

  render () {
    const {search, tableData, loadingTable, selectedUnitTypeId} = this.state
    let filteredTableData = tableData

    if (search) {
      filteredTableData = tableData.filter(row => {
        return row.name.toUpperCase().includes(search.toUpperCase())
      })
    }

    return (
      <div>
        <Header as='h2' content='Enhetstyper' dividing />

        <Popup trigger={<Input icon='search' placeholder='Søk...' value={search}
                               onChange={this.searchInputOnChange} />}
               flowing hoverable hideOnScroll position='right center'>
          <Icon color='blue' name='info circle' />
          Filtrerer tabellen etter navn
        </Popup>

        <UnitTypeModal ref={(UnitTypeModal => {this.UnitTypeModal = UnitTypeModal})}
                       unitTypeId={selectedUnitTypeId} handleIsNewUnitType={this.handleIsNewUnitType}
                       key={selectedUnitTypeId} />

        <Divider hidden />

        <ReactTable
          sortable
          data={filteredTableData}
          loading={loadingTable}
          resizable={false}
          columns={tableColumns}
          defaultPageSize={10}
          noDataText={'Fant ingen enhetstyper med navnet: \'' + search + '\''}
          previousText='Forrige'
          nextText='Neste'
          loadingText='Laster...'
          pageText='Side'
          ofText='av'
          rowsText='rader'
          className='-striped -highlight'
        />
      </div>
    )
  }
}

const tempTableData = [
  {
    id: 'sdafgasd',
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

export default UnitType