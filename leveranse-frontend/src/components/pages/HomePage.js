import React from 'react';
import PropTypes from "prop-types";
import {Form, Button, Message, Menu, Dropdown, Container, Divider, Header, Segment, Icon, Sidebar, Input} from "semantic-ui-react";
import {Link} from 'react-router-dom'
import Validator from 'validator';
import InlineError from "../messages/InlineError";

class HomePage extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {},
        activeItem: 'home'
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    onChange = e => this.setState({
        data : {...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length === 0){
            this.setState({loading: true});
            this.props
                .submit(this.state.data)
                .catch(
                    err => this.setState({errors: err.response.data, loading:false}))
        }
    };

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        if (!data.password) errors.password = "Can't be blank !!";
        return errors;
    };

    render() {
        const { activeItem } = this.state
        const { data, errors , loading} = this.state;
        return (

            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.errors && (<Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.errors}</p>
                    </Message>
                )}
                <div>
                    <Menu pointing>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                        <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                        <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Input icon='search' placeholder='Search...' />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <Menu secondary attached="top">
                        <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
                            <Icon name="sidebar" />Menu
                        </Menu.Item>
                    </Menu>
                    <Sidebar.Pushable as={Segment} attached="bottom" >
                        <Sidebar as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
                            <Menu.Item><Icon name="home" />Home</Menu.Item>
                            <Menu.Item><Icon name="block layout" />Topics</Menu.Item>
                            <Menu.Item><Icon name="smile" />Friends</Menu.Item>
                            <Menu.Item><Icon name="calendar" />History</Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Segment basic>
                                <Header as="h3">Application Content</Header>
                                <Menu secondary pointing>
                                    <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
                                    <Menu.Menu position="right">
                                        <Dropdown>
                                            <Dropdown.Item>
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </Menu.Menu>
                                </Menu>
                                <Form.Field error={!!errors.email}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="example@ssb.no"
                                        value={data.email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && <InlineError text={errors.email} />}
                                </Form.Field>
                                <Form.Field error={!!errors.passowrd}>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Make it secure"
                                        value={data.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && <InlineError text={errors.password} />}
                                </Form.Field>
                                <Button primary>Login</Button>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>

            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default HomePage;