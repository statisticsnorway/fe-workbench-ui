import React from 'react'
import { Divider } from 'semantic-ui-react'
import AgentTable from './AgentTable'

class InternalAgent extends React.Component {

  constructor(props) {
    super(props);

    //this.state.agents = [];
    this.state = {};
    this.state.filterText = "";
    this.state.agents = [
      {
        id: 0,
        role: '',
        name: '',
        email: '',
        telephone: '',
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
      role: "",
      name: "",
      email: "",
      telephone: "",
      comment: ""
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
  };


  render() {

    return (
      <div>
        <Divider horizontal>Intern</Divider>
        <AgentTable onAgentTableUpdate={this.handleAgentTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} agents={this.state.agents} filterText={this.state.filterText}/>
      </div>
    );

  }

}
export default InternalAgent;





