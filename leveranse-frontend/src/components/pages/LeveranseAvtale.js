import React from 'react';
import {Form, Menu, Grid, Segment, Icon, Sidebar, Image} from "semantic-ui-react";
import RegisterAgent from "./agent/RegisterAgent";
import RegisterProvisionagreement from "./provisionagreement/RegisterProvisionagreement";
import RegisterAdminDetails from "./adminDetails/RegisterAdminDetails";
import RegisterRole from './role/RegisterRole'


class LevranseAvtale extends React.Component {
    state = {
        activeItem: 'home'
    };

    render() {
         return (

            <Form onSubmit={this.onSubmit}>

                <div>
                    <Menu secondary attached="top">
                        <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
                            <Icon name="sidebar" />Menu
                        </Menu.Item>
                    </Menu>
                    <Sidebar.Pushable as={Segment} attached="bottom" >
                        <Sidebar as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
                            <Menu.Item><Icon name="search" />Finn Avtale</Menu.Item>
                            <Menu.Item><Icon name="add" />Opprett ny Avtale</Menu.Item>
                            <Menu.Item><Icon name="copy" />Kopier Avtale</Menu.Item>
                            <Menu.Item><Icon name="delete" />Slett Avtale</Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Grid columns='equal'>
                                <Grid.Row stretched>
                                    <Grid.Column>
                                        <Segment><RegisterProvisionagreement /></Segment>
                                        <Segment>2</Segment>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Segment>
                                            <RegisterAgent/>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>1</Segment>
                                        <Segment>2</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment>1</Segment>
                                        <Segment>2</Segment>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Segment>
                                            <RegisterRole/>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>1</Segment>
                                        <Segment>2</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row stretched>
                                    <Grid.Column>
                                        <Segment>1</Segment>
                                        <Segment>2</Segment>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Segment>
                                            <Image src='/assets/images/wireframe/paragraph.png' />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>1</Segment>
                                        <Segment>2</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment>1</Segment>
                                        <Segment>2</Segment>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Segment>
                                            <Image src='/assets/images/wireframe/paragraph.png' />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>1</Segment>
                                        <Segment>2</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>

            </Form>
        );
    }
}


export default LevranseAvtale;