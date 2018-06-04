import React, { Component } from 'react'
import { Header, List, Message } from 'semantic-ui-react'
import { sendDataToBackend } from '../../../utils/Common'

class AdministrativeDetails extends Component {
  constructor (props) {
    super(props)

    const rightNow = AdministrativeDetails.prettyfyDate()

    this.state = {
      administrativeDetails: {
        id: '',
        administrativeStatus: '',
        alias: '',
        annotation: '',
        documentation: '',
        createDate: rightNow,
        createBy: 'Testbruker',
        lastUpdateDate: rightNow,
        lastUpdateBy: 'Testbruker 2',
        lifeCycleStatus: '',
        ControlledVocabulary: '',
        url: '',
        validFrom: '',
        validUntil: '',
        version: '1.0'
      },
      response: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static prettyfyDate () {
    let now = new Date()
    let nowMonth
    let nowMinutes

    if (now.getMinutes() < 10) {
      nowMinutes = '0' + now.getMinutes()
    } else {
      nowMinutes = now.getMinutes()
    }

    if (now.getMonth() < 10) {
      nowMonth = '0' + now.getMonth()
    } else {
      nowMonth = now.getMonth()
    }

    now = now.getDate() + '/' + nowMonth + '/' + now.getFullYear() + ' - ' + now.getHours() + ':' + nowMinutes

    return now
  }

  handleInputChange (event) {
    this.setState({
      administrativeDetails: {
        ...this.state.administrativeDetails,
        [event.target.name]: event.target.value
      }
    })
  }

  registerAdministrativeDetails () {
    this.setState({
      readOnlyMode: true,
      waitingForResponse: true
    })

    sendDataToBackend('/administrativeDetails', 'Administrative detaljer', this.state.administrativeDetails).then((result) => {
      this.setState({
        response: result,
        waitingForResponse: false
      })
    })
  }

  render () {
    const editMode = this.props.editMode
    const {response, administrativeDetails} = this.state

    return (
      <div>
        {Object.keys(response).length !== 0 && editMode ?
          <Message icon={response.icon} color={response.color} header={response.header}
                   content={response.text} /> : null}
        <Header as='h3' content='Administrative detaljer' />
        <List>
          <List.Item>
            <List.Header>Dato opprettet</List.Header>
            {administrativeDetails.createDate}
          </List.Item>
        </List>
        <List>
          <List.Item>
            <List.Header>Opprettet av</List.Header>
            {administrativeDetails.createBy}
          </List.Item>
        </List>
        <hr />
        <List>
          <List.Item>
            <List.Header>Dato endret</List.Header>
            {administrativeDetails.lastUpdateDate}
          </List.Item>
        </List>
        <List>
          <List.Item>
            <List.Header>Endret av</List.Header>
            {administrativeDetails.lastUpdateBy}
          </List.Item>
        </List>
        <hr />
        <List>
          <List.Item>
            <List.Header>Versjon</List.Header>
            {administrativeDetails.version}
          </List.Item>
        </List>
        {/*        <Form.Field>
          <label>Id</label>
          <Input placeholder='Id' name='id' value={administrativeDetails.id}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Alias</label>
          <Input placeholder='Alias' name='alias' value={administrativeDetails.alias}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <Input placeholder='Url' name='url' value={administrativeDetails.url}
                 onChange={this.handleInputChange} readOnly={editMode}/>
        </Form.Field>*/}
      </div>
    )
  }
}

export default AdministrativeDetails