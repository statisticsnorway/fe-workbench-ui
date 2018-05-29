import React from 'react'
import axios from 'axios'
import { Divider } from 'semantic-ui-react'
import AgentTable from './AgentTable'

class ExternalAgent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      response: {}
    }

    const uuidv1 = require('uuid/v1')
    let uupaId = uuidv1()
    let uuId = uuidv1()
    let uuAgentId = uuidv1()
    let uuIndividualId = uuidv1()

    this.state.externalAgents = [{
      paId: uupaId,
      id: uuId,
      roleId: '',
      agentId: uuAgentId,
      individualId: uuIndividualId,
      internalExternal: 'E',
      name: '',
      email: '',
      phoneNumber: '',
      comment: ''
    }]

    this.handleAgentTable = this.handleAgentTable.bind(this)
  }

  handleRowDel (agent) {
    let index = this.state.externalAgents.indexOf(agent)

    this.state.externalAgents.splice(index, 1)
    this.setState(this.state.externalAgents)
  }

  handleAddEvent () {
    const uuidv1 = require('uuid/v1')
    let uupaId = uuidv1()
    let uuId = uuidv1()
    let uuAgentId = uuidv1()
    let uuIndividualId = uuidv1()

    let agent = {
      paId: uupaId,
      id: uuId,
      roleId: '',
      agentId: uuAgentId,
      individualId: uuIndividualId,
      internalExternal: 'E',
      name: '',
      email: '',
      phoneNumber: '',
      comment: ''
    }

    this.state.externalAgents.push(agent)
    this.setState(this.state.externalAgents)
  }

  handleAgentTable (evt) {
    let item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    }
    let agents = this.state.externalAgents.slice()
    let newAgents = agents.map(function (agent) {
      for (let key in agent) {
        if (key === item.name && agent['id'] === item.id) {
          agent[key] = item.value
        }
      }

      return agent
    })

    this.setState({externalAgents: newAgents})
  }

  handleAgentTableDropdown (id, name, value) {
    let item = {
      id: id,
      name: name,
      value: value
    }
    let agents = this.state.externalAgents.slice()
    let newAgents = agents.map(function (agent) {
      for (let key in agent) {
        if (key === item.name && agent['id'] === item.id) {
          agent[key] = item.value
        }
      }

      return agent
    })

    this.setState({externalAgents: newAgents})
  }

  prepareDataForBackend (agent) {
    let data = agent

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }

    JSON.stringify(data)

    return data
  }

  sendDataToBackend (data) {
    let responseStatus
    let errorMessage
    let responseMessage
    let url
    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/contactPerson'

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      responseStatus = response.status
      responseMessage = response.statusText
    })
      .catch(function (error) {
        console.log(error)
        responseStatus = 'Error'
        errorMessage = error.message
      })
      .then(() => {
        if (responseStatus === 201) {
          this.setState({
            response: {
              color: 'green',
              text: 'Ekstern kontaktperson ble lagret: ' + [responseMessage]
            }
          })
        } else if (responseStatus === 'Error') {
          this.setState({
            response: {
              color: 'red',
              text: 'Ekstern kontaktperson ble ikke lagret: ' + [errorMessage]
            }
          })
        } else {
          this.setState({
            response: {
              color: 'yellow',
              text: 'Ekstern kontaktpersoner ble ikke lagret: ' + [responseMessage]
            }
          })
        }
      })
  }

  registerExternalAgents () {
    let agents = this.state.externalAgents.slice()
    let data

    agents.forEach((agent) => {
      data = this.prepareDataForBackend (agent)
      console.log(data)
      this.sendDataToBackend(data)
    })
  }

  render () {
    const editMode = this.props.editMode

    return (
      <div>
        <Divider horizontal>Ekstern</Divider>
        <AgentTable onAgentTableUpdate={this.handleAgentTable.bind(this)}
                    onAgentTableUpdateDropdown={this.handleAgentTableDropdown.bind(this)}
                    onRowAdd={this.handleAddEvent.bind(this)}
                    onRowDel={this.handleRowDel.bind(this)} agents={this.state.externalAgents}
                    editMode={editMode} />
      </div>
    )
  }
}

export default ExternalAgent





