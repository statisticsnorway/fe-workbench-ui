import React from 'react'
import { Button, Dropdown, Icon, Table, Checkbox } from 'semantic-ui-react'

const roleOptions = [{key: '1', value: '1', text: 'Kvalitetsansvar'},
  {key: '2', value: '2', text: 'Planlegger'},
  {key: '3', value: '3', text: 'Ansvarligseksjon'},
  {key: '4', value: '4', text: 'Ansvarlig'},
  {key: '5', value: '5', text: 'Uttrekk'},
  {key: '6', value: '6', text: 'Regelverk'}]

class AgentTable extends React.Component {
  render () {
    const editMode = this.props.editMode

    let onAgentTableUpdate = this.props.onAgentTableUpdate
    let onAgentTableUpdateDropdown = this.props.onAgentTableUpdateDropdown
    let rowDel = this.props.onRowDel
    let rowSave = this.props.onRowSave
    let agent = this.props.agents.map(function (agent) {
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

class AgentRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      readOnlyMode: false
    }
  }

  editModeHandleClick = () => {
    console.log('Trykket!')
    this.setState({
      readOnlyMode: !this.state.readOnlyMode
    })
  }

  onDelEvent () {
    this.props.onDelEvent(this.props.agent)
  }

  onSaveEvent () {
    this.props.onSaveEvent(this.props.agent)
  }

  render () {
    const editMode = this.state.readOnlyMode

    return (
      <tr>
        <td>
          <Checkbox slider checked={!this.state.readOnlyMode} onClick={this.editModeHandleClick} icon='edit'
                    readOnly={!this.state.readOnlyMode} />
        </td>
        <td>
          <Dropdown placeholder='Velg rolle' selection options={roleOptions}
                    id={this.props.agent.id} value={this.props.agent.roleId}
                    onChange={(event, {id, value}) => this.props.onAgentTableUpdateDropdown(id, 'roleId', value)}
                    disabled={editMode} />
        </td>
        <td>
          <input type='text' name='name' id={this.props.agent.id} value={this.props.agent.name}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode} />
        </td>
        <td>
          <input type='text' name='email' id={this.props.agent.id} value={this.props.agent.email}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode} />
        </td>
        <td>
          <input type='text' name='phoneNumber' id={this.props.agent.id} value={this.props.agent.phoneNumber}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode} />
        </td>
        <td>
          <input type='text' name='comment' id={this.props.agent.id} value={this.props.agent.comment}
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



