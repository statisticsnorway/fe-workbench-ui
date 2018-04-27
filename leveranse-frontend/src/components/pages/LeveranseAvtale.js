import React from 'react';
import {Form, Menu, Grid, Segment, Icon, Sidebar, Image, Rail, Sticky, Header, Input, Dropdown} from "semantic-ui-react";
import RegisterAgent from "./agent/RegisterAgent";
import RegisterProvisionagreement from "./provisionagreement/RegisterProvisionagreement";
import RegisterAdminDetails from "./adminDetails/RegisterAdminDetails";
import RegisterRole from './role/RegisterRole'

const style = {
    h1: {
        marginTop: '3em',
    },
    h2: {
        margin: '4em 0em 2em',
    },
    h3: {
        marginTop: '2em',
        padding: '2em 0em',
    },
    last: {
        marginBottom: '300px',
    },
}

class LevranseAvtale extends React.Component {

    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() {

        const { activeItem } = this.state

         return (

            <Form onSubmit={this.onSubmit}>

                <div>
                    <Grid>
                        <Grid.Column width={3}>
                            <Menu vertical>
                                <Menu.Item>
                                    <Input placeholder='Finn avtale' />
                                </Menu.Item>

                                <Menu.Item name='opprettAvtale' active={activeItem === 'opprettAvtale'} onClick={this.handleItemClick}>
                                    <Icon name="add square" />
                                    Opprett ny avtale
                                </Menu.Item>

                                <Menu.Item name='kopierAvtale' active={activeItem === 'kopierAvtale'} onClick={this.handleItemClick}>
                                    <Icon name='grid layout' />
                                    Kopier avtale
                                </Menu.Item>
                                <Menu.Item name='slettAvtale' active={activeItem === 'slettAvtale'} onClick={this.handleItemClick}>
                                    Slett avtale
                                </Menu.Item>

                                <Dropdown item text='More'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='edit' text='Edit Profile' />
                                        <Dropdown.Item icon='globe' text='Choose Language' />
                                        <Dropdown.Item icon='settings' text='Account Settings' />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Grid celled container stackable>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Segment><RegisterProvisionagreement /></Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment><RegisterAgent /></Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={3}>
                                    <Grid.Column>
                                        <Segment><RegisterRole/></Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment><RegisterAdminDetails/></Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>Content</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={8}>
                                    <Grid.Column>
                                        <Segment>Content</Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>Content</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                </div>

            </Form>
        );
    }
}


export default LevranseAvtale;