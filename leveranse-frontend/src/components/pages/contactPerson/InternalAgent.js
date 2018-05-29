import React from 'react'
import axios from 'axios'
import { Divider } from 'semantic-ui-react'
import AgentTable from './AgentTable'

class InternalAgent extends React.Component {
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

    this.state.internalAgents = [
      {
        paId: uupaId,
        id: uuId,
        roleId: '',
        agentId: uuAgentId,
        individualId: uuIndividualId,
        internalExternal: 'internal',
        name: '',
        email: '',
        phoneNumber: '',
        comment: ''
      }
    ]
    this.handleAgentTable = this.handleAgentTable.bind(this)
  }

  handleRowDel (agent) {
    let index = this.state.internalAgents.indexOf(agent)

    this.state.internalAgents.splice(index, 1)
    this.setState(this.state.internalAgents)
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
      internalExternal: 'internal',
      name: '',
      email: '',
      phoneNumber: '',
      comment: ''
    }

    this.state.internalAgents.push(agent)
    this.setState(this.state.internalAgents)
  }

  handleAgentTable (evt) {
    let item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    }
    let agents = this.state.internalAgents.slice()
    let newAgents = agents.map(function (agent) {
      for (let key in agent) {
        if (key === item.name && agent['id'] === item.id) {
          agent[key] = item.value
        }
      }

      return agent
    })
    this.setState({internalAgents: newAgents})
  }

  handleAgentTableDropdown (id, name, value) {
    let item = {
      id: id,
      name: name,
      value: value
    }
    let agents = this.state.internalAgents.slice()
    let newAgents = agents.map(function (agent) {
      for (let key in agent) {
        if (key === item.name && agent['id'] === item.id) {
          agent[key] = item.value
        }
      }

      return agent
    })

    this.setState({internalAgents: newAgents})
  }

  prepareDataForBackend () {
    let data = {...this.state.internalAgents}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }

    JSON.stringify(data)

    return data
  }

  registerInternalAgents () {
    let responseStatus
    let errorMessage
    let responseMessage
    let url

    let data

    data = this.prepareDataForBackend()
    console.log(data)

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
              text: 'Eksterne kontaktpersoner ble lagret: ' + [responseMessage]
            }
          })
        } else if (responseStatus === 'Error') {
          this.setState({
            response: {
              color: 'red',
              text: 'Eksterne kontaktpersoner ble ikke lagret: ' + [errorMessage]
            }
          })
        } else {
          this.setState({
            response: {
              color: 'yellow',
              text: 'Eksterne kontaktpersoner ble ikke lagret: ' + [responseMessage]
            }
          })
        }
      })

  }

  render () {
    const editMode = this.props.editMode

    return (
      <div>
        <Divider horizontal>Intern</Divider>
        <AgentTable onAgentTableUpdate={this.handleAgentTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)}
                    onAgentTableUpdateDropdown={this.handleAgentTableDropdown.bind(this)}
                    onRowDel={this.handleRowDel.bind(this)} agents={this.state.internalAgents}
                    editMode={editMode} />
      </div>
    )
  }
}

export default InternalAgent





