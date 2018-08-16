import React from 'react'
import { Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AgentTable from './AgentTable'
import { sendDataToBackend, deleteDataInBackend, getDataFromBackend } from '../../utils/Common'
import moment from "moment/moment";

const roleUrl = 'Role/'
const agentUrl = 'Agent/'
const agentInRoleUrl = 'AgentInRole/'
const provisionAgreementUrl = 'ProvisionAgreement/'
const deleteContactPerson = 'AgentInRole/'

let roleAsContactPerson
let agentsInRoles

class InternalAgent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      response: {}
    }

    const uuidv1 = require('uuid/v1')
    let uuAgentId = uuidv1()

    this.state.internalAgents = [ {
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
      isExternal: false,
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
    getDataFromBackend('AgentInRole/', '').then((result) => {
      agentsInRoles = result.data
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
    getDataFromBackend('AgentInRole/', '').then((result) => {
      agentsInRoles = result.data
    })
  }

  handleRowDel (agent) {
    console.log('Remove Agent In Role:', agent)
    let selectedAgentInRole

    for (let key in agentsInRoles) {
      let agentInRole = agentsInRoles[ key ];
      for (var attribute in agentInRole) {
        if (agentInRole.hasOwnProperty(attribute)) {
          if (attribute === 'role') {
            let roleId = agentInRole[ attribute ].substring(6, agentInRole[ attribute ].length)
            //if agentInRole already exists for the selected role
            if (roleId === agent.selectedRole) {
              selectedAgentInRole = agentInRole
            }
          }
        }
      }
    }

    console.log("AgentInRole to be deleted: ", selectedAgentInRole)

  }

  handleRowSave (agent) {
    let internalAgent = {
      id: agent.id,
      agentType: agent.agentType,
      name: agent.name,
      description: agent.description,
      isExternal: false,
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

    console.log('Create Agent:', internalAgent)

    sendDataToBackend(agentUrl + internalAgent.id, 'Agent', internalAgent).then((result) => {
      console.log(result.header)
      if (result.status === 200) {
        const uuidv1 = require('uuid/v1')
        let uuAgentInSelectedRoleId = uuidv1()
        let uuAgentInContactPersonRoleId = uuidv1()

        let existedAgentInRole
        let existedAgentInContactPersonRole
        let internalAgentInContactRole
        let internalAgentInSelectedRole

        //check for AgentInRole already exist
        for (let key in agentsInRoles) {
          let agentInRole = agentsInRoles[ key ];
          for (var attribute in agentInRole) {
            if (agentInRole.hasOwnProperty(attribute)) {
              if (attribute === 'role') {
                let roleId = agentInRole[ attribute ].substring(6, agentInRole[ attribute ].length)
                //if agentInROle already exists for the selected role
                if (roleId === agent.selectedRole) {
                  existedAgentInRole = agentInRole
                } else if (roleId === roleAsContactPerson.id) {
                  existedAgentInContactPersonRole = agentInRole
                }
              }
            }
          }
        }

        if (existedAgentInContactPersonRole != undefined) {
          existedAgentInContactPersonRole.agents.push("/Agent/" + internalAgent.id)
          sendDataToBackend(agentInRoleUrl + existedAgentInContactPersonRole.id, 'AgentInRole', existedAgentInContactPersonRole).then((result) => {
            console.log(result.header)
            if (result.status === 200) {
              let agentInRoleAlreadyLinked
              if (this.props.linkedPA[ 0 ].agentInRoles.length == 0) {
                this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInContactPersonRole.id)
              } else {
                let linkedAgentsInRoleWithPA = this.props.linkedPA[ 0 ].agentInRoles
                for (var key in linkedAgentsInRoleWithPA) {
                  console.log(linkedAgentsInRoleWithPA[ key ])
                  let linkedAgentInRoleId = linkedAgentsInRoleWithPA[ key ].substring(13, linkedAgentsInRoleWithPA[ key ].length)
                  console.log(linkedAgentInRoleId)
                  if (existedAgentInContactPersonRole !== undefined && existedAgentInContactPersonRole.id === linkedAgentInRoleId) {
                    //this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInContactPersonRole.id)
                    agentInRoleAlreadyLinked = true
                    break;
                  }
                }
                if(!agentInRoleAlreadyLinked){

                }
                  this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInContactPersonRole.id)
              }
              sendDataToBackend(provisionAgreementUrl + this.props.linkedPA[ 0 ].id,
                'ProvisionAgreement', this.props.linkedPA[ 0 ]).then((result) => {
                console.log(result.header)
              })
            }
          })
        } else {
          internalAgentInContactRole = {
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
          internalAgentInContactRole.agents.push("/Agent/" + internalAgent.id)

          sendDataToBackend(agentInRoleUrl + internalAgentInContactRole.id, 'AgentInRole', internalAgentInContactRole).then((result) => {
            console.log(result.header)
          })
        }

        if (existedAgentInRole != undefined)  {
          existedAgentInRole.agents.push("/Agent/" + internalAgent.id)
          sendDataToBackend(agentInRoleUrl + existedAgentInRole.id, 'AgentInRole', existedAgentInRole).then((result) => {
            console.log(result.header)
            if (result.status === 200) {
              if (this.props.linkedPA[ 0 ].agentInRoles.length == 0) {
                this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInRole.id)
              } else {
                let linkedAgentsInRoleWithPA = this.props.linkedPA[ 0 ].agentInRoles
                for (var key in linkedAgentsInRoleWithPA) {
                  console.log(linkedAgentsInRoleWithPA[ key ])
                  let linkedAgentInRoleId = linkedAgentsInRoleWithPA[ key ].substring(13, linkedAgentsInRoleWithPA[ key ].length)
                  console.log(linkedAgentInRoleId)
                  if (existedAgentInRole !== undefined && existedAgentInRole.id !== linkedAgentInRoleId) {
                    this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInRole.id)
                    break;
                  }
                }
              }

              sendDataToBackend(provisionAgreementUrl + this.props.linkedPA[ 0 ].id,
                'ProvisionAgreement', this.props.linkedPA[ 0 ]).then((result) => {
                console.log(result.header)
              })
            }
          })
        } else {
          internalAgentInSelectedRole = {
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
          internalAgentInSelectedRole.agents.push("/Agent/" + internalAgent.id)

          sendDataToBackend(agentInRoleUrl + internalAgentInSelectedRole.id, 'AgentInRole', internalAgentInSelectedRole).then((result) => {
            console.log(result.header)
            if (result.status === 200) {
              if (this.props.linkedPA[ 0 ].agentInRoles.length == 0) {
                if (existedAgentInRole !== undefined) {
                  this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInRole.id)
                } else {
                  this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + internalAgentInSelectedRole.id)
                }

                if (existedAgentInContactPersonRole !== undefined) {
                  this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInContactPersonRole.id)
                } else {
                  this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + internalAgentInContactRole.id)
                }

                sendDataToBackend(provisionAgreementUrl + this.props.linkedPA[ 0 ].id,
                  'ProvisionAgreement', this.props.linkedPA[ 0 ]).then((result) => {
                  console.log(result.header)
                })
              } else {
                let linkedAgentsInRoleWithPA = this.props.linkedPA[ 0 ].agentInRoles

                for (var key in linkedAgentsInRoleWithPA) {
                  console.log(linkedAgentsInRoleWithPA[ key ])
                  let linkedAgentInRoleId = linkedAgentsInRoleWithPA[ key ].substring(13, linkedAgentsInRoleWithPA[ key ].length)
                  console.log(linkedAgentInRoleId)
                  if (existedAgentInRole !== undefined && existedAgentInRole.id !== linkedAgentInRoleId) {
                    this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInRole.id)
                    break;
                  }
                  if (existedAgentInRole === undefined && internalAgentInSelectedRole.id !== linkedAgentInRoleId) {
                    this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + internalAgentInSelectedRole.id)
                    break;
                  }
                }

                sendDataToBackend(provisionAgreementUrl + this.props.linkedPA[ 0 ].id,
                  'ProvisionAgreement', this.props.linkedPA[ 0 ]).then((result) => {
                  console.log(result.header)
                })
              }

              /*    if (existedAgentInRole !== undefined) {
                    this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInRole.id)
                  } else {
                    this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + internalAgentInSelectedRole.id)
                  }

                  if (existedAgentInContactPersonRole !== undefined) {
                    this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + existedAgentInContactPersonRole.id)
                  } else {
                    this.props.linkedPA[ 0 ].agentInRoles.push("/AgentInRole/" + internalAgentInContactRole.id)
                  }

                  sendDataToBackend(provisionAgreementUrl + this.props.linkedPA[ 0 ].id,
                    'ProvisionAgreement', this.props.linkedPA[ 0 ]).then((result) => {
                    console.log(result.header)
                  })*/
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
      isExternal: false,
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

    this.setState({internalAgents: newAgents})
  }

  render () {
    const {authentication} = this.props
    const editMode = this.props.editMode

    console.log("Fetched roles: ", )
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

function mapStateToProps (state) {
  const {authentication} = state
  return {
    authentication
  }
}

const connectedInternalAgent = connect(mapStateToProps)(InternalAgent)
export { connectedInternalAgent as InternalAgent }