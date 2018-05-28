import React from 'react'
import axios from 'axios'
import { Divider } from 'semantic-ui-react'
import AgentTable from './AgentTable'

class InternalAgent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    const uuidv1 = require('uuid/v1');
    let id = uuidv1();
    this.state.internalAgents = [{
        id: id,
        role: '',
        name: '',
        email: '',
        telephone: '',
        comment: ''
      }];
    this.handleAgentTable = this.handleAgentTable.bind(this);
  }

  handleRowDel (agent) {
    let index = this.state.internalAgents.indexOf(agent)

    this.state.internalAgents.splice(index, 1);
    this.setState(this.state.internalAgents);
  };

  handleAddEvent () {
    const uuidv1 = require('uuid/v1');
    let id = uuidv1();
    let agent = {
      id: id,
      role: "",
      name: "",
      email: "",
      telephone: "",
      comment: ""
    }

    this.state.internalAgents.push(agent);
    this.setState(this.state.internalAgents);
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
        if (key === item.name && agent['id'] === item.id) {
          agent[key] = item.value;
        }
      }

      return agent;
    })
    this.setState({internalAgents: newAgents});
  };

  prepareDataForBackend () {
    let data = {...this.state.internalAgents}

    for (let attribute in data) {
      if (data[attribute] === '') {
        data[attribute] = null
      }
    }

    JSON.stringify(data)

    return data
  }

  registerInternalAgents () {
    /*
    let responseStatus
    let errorMessage
    let responseMessage
    let url
    */
    let data


    data = this.prepareDataForBackend()
    console.log(data)
    /*
    url = process.env.REACT_APP_BACKENDHOST + process.env.REACT_APP_APIVERSION + '/agents';

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response)
        responseStatus = response.status
        responseMessage = response.statusText
      })
      .catch(function (error) {
        console.log(error)
        responseStatus = 'Error'
        errorMessage = error.message
      })
      .then(() => {
        if (responseStatus === 201) {
          this.setState({
            response: {
              color: 'green',
              text: '',
              icon: 'check'
            }
          })
        } else if (responseStatus === 'Error') {
          this.setState({
            response: {
              color: 'red',
              text: [errorMessage],
              icon: 'close'
            }
          })
        } else {
          this.setState({
            response: {
              color: 'yellow',
              text: [responseMessage],
              icon: 'warning'
            }
          })
        }
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            response: {
              color: 'black',
              text: '',
              icon: ''
            }
          })
        }, 3000);
      })
    */
  }

  render () {
    const editMode = this.props.editMode

    return (
      <div>
        <Divider horizontal>Intern</Divider>
        <AgentTable onAgentTableUpdate={this.handleAgentTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)}
                    onRowDel={this.handleRowDel.bind(this)} agents={this.state.internalAgents}
                    editMode={editMode}/>
      </div>
    );
  }
}

export default InternalAgent;





