import React from 'react'
import axios from 'axios'
import { Grid, List, Loader, Message, Segment } from 'semantic-ui-react'

let provisionAgreements = []

let listItems

class ProvisionAgreementsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      response: {}
    }

    this.fetchAllStoredProvisionAgreements()
  }

  fetchAllStoredProvisionAgreements () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url

    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/provisionAgreement'

    axios.get(url)
      .then((response) => {
        console.log(response)

        responseStatus = response.status
        responseMessage = response.statusText
        provisionAgreements = response.data

        if (responseStatus === 200) {
          listItems = provisionAgreements.map((provisionAgreement) =>
            <List.Item key={provisionAgreement.id}>
              <List.Header>{provisionAgreement.name}</List.Header>
              <List.Description>{provisionAgreement.description}</List.Description>
            </List.Item>
          )
        }
      })
      .catch((error) => {
        console.log(error)
        responseStatus = 'Error'
        errorMessage = error.message
      })
      .then(() => {
        if (responseStatus === 'Error') {
          this.setState({
            loading: false,
            response: {
              text: errorMessage,
              color: 'red'
            }
          })
        }
        else if (responseStatus !== 200) {
          this.setState({
            loading: false,
            response: {
              text: responseMessage,
              color: 'yellow'
            }
          })
        } else {
          this.setState({
            loading: false,
            response: {}
          })
        }
      })
  }

  render () {
    const {response} = this.state

    return (
      <div>
        <Grid container stackable>
          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <Segment>
                {this.state.loading ? <Loader active size='mini' /> : <List>{listItems}</List>}
                {Object.keys(response).length !== 0 ?
                  <Message color={response.color}><Message.Header>Noe gikk galt ved henting av
                    leveranseavtaler</Message.Header>{response.text}</Message> : null}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default ProvisionAgreementsList