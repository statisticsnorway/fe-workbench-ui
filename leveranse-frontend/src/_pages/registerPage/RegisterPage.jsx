import React from 'react';
import { Button, Form, Grid, Header, Message} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions/index';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div>
              <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                  <Header as='h2' color='blue' textAlign='center'>
                  </Header>
                  <Header as='h2' color='blue' textAlign='center'>
                    Register
                  </Header>
                  <Form name="form" onSubmit={this.handleSubmit} size='large'>
                    <Form.Field error={submitted && !user.firstName}>
                      <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        type='text'
                        id='firstname'
                        name='firstName'
                        placeholder='firstName'
                        value={user.firstName}
                        onChange={this.handleChange}/>
                    </Form.Field>
                    {submitted && !user.firstName &&
                    <Message negative><Message.Header>First name is required</Message.Header>
                    </Message>
                    }
                    <Form.Field error={submitted && !user.lastName}>
                      <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        type='text'
                        id='lastname'
                        name='lastName'
                        placeholder='last name'
                        value={user.lastName}
                        onChange={this.handleChange}/>
                    </Form.Field>
                    {submitted && !user.lastName &&
                    <Message negative><Message.Header>Last name is required</Message.Header>
                    </Message>
                    }
                    <Form.Field error={submitted && !user.username}>
                      <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        type='text'
                        id='username'
                        name='username'
                        placeholder='username'
                        value={user.username}
                        onChange={this.handleChange}/>
                    </Form.Field>
                    {submitted && !user.username &&
                    <Message negative><Message.Header>Username is required</Message.Header>
                    </Message>
                    }
                    <Form.Field error={submitted && !user.password}>
                      <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Passord'
                        value={user.password}
                        onChange={this.handleChange}/>
                    </Form.Field>
                    {submitted && !user.password &&
                    <Message negative><Message.Header>Password is required</Message.Header>
                    </Message>
                    }
                    <Button color='blue' fluid size='large'>Register</Button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                  </Form>
                </Grid.Column>
              </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };