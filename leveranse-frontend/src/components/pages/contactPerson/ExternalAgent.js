import React from 'react'
import { Divider } from 'semantic-ui-react'
import AgentTable from './AgentTable'

class ExternalAgent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.externalAgents = [
      {
        id: '0',
        role: '',
        name: '',
        email: '',
        telephone: '',
        comment: ''
      }
    ];
  }

  handleRowDel (externalAgent) {
    let index = this.state.externalAgents.indexOf(externalAgent);

    this.state.externalAgents.splice(index, 1);
    this.setState(this.state.externalAgents);
  };

  handleAddEvent () {
    const uuidv1 = require('uuid/v1');
    /*let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);*/
    let id = uuidv1();
    let agent = {
      id: id,
      role: "",
      name: "",
      email: "",
      telephone: "",
      comment: ""
    }

    this.state.externalAgents.push(externalAgent);
    this.setState(this.state.externalAgents);

  }

  handleExternalAgentTable (evt) {
    let item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    let agents = this.state.agents.slice();
    let newAgents = agents.map(function (agent) {
      for (let key in agent) {
        if (key === item.name && agent['id'] === item.id) {
          agent[key] = item.value;
        }
      }

      return agent;
    });

    this.setState({agents: newAgents});
  };

  render () {
    const editMode = this.props.editMode

    return (
      <div>
        <Divider horizontal>Ekstern</Divider>
        <AgentTable onAgentTableUpdate={this.handleAgentTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)}
                    onRowDel={this.handleRowDel.bind(this)} agents={this.state.agents}
                    filterText={this.state.filterText} editMode={editMode}/>
      </div>
    );
  }
}

export default ExternalAgent;





