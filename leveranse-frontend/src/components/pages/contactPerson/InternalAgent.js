import React from 'react'
import { Divider } from 'semantic-ui-react'
import AgentTable from './AgentTable'
import { sendDataToBackend, deleteDataInBackend } from '../../../utils/Common'

const saveContactPersonUrl = '/contactPerson'
const deleteContactPersonPaConnectionUrl = '/contactPerson/provisionAgreement/'

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
    let uuAiripaId = uuidv1()

    this.state.internalAgents = [{
        paId: uupaId,
        id: uuId,
        roleId: '',
        agentId: uuAgentId,
        individualId: uuIndividualId,
        airipaId: uuAiripaId,
        internalExternal: 'I',
        name: '',
        email: '',
        phoneNumber: '',
        comment: ''
      }]
    this.handleAgentTable = this.handleAgentTable.bind(this)
  }

  handleRowDel (agent) {
    console.log('Sendes til backend for sletting:')
    console.log(agent)
    deleteDataInBackend(deleteContactPersonPaConnectionUrl, 'Kontaktpersonens kobling til PA', agent.airipaId).then((result) => {
      console.log(result)
      if (result.status === 204) {
        let index = this.state.internalAgents.indexOf(agent)
        this.state.internalAgents.splice(index, 1)
        this.setState(this.state.internalAgents)
      }
    })
  }

  handleRowSave (agent) {
    console.log('Sendes til backend for lagring:')
    console.log(agent)
    sendDataToBackend(saveContactPersonUrl, 'Kontaktperson', agent).then((result) => {
      console.log(result)
    })
  }

  handleAddEvent () {
    const uuidv1 = require('uuid/v1')
    let uupaId = uuidv1()
    let uuId = uuidv1()
    let uuAgentId = uuidv1()
    let uuIndividualId = uuidv1()
    let uuAiripaId = uuidv1()

    let agent = {
      paId: uupaId,
      id: uuId,
      roleId: '',
      agentId: uuAgentId,
      individualId: uuIndividualId,
      airipaId: uuAiripaId,
      internalExternal: 'I',
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

  render () {
    const editMode = this.props.editMode

    return (
      <div>
        <Divider horizontal>Intern</Divider>
        <AgentTable onAgentTableUpdate={this.handleAgentTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)}
                    onAgentTableUpdateDropdown={this.handleAgentTableDropdown.bind(this)}
                    onRowDel={this.handleRowDel.bind(this)}
                    onRowSave={this.handleRowSave.bind(this)}
                    agents={this.state.internalAgents}
                    editMode={editMode} />
      </div>
    )
  }
}

export default InternalAgent





