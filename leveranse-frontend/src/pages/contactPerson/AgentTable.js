import React, { Component } from 'react'
import { Button, Dropdown, Icon, Table, Checkbox } from 'semantic-ui-react'
import { fetchListOptions } from "../../utils/Common";

let agentTypes = [
  {key: 1, text: 'INDIVIDUAL', value: 'INDIVIDUAL'},
  {key: 2, text: 'ORGANIZATION', value: 'ORGANIZATION'},
  {key: 3, text: 'SYSTEM', value: 'SYSTEM'}]

let roleOptions = []
let fetchRoleUrl = process.env.REACT_APP_BACKENDHOST + 'Role/'
roleOptions = fetchListOptions(fetchRoleUrl)

class AgentTable extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    roleOptions = roleOptions.filter(role => role.text !== 'KONTAKTPERSON')
  }

  render() {
    const editMode = this.props.editMode
    let onAgentTableUpdate = this.props.onAgentTableUpdate
    let onAgentTableUpdateDropdown = this.props.onAgentTableUpdateDropdown
    let rowDel = this.props.onRowDel
    let rowSave = this.props.onRowSave
    console.log("InternalAgents to be displayed: ", this.props.internalAgents)
    console.log("ExternalAgents to be displayed: ", this.props.externalAgents)

    let agent = this.props.agents.map(function(agent) {
      return (
        <AgentRow onAgentTableUpdate={onAgentTableUpdate} onAgentTableUpdateDropdown={onAgentTableUpdateDropdown}
                  agent={agent} onDelEvent={rowDel.bind(this)} onSaveEvent={rowSave.bind(this)}
                  key={agent.id}
                  editMode={editMode} />
      )
    })

    return (
      <div>
        <Table>
          <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Rolle</th>
            <th>Type</th>
            <th>Navn</th>
            <th>Epost</th>
            <th>Telefon</th>
            <th>Kommentar</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {agent}
          </tbody>
        </Table>
        <Button color='green' onClick={this.props.onRowAdd} disabled={editMode} icon>
          <Icon name='plus' />&nbsp;
          Legg til
        </Button>
      </div>
    )
  }
}

export default AgentTable

class AgentRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      readOnlyMode: this.props.editMode
    }
  }

  editModeHandleClick = () => {
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })
  }

  onDelEvent() {
    this.props.onDelEvent(this.props.agent)
  }

  onSaveEvent() {
    this.setState({
      readOnlyMode: true
    })
    this.props.onSaveEvent(this.props.agent)
  }

  render() {
    const editMode = this.state.readOnlyMode
    return (
      <tr>
        <td>
          <Checkbox slider checked={!this.state.readOnlyMode} onClick={this.editModeHandleClick} icon='edit'
                    readOnly={!this.state.readOnlyMode} />
        </td>
        <td>
          <Dropdown placeholder='Velg role' selection options={roleOptions}
                    id={this.props.agent.id} value={this.props.agent.selectedRole || ''}
                    onChange={(event, {id, value}) => this.props.onAgentTableUpdateDropdown(id, 'selectedRole', value)}
                    disabled={editMode} />
        </td>
        <td>
          <Dropdown placeholder='Velg type' selection options={agentTypes}
                    id={this.props.agent.id} value={this.props.agent.agentType || ''}
                    onChange={(event, {id, value}) => this.props.onAgentTableUpdateDropdown(id, 'agentType', value)}
                    disabled={editMode} />
        </td>
        <td>
          <input type='text' name='name' id={this.props.agent.id} value={this.props.agent.name[0].languageText || ''}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode} />
        </td>
        <td>
          <input type='text' name='email' id={this.props.agent.id} value={this.props.agent.agentDetails[0].values || ''}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode} />
        </td>
        <td>
          <input type='text' name='phoneNumber' id={this.props.agent.id} value={this.props.agent.agentDetails[1].values || ''}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode} />
        </td>
        <td>
          <input type='text' name='comment' id={this.props.agent.id} value={this.props.agent.comment || ''}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode} />
        </td>
        <td>
          <Button disabled={editMode} size='tiny' onClick={this.onDelEvent.bind(this)} color='red' icon='minus'>
          </Button>
        </td>
        <td>
          <Button disabled={editMode} size='tiny' onClick={this.onSaveEvent.bind(this)} color='blue' icon='save'>
          </Button>
        </td>
      </tr>
    )
  }
}



