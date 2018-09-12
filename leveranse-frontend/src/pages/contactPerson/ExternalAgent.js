import React, { Component } from 'react'
import { Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AgentTable from './AgentTable'
import { sendDataToBackend, getDataFromBackend } from '../../utils/Common'
import moment from "moment/moment";

const roleUrl = 'Role/'
const agentUrl = 'Agent/'
const agentInRoleUrl = 'AgentInRole/'
const provisionAgreementUrl = 'ProvisionAgreement/'
let roleAsContactPerson
let agentInRoleAsContactPerson
let agentsInRoleForPA
let linkedRoles = []

class ExternalAgent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      response: {}
    }

    const uuidv1 = require('uuid/v1')
    let uuAgentId = uuidv1()

    this.state.externalAgents = [ {
      id: uuAgentId,
      agentType: '',
      selectedRole: '',
      name: [
        {
          languageCode: "nb",
          languageText: ''
        }
      ],
      description: [
        {
          "languageCode": "nb",
          "languageText": ''
        }
      ],
      isExternal: true,
      email: '',
      phoneNumber: '',
      comment: '',
      administrativeStatus: 'OPEN',
      version: "1.0.0",
      versionValidFrom: moment().toJSON(),
      validFrom: moment().toJSON(),
      createdDate: moment().toJSON(),
      createdBy: this.props.authentication.user,
    } ]
    this.handleAgentTable = this.handleAgentTable.bind(this)
  }

  componentDidMount () {
    getDataFromBackend(roleUrl, '').then((result) => {
      let roles = result.data
      for (var key in roles) {
        var role = roles[ key ];
        for (var attribute in role) {
          if (role.hasOwnProperty(attribute)) {
            if (attribute === 'name') {
              let languageText = role[ attribute ][ 0 ].languageText
              if (languageText === 'KONTAKTPERSON') {
                roleAsContactPerson = role
              }
            }
          }
        }
      }
    })
  }

  componentDidUpdate () {
    getDataFromBackend(roleUrl, '').then((result) => {
      let roles = result.data
      for (var key in roles) {
        var role = roles[ key ];
        for (var attribute in role) {
          if (role.hasOwnProperty(attribute)) {
            if (attribute === 'name') {
              let languageText = role[ attribute ][ 0 ].languageText
              if (languageText === 'KONTAKTPERSON') {
                roleAsContactPerson = role
              }
            }
          }
        }
      }
    })
    let linkedPA = this.props.linkedPA[ 0 ]
    linkedRoles = []
    let linkedAgentsInRole = []

    getDataFromBackend('ProvisionAgreement/' + linkedPA.id + '/agentInRoles/', '').then((result) => {
      agentsInRoleForPA = result.data
      console.log("AgentInRoles for linked PA::", agentsInRoleForPA)
      //fetch all the linked AgentsInRole for PA
      for (let key in agentsInRoleForPA) {
        let agentInRoleId = agentsInRoleForPA[ key ].substring(13, agentsInRoleForPA[ key ].length)
        linkedAgentsInRole.push(agentInRoleId)
      }

      for (var linkedAgentInRole in linkedAgentsInRole) {
        let agentInRoleId = linkedAgentsInRole[ linkedAgentInRole ]
        //fetch AgentInRole with Role as KONTAKTPERSON
        getDataFromBackend(agentInRoleUrl + agentInRoleId, '').then((result) => {
          console.log(result)
          let agentInRole = result.data
          let linkedRoleId = agentInRole[ 'role' ].substring(6, agentInRole[ 'role' ].length)
          getDataFromBackend(roleUrl + linkedRoleId, '').then((result) => {
            let role = result.data
            if (role.id === roleAsContactPerson.id) {
              agentInRoleAsContactPerson = agentInRole
            } else {
              linkedRoles.push(role.id)
            }
          })
        })
      }
    })
  }

  handleRowDel (agent) {
    console.log('Remove Agent In Role:', agent)
    let linkedAgentsInRole = []
    let agents = []

    //fetch all the linked AgentsInRole for PA
    for (let key in agentsInRoleForPA) {
      let agentInRoleId = agentsInRoleForPA[ key ].substring(13, agentsInRoleForPA[ key ].length)
      linkedAgentsInRole.push(agentInRoleId)
    }

    for(var linkedAgentInRole in linkedAgentsInRole){
      getDataFromBackend(agentInRoleUrl + linkedAgentsInRole[ linkedAgentInRole ], '').then((result) => {
        let agentInRole = result.data
        agents = agentInRole['agents']
        let roleId = agentInRole['role'].substring(6, agentInRole['role'].length)
        let agentToDelete = "/Agent/"+agent.id
        if(roleId === agentInRoleAsContactPerson.role.substring(6, agentInRoleAsContactPerson.role.length)){
          console.log("Agent to be removed belongs to ContactPerson AgentInRole: ", agentInRole)
          console.log("Agent to be removed:", agentToDelete)
          console.log("Agents before removal:", agents)
          agents = agents.filter(function (el) {
            return (el !== agentToDelete);
          });
          //agents.filter(agent => agent !== agentToDelete )
          console.log("Agents after removal:", agents)
          agentInRole.agents = []
          agentInRole.agents = agents
          sendDataToBackend(agentInRoleUrl + agentInRole.id, 'AgentInRole', agentInRole).then((result) => {
            console.log(result.header)
          })
        }
        if(roleId === agent.selectedRole){
          console.log("Agent to be removed belongs to AgentInRole: ", agentInRole)
          console.log("Agent to be removed:", agentToDelete)
          console.log("Agents before removal:", agents)
          agents = agents.filter(function (el) {
            return (el !== agentToDelete);
          });
          //agents.filter(agent => agent !== agentToDelete )
          console.log("Agents after removal:", agents)

          agentInRole.agents = []
          agentInRole.agents = agents
          sendDataToBackend(agentInRoleUrl + agentInRole.id, 'AgentInRole', agentInRole).then((result) => {
            console.log(result.header)
            let index = this.state.externalAgents.indexOf(agent)
            this.state.externalAgents.splice(index, 1)
            this.setState(this.state.externalAgents)
          })
        }
      })
    }
  }

  handleRowSave (agent) {

    let externalAgent = {
      id: agent.id,
      agentType: agent.agentType,
      name: agent.name,
      description: agent.description,
      isExternal: true,
      agentDetails: [
        {
          agentDetailType: "CONTACT_EMAIL",
          values: [ agent.email ]
        },
        {
          agentDetailType: "CONTACT_PHONE",
          values: [ agent.phoneNumber ]
        }
      ],
      administrativeStatus: agent.administrativeStatus,
      version: agent.version,
      versionValidFrom: agent.versionValidFrom,
      validFrom: agent.validFrom,
      createdDate: agent.createdDate,
      createdBy: agent.createdBy
    }

    console.log('Create Agent:', externalAgent)

    //create agent
    sendDataToBackend(agentUrl + externalAgent.id, 'Agent', externalAgent).then((result) => {
      console.log(result.header)
      if (result.status === 200) {
        console.log("Created agent at backend: ", externalAgent)
        const uuidv1 = require('uuid/v1')
        let uuAgentInSelectedRoleId = uuidv1()
        let uuAgentInContactPersonRoleId = uuidv1()
        let externalAgentInContactRole
        let externalAgentInSelectedRole
        let linkedAgentsInRole = []

        //fetch all the linked AgentsInRole for PA
        for (let key in agentsInRoleForPA) {
          let agentInRoleId = agentsInRoleForPA[ key ].substring(13, agentsInRoleForPA[ key ].length)
          linkedAgentsInRole.push(agentInRoleId)
        }

        if (agentsInRoleForPA.length === 0) {
          externalAgentInContactRole = {
            id: uuAgentInContactPersonRoleId,
            name: agent.name,
            description: agent.description,
            administrativeStatus: agent.administrativeStatus,
            version: agent.version,
            versionValidFrom: agent.versionValidFrom,
            validFrom: agent.validFrom,
            createdDate: agent.createdDate,
            createdBy: agent.createdBy,
            role: "/Role/" + roleAsContactPerson.id,
            agents: []
          }
          externalAgentInContactRole.agents.push("/Agent/" + externalAgent.id)

          externalAgentInSelectedRole = {
            id: uuAgentInSelectedRoleId,
            name: agent.name,
            description: agent.description,
            administrativeStatus: agent.administrativeStatus,
            version: agent.version,
            versionValidFrom: agent.versionValidFrom,
            validFrom: agent.validFrom,
            createdDate: agent.createdDate,
            createdBy: agent.createdBy,
            role: "/Role/" + agent.selectedRole,
            agents: []
          }
          externalAgentInSelectedRole.agents.push("/Agent/" + externalAgent.id)

          sendDataToBackend(agentInRoleUrl + externalAgentInContactRole.id, 'AgentInRole', externalAgentInContactRole).then((result) => {
            console.log(result.header)
            if (result.status === 200) {
              console.log(result.header)
              agentsInRoleForPA.push(externalAgentInContactRole)
              sendDataToBackend(agentInRoleUrl + externalAgentInSelectedRole.id, 'AgentInRole', externalAgentInSelectedRole).then((result) => {
                console.log(result.header)
                if (result.status === 200) {
                  agentsInRoleForPA.push(externalAgentInSelectedRole)
                  this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + externalAgentInContactRole.id)
                  this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + externalAgentInSelectedRole.id)
                  sendDataToBackend(provisionAgreementUrl + this.props.linkedPA[ 0 ].id,
                    'ProvisionAgreement', this.props.linkedPA[ 0 ]).then((result) => {
                    console.log(result.header)
                  })
                }
              })
            }
          })
        } else {
          console.log("Already added AgentsInRole: ", linkedAgentsInRole)
          console.log("Already added roles: ", linkedRoles)
          console.log("AgentInRole for ContactPerson: ", agentInRoleAsContactPerson)

          agentInRoleAsContactPerson.agents.push("/Agent/" + externalAgent.id)
          sendDataToBackend(agentInRoleUrl + agentInRoleAsContactPerson.id, 'AgentInRole', agentInRoleAsContactPerson).then((result) => {
            console.log(result)
            if (linkedRoles.includes(agent.selectedRole)) {
              for (var linkedAgentInRole in linkedAgentsInRole) {
                getDataFromBackend(agentInRoleUrl + linkedAgentsInRole[ linkedAgentInRole ], '').then((result) => {
                  let agentInRole = result.data
                  let linkedRole = agentInRole[ 'role' ]
                  let roleId = linkedRole.substring(6, linkedRole.length)
                  if (roleId === agent.selectedRole) {
                    agentInRole.agents.push("/Agent/" + externalAgent.id)
                    sendDataToBackend(agentInRoleUrl + agentInRole.id, 'AgentInRole', agentInRole).then((result) => {
                      console.log("AgentInRole with role already present updated")
                    })
                  }
                })
              }
            } else {
              externalAgentInSelectedRole = {
                id: uuAgentInSelectedRoleId,
                name: agent.name,
                description: agent.description,
                administrativeStatus: agent.administrativeStatus,
                version: agent.version,
                versionValidFrom: agent.versionValidFrom,
                validFrom: agent.validFrom,
                createdDate: agent.createdDate,
                createdBy: agent.createdBy,
                role: "/Role/" + agent.selectedRole,
                agents: []
              }
              externalAgentInSelectedRole.agents.push("/Agent/" + externalAgent.id)

              sendDataToBackend(agentInRoleUrl + externalAgentInSelectedRole.id, 'AgentInRole', externalAgentInSelectedRole).then((result) => {
                console.log(result.header)
                if (result.status === 200) {
                  agentsInRoleForPA.push(externalAgentInSelectedRole)
                  console.log(result.header)
                  this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + externalAgentInSelectedRole.id)
                  sendDataToBackend(provisionAgreementUrl + this.props.linkedPA[ 0 ].id,
                    'ProvisionAgreement', this.props.linkedPA[ 0 ]).then((result) => {
                    console.log(result.header)
                  })
                }
              })
            }
          })
        }
      }
    })
  }

  handleAddEvent () {
    const uuidv1 = require('uuid/v1')
    let uuAgentId = uuidv1()

    let agent = {
      id: uuAgentId,
      agentType: '',
      selectedRole: '',
      name: [
        {
          languageCode: "nb",
          languageText: ''
        }
      ],
      description: [
        {
          "languageCode": "nb",
          "languageText": ''
        }
      ],
      isExternal: true,
      email: '',
      phoneNumber: '',
      comment: '',
      administrativeStatus: 'OPEN',
      version: "1.0.0",
      versionValidFrom: moment().toJSON(),
      validFrom: moment().toJSON(),
      createdDate: moment().toJSON(),
      createdBy: this.props.authentication.user,
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
        if (key === item.name && agent[ 'id' ] === item.id) {
          if (key === 'name' || key === 'description') {
            agent[ key ][ 0 ].languageText = item.value
          } else {
            agent[ key ] = item.value
          }
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
        if (key === item.name && agent[ 'id' ] === item.id) {
          if (key === 'name' || key === 'description') {
            agent[ key ][ 0 ].languageText = item.value
          } else {
            agent[ key ] = item.value
          }
        }
      }
      return agent
    })

    this.setState({externalAgents: newAgents})
  }

  render () {
    const editMode = this.props.editMode

    return (
      <div>
        <Divider horizontal>Ekstern</Divider>
        <AgentTable onAgentTableUpdate={this.handleAgentTable.bind(this)}
                    onAgentTableUpdateDropdown={this.handleAgentTableDropdown.bind(this)}
                    onRowAdd={this.handleAddEvent.bind(this)}
                    onRowDel={this.handleRowDel.bind(this)}
                    onRowSave={this.handleRowSave.bind(this)}
                    agents={this.state.externalAgents}
                    editMode={editMode} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {authentication} = state
  return {
    authentication
  }
}

const connectedExternalAgent = connect(mapStateToProps)(ExternalAgent)
export { connectedExternalAgent as ExternalAgent }