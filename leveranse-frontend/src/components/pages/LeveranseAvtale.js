import React from 'react';
import {Menu, Grid, Segment, Icon, Input, Dropdown} from "semantic-ui-react";
import RegisterAgent from "./agent/RegisterAgent";
import RegisterProvisionagreement from "./provisionagreement/RegisterProvisionagreement";
import RegisterAdminDetails from "./adminDetails/RegisterAdminDetails";
import RegisterRole from './role/RegisterRole'

class LevranseAvtale extends React.Component {

    state = {}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})


    render() {

        const {activeItem} = this.state

        return (
            <div>
                <Grid>
                    <Grid.Column width={3}>
                        <Menu vertical>
                            <Menu.Item>
                                <Input placeholder='finn avtale'/>
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
                        <Grid celled container stackable>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Segment><RegisterProvisionagreement/></Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment><RegisterRole/></Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment><RegisterAdminDetails/></Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Segment></Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment><RegisterAgent/></Segment>
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
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}


export default LevranseAvtale;