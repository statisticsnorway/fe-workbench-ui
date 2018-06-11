import React from 'react'
import { Divider, Header, Icon, Input, Popup, Button, Modal } from 'semantic-ui-react'
import ReactTable from 'react-table'
import ValueDomainModal from './ValueDomainModal'

const tableHeaders = [
  ['description', 'Beskrivelse'],
  ['name', 'Navn'],
  ['dataType', 'Datatype']
]

const tempTableData = [
  {
    id: 1,
    name: 'Positivt heltall',
    description: 'Positivt heltall. Min: 0. Max: 1000 000. Tom ikke tillatt.',
    dataType: 'Heltall'
  },
  {
    id: 2,
    name: 'Negativt heltall',
    description: 'Negativt heltall. Min: -1000 000 kr. Max: 0. Tom ikke tillatt.',
    dataType: 'Heltall'
  },
  {
    id: 3,
    name: 'Positivt demimaltall',
    description: 'Positivt desimaltall. Uendelig til uendelig. 0-2 desimaler. I kr. Tom er tillatt',
    dataType: 'Desimaltall'
  },
  {
    id: 4,
    name: 'Negativt demimaltall',
    description: 'Negativt desimaltall. Uendelig til uendelig. 0-2 desimaler. I kr. Tom er tillatt',
    dataType: 'Desimaltall'
  },
  {
    id: 5,
    name: 'Dato',
    description: 'Boolsk variabel. Sann/Usann. Tom er tillatt',
    dataType: 'Dato'
  },
  {
    id: 6,
    name: 'Tekst',
    description: 'Streng av tegn. Opptil 2000 tegn. Tom er tillatt',
    dataType: 'Tekst'
  }
]

const noDataText = 'Fant ingen verdiområde med navnet: '
let tableColumns

class ValueDomainList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      valueDomainModalOpen: false,
      search: '',
      tableData: tempTableData,
      loadingTable: false,
      selectedValueDomainId: 'new'
    }

    tableColumns = tableHeaders.map((row) => {
      let tableColumn = {}
      tableColumn['Header'] = row[1]
      tableColumn['accessor'] = row[0]

      return tableColumn
    })

    this.searchInputOnChange = this.searchInputOnChange.bind(this)
  }

  searchInputOnChange (event) {
    this.setState({
      search: event.target.value
    })
  }

  handleSelectedValueDomain = (id) => {
    return new Promise((resolve) => {
      this.setState({selectedValueDomainId: id})
      resolve(true)
    })
  }

  setStateThenOpenModal (id) {
    this.handleSelectedValueDomain(id).then(() => {
      this.ValueDomainModal.handleValueDomainModalOpen()
    })
  }

  handleIsNewValueDomain = () => {
    this.handleSelectedValueDomain('new').then(() => {
      this.ValueDomainModal.handleValueDomainModalOpen()
    })
  }

  render () {
    const {search, tableData, loadingTable, selectedValueDomainId} = this.state
    let filteredTableData = tableData

    if (search) {
      filteredTableData = tableData.filter(row => {
        return row.name.toUpperCase().includes(search.toUpperCase())
      })
    }

    return (
      <div>
        <Header as='h2' content='Søk opp verdiområde' dividing />

        <Popup trigger={<Input icon='search' placeholder='Søk...' value={search}
                               onChange={this.searchInputOnChange} />}
               flowing hoverable hideOnScroll position='right center'>
          <Icon color='blue' name='info circle' />
          Filtrerer tabellen etter navn
        </Popup>

        <ValueDomainModal ref={(ValueDomainModal => {this.ValueDomainModal = ValueDomainModal})}
                          valueDomainId={selectedValueDomainId} handleIsNewValueDomain={this.handleIsNewValueDomain}
                          key={selectedValueDomainId} />

        <Divider hidden />

        <ReactTable
          data={filteredTableData}
          columns={tableColumns}
          noDataText={noDataText + '\'' + search + '\''}
          defaultPageSize={10}
          previousText='Forrige'
          nextText='Neste'
          loadingText='Laster...'
          pageText='Side '
          ofText='av'
          rowsText='rader'
          className='-striped -highlight'
        />

      </div> )
  }
}

export default ValueDomainList