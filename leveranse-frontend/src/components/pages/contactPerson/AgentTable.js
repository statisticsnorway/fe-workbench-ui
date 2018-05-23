import React from 'react'
import { Button, Dropdown, Icon, Table } from 'semantic-ui-react'

const roleOptions = [{key: 'Kvalitetsansvar', value: 'Kvalitetsansvar', text: 'Kvalitetsansvar'},
  {key: 'Planlegger', value: 'Planlegger', text: 'Planlegger'},
  {key: 'Ansvarligseksjon', value: 'Ansvarligseksjon', text: 'Ansvarligseksjon'},
  {key: 'Ansvarlig', value: 'Ansvarlig', text: 'Ansvarlig'},
  {key: 'Uttrekk', value: 'Uttrekk', text: 'Uttrekk'},
  {key: 'Regelverk', value: 'Regelverk', text: 'Regelverk'}];

class AgentTable extends React.Component {
  render () {
    const editMode = this.props.editMode

    let onAgentTableUpdate = this.props.onAgentTableUpdate;
    let rowDel = this.props.onRowDel;
    let filterText = this.props.filterText;
    let agent = this.props.agents.map(function (agent) {
      if (agent.name.indexOf(filterText) === -1) {
        return null;
      }

      return (
        <AgentRow onAgentTableUpdate={onAgentTableUpdate} agent={agent} onDelEvent={rowDel.bind(this)} key={agent.id}
                  editMode={editMode}/>
      )
    });

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
          <Icon name='plus'/>&nbsp;
          Legg til
        </Button>
      </div>
    );
  }
}

export default AgentTable;

class AgentRow extends React.Component {
  onDelEvent () {
    this.props.onDelEvent(this.props.agent);
  }

  render () {
    const editMode = this.props.editMode

    return (
      <tr>
        <td>
          <Dropdown placeholder='Velg rolle' search selection options={roleOptions} disabled={editMode}/>
        </td>
        <td>
          <input type='text' name="name" id={this.props.agent.id} value={this.props.agent.name}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode}/>
        </td>
        <td>
          <input type='text' name="email" id={this.props.agent.id} value={this.props.agent.email}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode}/>
        </td>
        <td>
          <input type='text' name="telephone" id={this.props.agent.id} value={this.props.agent.telephone}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode}/>
        </td>
        <td>
          <input type='text' name="comment" id={this.props.agent.id} value={this.props.agent.comment}
                 onChange={this.props.onAgentTableUpdate} readOnly={editMode}/>
        </td>
        <td>
          <Button disabled={editMode} size='tiny' onClick={this.onDelEvent.bind(this)} color='red' icon='minus'>
          </Button>
        </td>
      </tr>
    );
  }
}



