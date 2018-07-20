import React from 'react'
import {Grid, Header, Message, Segment} from 'semantic-ui-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {getDataFromBackend} from "../../utils/Common";

let selectedProvisionalAgreement

class ProvisionAgreementsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      provisionAgreements: [],
      selectedIndex: -1,
      loading: true,
      response: {}
    }
    this.selectProvisionAgreement = this.selectProvisionAgreement.bind(this)
    this.onClickProvisionAgreement = this.onClickProvisionAgreement.bind(this)
  }

  componentDidMount() {
    getDataFromBackend('ProvisionAgreement/', this.state.provisionAgreements).then((result) => {
      this.setState(prevState => ({
        provisionAgreements: [...prevState.provisionAgreements, result.data],
        waitingForResponse: false,
        loading: false
      }))
    })
  }

  renderCell(row) {
    if (row.original.selected === true) {
      return (<div style={{cursor: 'default', fontWeight: 'bold'}}>{row.value}</div>)
    }
    return (<div style={{cursor: 'default', fontWeight: 'normal'}}>{row.value}</div>)
  }

  selectProvisionAgreement(e, state, column, rowInfo, instance) {
    if (this.state.selectedIndex != -1) {
      let ProvisionAgreementOld = this.state.provisionAgreements[this.state.selectedIndex]
      ProvisionAgreementOld.selected = false
    }
    let provisionAgreement = this.state.provisionAgreements[0][rowInfo.index]
    provisionAgreement.selected = true

    if (provisionAgreement != null) {
      let PA = this.onClickProvisionAgreement(provisionAgreement.id)
    } else {
      console.log('Error retrieving PA from PA list')
    }
    this.setState({selectedIndex: rowInfo.index})
  }

  onClickProvisionAgreement(id) {
    getDataFromBackend('ProvisionAgreement/' + id, this.state.provisionAgreements).then((result) => {
      selectedProvisionalAgreement = result.data
    })
  }

  render() {
    const {response, loading} = this.state
    const data = this.state.provisionAgreements
    const columns = [{
      Header: 'Name',
      accessor: 'name[0].languageText'// String-based value accessors!
    }, {
      Header: 'Description',
      accessor: 'description[0].languageText'
    }, {
      Header: 'Duration From', // Required because our accessor is not a string
      accessor: 'validFrom'
    }, {
      Header: 'Duration To', // Required because our accessor is not a string
      accessor: 'validTo'
    }]

    return (
      <div>
        <Grid container stackable>
          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <Segment loading={loading}>
                <Header as='h3' content='Leveranseavtaler' dividing />
                {Object.keys(response).length !== 0 ?
                  <Message icon={response.icon} color={response.color} header={response.header}
                           content={response.content} /> : null}
                {loading ? null : <ReactTable
                  data={data[0]}
                  columns={columns}
                  noDataText='No data!'
                  filterable
                  defaultPageSize={10}
                  style={{
                    height: '400px' //To adjust table height. Adds scroll to the table
                  }}
                  className='-striped -highlight'
                  showPaginationTop
                  showPaginationBottom
                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: e => {
                        this.selectProvisionAgreement(e, state, column, rowInfo, instance)
                      }
                    }
                  }}
                />}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default ProvisionAgreementsList