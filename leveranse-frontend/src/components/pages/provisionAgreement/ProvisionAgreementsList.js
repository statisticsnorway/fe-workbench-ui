import React from 'react'
import axios from 'axios'
import { Grid, Header, Message, Segment } from 'semantic-ui-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

let provisionAgreements
let selectedProvisionalAgreement

class ProvisionAgreementsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      provisionAgreements: [],
      selectedIndex: -1,
      loading: true,
      response: {}
    }

    this.fetchAllStoredProvisionAgreements()
    this.selectProvisionAgreement = this.selectProvisionAgreement.bind(this)
    this.onClickProvisionAgreement = this.onClickProvisionAgreement.bind(this)
  }

  fetchAllStoredProvisionAgreements () {
    let url

    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/provisionAgreement'

    axios.get(url).then((response) => {
      console.log(response)
      if (response.status === 200) {
        this.setState({
          provisionAgreements: response.data
        })
      } else {
        this.setState({
          response: {
            header: 'Noe gikk galt ved henting av leveranseavtaler',
            text: response.statusText + ' (' + url + ')',
            color: 'yellow',
            icon: 'warning'
          }
        })
      }
    }).catch((error) => {
      console.log(error)

      this.setState({
        response: {
          header: 'Noe gikk galt ved henting av leveranseavtaler',
          text: error.message + ' (' + url + ')',
          color: 'red',
          icon: 'warning'
        }
      })
    }).then(() => {
      this.setState({
        loading: false
      })
    })
  }

  renderCell (row) {
    if (row.original.selected == true) {
      return (<div style={{cursor: 'default', fontWeight: 'bold'}}>{row.value}</div>)
    }

    return (<div style={{cursor: 'default', fontWeight: 'normal'}}>{row.value}</div>)
  }

  componentWillReceiveProps (nextProps) {
    var annotated = this.annotateProvisionAgreement(nextProps.provisionAgreements)
    this.setState({provisionAgreements: annotated})
  }

  // Assume that any data we're getting doesn't have our hidden 'selected' feature. So
  // here we add it manually
  annotateProvisionAgreement (provisionAgreementList) {
    var annotated = new Array()

    for (var i = 0; i < provisionAgreementList.length; i++) {
      var converter = provisionAgreementList[i]
      converter['selected'] = false
      annotated.push(converter)
    }

    return (annotated)
  }

  selectProvisionAgreement (e, state, column, rowInfo, instance) {
    if (this.state.selectedIndex != -1) {
      var ProvisionAgreementOld = this.state.provisionAgreements[this.state.selectedIndex]
      ProvisionAgreementOld.selected = false
    }

    var provisionAgreement = this.state.provisionAgreements[rowInfo.index]
    provisionAgreement.selected = true

    console.log('selected PA: ', provisionAgreement)
    if (provisionAgreement != null) {
      let PA = this.onClickProvisionAgreement(provisionAgreement.id)
    } else {
      console.log('Error retrieving PA from PA list')
    }

    this.setState({selectedIndex: rowInfo.index})
  }

  onClickProvisionAgreement (id) {
    let url

    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/provisionAgreement/' + id

    axios.get(url).then((response) => {
      console.log('Fetched PA: ', response)

      selectedProvisionalAgreement = response.data

      if (response.status === 200) {
        selectedProvisionalAgreement
      } else {
        this.setState({
          response: {
            header: 'Noe gikk galt ved henting av leveranseavtalen',
            text: response.statusText + ' (' + url + ')',
            color: 'yellow',
            icon: 'warning'
          }
        })
      }
    }).catch((error) => {
      console.log(error)

      this.setState({
        response: {
          header: 'Noe gikk galt ved henting av leveranseavtalen',
          text: error.message + ' (' + url + ')',
          color: 'red',
          icon: 'warning'
        }
      })
    }).then(() => {
      this.setState({
        loading: false
      })
    })
  }

  render () {
    const {response, loading} = this.state
    const data = provisionAgreements

    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Description',
      accessor: 'description'
    }, {
      Header: 'Duration From', // Required because our accessor is not a string
      accessor: 'durationFrom'
    }, {
      Header: 'Duration To', // Required because our accessor is not a string
      accessor: 'durationTo'
    }]

    console.log('data In render()', data)
    console.log('In render()', columns)

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
                  data={data}
                  columns={columns}
                  noDataText='No data!'
                  filterable
                  defaultPageSize={10}
                  style={{
                    height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
                  }}
                  className='-striped -highlight'
                  showPaginationTop
                  showPaginationBottom
                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: e => { this.selectProvisionAgreement(e, state, column, rowInfo, instance) }
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