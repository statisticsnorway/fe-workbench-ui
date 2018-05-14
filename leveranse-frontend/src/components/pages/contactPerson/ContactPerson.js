import React from 'react'
import { Dropdown, Form, Grid, Table, Icon, Input, Menu, Segment, Divider } from 'semantic-ui-react'

class ContactPerson extends React.Component {

  constructor(props) {
    super(props);

    //this.state.agents = [];
    this.state = {};
    this.state.filterText = "";
    this.state.agents = [
      {
        id: 1,
        role: 'Kvalitetsansvar',
        name: 'Per Hansen',
        email: 'peh@ssb.no',
        telephone: '87878787',
        comment: ''
      }, {
        id: 2,
        role: 'Planlegger',
        name: 'Finn Frem',
        email: 'fif@ssb.no',
        telephone: '98989898',
        comment: ''
      }, {
        id: 3,
        role: 'Ansvarligseksjon',
        name: 'Seksjon for Utenrikshandel',
        email: 'su_post@ssb.no',
        telephone: '67676767',
        comment: ''
      }
    ];
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleRowDel(agent) {
    var index = this.state.agents.indexOf(agent);
    this.state.agents.splice(index, 1);
    this.setState(this.state.agents);
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var agent = {
      id: id,
      name: "",
      price: "",
      category: "",
      qty: 0
    }
    this.state.agents.push(agent);
    this.setState(this.state.agents);

  }

  handleAgentTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var agents = this.state.agents.slice();
    var newAgents = agents.map(function(agent) {

      for (var key in agent) {
        if (key == item.name && agent.id == item.id) {
          agent[key] = item.value;

        }
      }
      return agent;
    });
    this.setState({agents:newAgents});
    //  console.log(this.state.agents);
  };

  render() {

    return (
      <Form>
        <div>
          <Divider horizontal>Intern</Divider>
          <AgentTable onAgentTableUpdate={this.handleAgentTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} agents={this.state.agents} filterText={this.state.filterText}/>
          <Divider horizontal>Ekstern</Divider>
        </div>
      </Form>
    );

  }

}
export default ContactPerson;


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

class AgentRow extends React.Component {
  onDelEvent() {

    this.props.onDelEvent(this.props.agent);
  }

  render() {

    return (
      <tr className="eachRow">
        <EditableCell onAgentTableUpdate={this.props.onAgentTableUpdate} cellData={{
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

