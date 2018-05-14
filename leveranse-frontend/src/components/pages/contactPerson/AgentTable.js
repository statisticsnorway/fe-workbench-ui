import React from 'react'
import { Table, Dropdown } from 'semantic-ui-react'

class AgentTable extends React.Component {

  render() {
    var onAgentTableUpdate = this.props.onAgentTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var agent = this.props.agents.map(function(agent) {
      if (agent.name.indexOf(filterText) === -1) {
        return;
      }
      return (<AgentRow onAgentTableUpdate={onAgentTableUpdate} agent={agent} onDelEvent={rowDel.bind(this)} key={agent.id}/>)
    });
    return (
      <div>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Legg til</button>
        <Table className="table table-bordered">
          <thead>
          <tr>
            <th>Rolle</th>
            <th>Navn</th>
            <th>Epost</th>
            <th>Telefon</th>
            <th>Kommentar</th>
          </tr>
          </thead>

          <tbody>
          {agent}
          </tbody>

        </Table>
      </div>
    );
  }
}
export default AgentTable;


class AgentRow extends React.Component {

  onDelEvent() {

    this.props.onDelEvent(this.props.agent);
  }

  render() {
    var roleOptions = [ { key: 'Kvalitetsansvar', value: 'Kvalitetsansvar', text: 'Kvalitetsansvar' },
      { key: 'Planlegger', value: 'Planlegger', text: 'Planlegger' },
      { key: 'Ansvarligseksjon', value: 'Ansvarligseksjon', text: 'Ansvarligseksjon' },
      { key: 'Ansvarlig', value: 'Ansvarlig', text: 'Ansvarlig' },
      { key: 'Uttrekk', value: 'Uttrekk', text: 'Uttrekk' },
      { key: 'Regelverk', value: 'Regelverk', text: 'Regelverk'} ];

    return (
      <tr className="eachRow">
        <Dropdown placeholder='Velg rolle' fluid search selection options={roleOptions}
                  onAgentTableUpdate={this.props.onAgentTableUpdate} cellData={{
          "type": "role",
          value: this.props.agent.role,
          id: this.props.agent.id
        }}/>
        <EditableCell onAgentTableUpdate={this.props.onAgentTableUpdate} cellData={{
          type: "name",
          value: this.props.agent.name,
          id: this.props.agent.id
        }}/>
        <EditableCell onAgentTableUpdate={this.props.onAgentTableUpdate} cellData={{
          type: "email",
          value: this.props.agent.email,
          id: this.props.agent.id
        }}/>
        <EditableCell onAgentTableUpdate={this.props.onAgentTableUpdate} cellData={{
          type: "telephone",
          value: this.props.agent.telephone,
          id: this.props.agent.id
        }}/>
        <EditableCell onAgentTableUpdate={this.props.onAgentTableUpdate} cellData={{
          type: "comment",
          value: this.props.agent.comment,
          id: this.props.agent.id
        }}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
      </tr>
    );
  }
}

class EditableCell extends React.Component {

  render() {
    return (
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value}
               onChange={this.props.onAgentTableUpdate}/>
      </td>
    );
  }

}


