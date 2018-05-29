import React from 'react'
import { Button, Dropdown, Icon, Table } from 'semantic-ui-react'

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
    let agent = this.props.agents.map(function (agent) {
      return (
        <AgentRow onAgentTableUpdate={onAgentTableUpdate} onAgentTableUpdateDropdown={onAgentTableUpdateDropdown}
                  agent={agent} onDelEvent={rowDel.bind(this)} key={agent.id}
                  editMode={editMode} />
      )
    })

    return (
      <div>
        <Table>
          <thead>
          <tr>
            <th>Rolle</th>
            <th>Navn</th>
            <th>Epost</th>
            <th>Telefon</th>
            <th>Kommentar</th>
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
  onDelEvent () {
    this.props.onDelEvent(this.props.agent)
  }

  render () {
    const editMode = this.props.editMode

    return (
      <tr>
        <td>
          <Dropdown placeholder='Velg rolle' selection options={roleOptions}
                    id={this.props.agent.id} value={this.props.agent.role}
                    onChange={(event, {id, value}) => this.props.onAgentTableUpdateDropdown(id, 'role', value)}
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
          <input type='text' name='telephone' id={this.props.agent.id} value={this.props.agent.telephone}
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
      </tr>
    )
  }
}



