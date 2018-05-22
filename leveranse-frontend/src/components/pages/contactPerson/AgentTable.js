import React from 'react'
import { Table, Dropdown } from 'semantic-ui-react'

class AgentTable extends React.Component {

  render() {
    let onAgentTableUpdate = this.props.onAgentTableUpdate;
    let rowDel = this.props.onRowDel;
    let filterText = this.props.filterText;
    let agent = this.props.agents.map(function(agent) {
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
    let roleOptions = [ { key: 'Kvalitetsansvar', value: 'Kvalitetsansvar', text: 'Kvalitetsansvar' },
      { key: 'Planlegger', value: 'Planlegger', text: 'Planlegger' },
      { key: 'Ansvarligseksjon', value: 'Ansvarligseksjon', text: 'Ansvarligseksjon' },
      { key: 'Ansvarlig', value: 'Ansvarlig', text: 'Ansvarlig' },
      { key: 'Uttrekk', value: 'Uttrekk', text: 'Uttrekk' },
      { key: 'Regelverk', value: 'Regelverk', text: 'Regelverk'} ];

    return (
      <tr className="eachRow">
       <td>
        <Dropdown placeholder='Velg rolle' fluid search selection options={roleOptions} />
        </td>
        <td>
          <input type='text' name="name" id={this.props.agent.id} value={this.props.agent.name}
                 onChange={this.props.onAgentTableUpdate}/>
        </td>
        <td>
          <input type='text' name="email" id={this.props.agent.id} value={this.props.agent.email}
                 onChange={this.props.onAgentTableUpdate}/>
        </td>
        <td>
          <input type='text' name="telephone" id={this.props.agent.id} value={this.props.agent.telephone}
                 onChange={this.props.onAgentTableUpdate}/>
        </td>
        <td>
          <input type='text' name="comment" id={this.props.agent.id} value={this.props.agent.comment}
                 onChange={this.props.onAgentTableUpdate}/>
        </td>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
      </tr>
    );
  }
}



