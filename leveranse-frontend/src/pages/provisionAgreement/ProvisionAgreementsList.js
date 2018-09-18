import React from 'react'
import { Header, Message, Segment } from 'semantic-ui-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { getDataFromBackend } from '../../utils/Common'


class ProvisionAgreementsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      provisionAgreements: [],
      selectedProvisionAgreement: '',
      selectedIndex: -1,
      loading: true,
      response: {}
    }

    this.selectProvisionAgreement = this.selectProvisionAgreement.bind(this)
  }

  componentDidMount() {
    getDataFromBackend('ProvisionAgreement/', this.state.provisionAgreements).then((result) => {
      this.setState(prevState => ({
        response: result
      }))
      if(result.data){
        this.setState(prevState => ({
          provisionAgreements: [...prevState.provisionAgreements, result.data],
          waitingForResponse: false,
          loading: false
        }))
      } else {
        this.setState(prevState => ({
          provisionAgreements: '',
          waitingForResponse: false,
          loading: false
        }))
      }
    })
  }

  selectProvisionAgreement(e, state, column, rowInfo, instance) {
    let provisionAgreement = this.state.provisionAgreements[0][rowInfo.index]

    if(provisionAgreement != null){
      getDataFromBackend('ProvisionAgreement/' + provisionAgreement.id, this.state.provisionAgreements).then((result) => {
        this.setState({
          selectedIndex: rowInfo.index,
          selectedProvisionAgreement: result.data
        })
        this.props.history.push({
          pathname: "/provisionAgreement",
          state: {
            selectedProvisionAgreement: result.data
          }
        });
      })
    } else {
      console.log('Error retrieving PA from PA list')
    }
  }

  render() {
    const {response, loading} = this.state
    const data = this.state.provisionAgreements
    const columns = [{
      Header: 'Name',
      accessor: 'name[0].languageText'
    }, {
      Header: 'Description',
      accessor: 'description[0].languageText'
    }, {
      Header: 'Duration From',
      accessor: 'validFrom'
    }, {
      Header: 'Duration To',
      accessor: 'validTo'
    }]

    return (
      <Segment loading={loading}>
        <Header as='h3' content='Leveranseavtaler' dividing />
        {Object.keys(response).length !== 0 ?
          <Message icon={response.icon} color={response.color} header={response.header}
                   content={response.content} /> : null}
        {loading ? null :
          <ReactTable
            data={data[0]}
            columns={columns}
            noDataText='No data!'
            filterable
            defaultPageSize={10}
            previousText='Forrige'
            nextText='Neste'
            loadingText='Laster...'
            pageText='Side '
            ofText='av'
            rowsText='rader'
            className='-striped -highlight'
            style={{height: '400px'}}
            className='-striped -highlight'
            showPaginationTop
            showPaginationBottom
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                style: {
                  cursor: 'pointer'
                },
                onClick: e => {
                  if(data.length > 0){
                    this.selectProvisionAgreement(e, state, column, rowInfo, instance)
                  }
                }
              }
            }}
          />
        }
      </Segment>
    )
  }
}

export default ProvisionAgreementsList