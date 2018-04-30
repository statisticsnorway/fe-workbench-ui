import React from 'react';
import { Dropdown, Form, Grid, Icon, Input, Menu, Segment } from "semantic-ui-react";
import RegisterAgent from "./agent/RegisterAgent";
import RegisterProvisionagreement from "./provisionagreement/RegisterProvisionagreement";
import RegisterAdminDetails from "./adminDetails/RegisterAdminDetails";
import RegisterRole from './role/RegisterRole'

class LevranseAvtale extends React.Component {

  state = {}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleSubmit (event) {
    event.preventDefault();
  }

  onClick = () => {
    console.log(this.adminDetails.state)
    console.log(this.agent.state)
    console.log(this.provisionagreement.state)
    console.log(this.role.state)

    this.adminDetails.postAdminDetailToBackend()
    this.agent.postAgentToBackend()
    this.provisionagreement.postProvisionagreementToBackend()
    this.role.postRoleToBackend()
  }

  render () {

    const {activeItem} = this.state

    return (
      <div>
        <Grid>
          <Grid.Column width={3}>
            <Menu vertical>
              <Menu.Item>
                <Input placeholder='Finn avtale'/>
              </Menu.Item>

              <Menu.Item name='opprettAvtale' active={activeItem === 'opprettAvtale'}
                         onClick={this.handleItemClick}>
                <Icon name="add square"/>
                Opprett ny avtale
              </Menu.Item>

              <Menu.Item name='kopierAvtale' active={activeItem === 'kopierAvtale'}
                         onClick={this.handleItemClick}>
                <Icon name='grid layout'/>
                Kopier avtale
              </Menu.Item>
              <Menu.Item name='slettAvtale' active={activeItem === 'slettAvtale'}
                         onClick={this.handleItemClick}>
                Slett avtale
              </Menu.Item>

              <Dropdown item text='More'>
                <Dropdown.Menu>
                  <Dropdown.Item icon='edit' text='Edit Profile'/>
                  <Dropdown.Item icon='globe' text='Choose Language'/>
                  <Dropdown.Item icon='settings' text='Account Settings'/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </Grid.Column>
          <Grid.Column width={13}>
            <Form onSubmit={this.handleSubmit}>
              <Grid celled container stackable>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Segment><RegisterProvisionagreement
                      ref={(provisionagreement => {this.provisionagreement = provisionagreement})}/></Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment><RegisterRole ref={(role => {this.role = role})}/></Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment><RegisterAdminDetails
                      ref={(adminDetails => {this.adminDetails = adminDetails})}/></Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Segment></Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment><RegisterAgent ref={(agent => {this.agent = agent})}/></Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment></Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Segment>Content</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>Content</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment></Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Form.Group>
                <Form.Button onClick={this.onClick} content='Lagre'/>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LevranseAvtale;