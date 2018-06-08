import React from 'react'
import { Button, Form, Grid, Header, Message, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions } from '../../actions/index'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    // reset login status
    this.props.dispatch(userActions.logout())

    this.state = {
      username: '',
      password: '',
      submitted: false,
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  handleSubmit (e) {
    e.preventDefault()

    this.setState({submitted: true})
    const {username, password} = this.state
    const {dispatch} = this.props
    if (username && password) {
      dispatch(userActions.login(username, password))
    }
  }

  render () {
    const {username, password, submitted, loading} = this.state
    return (
      <div>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' color='blue' textAlign='center'>
            </Header>
            <Header as='h2' color='blue' textAlign='center'>
              Innlogging
            </Header>
            <Form name="form" onSubmit={this.handleSubmit} loading={loading} size='large'>
              <Form.Field error={submitted && !username}>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  type='text'
                  id='username'
                  name='username'
                  placeholder='username'
                  value={username}
                  onChange={this.handleChange}/>
              </Form.Field>
              {submitted && !username &&
              <Message negative><Message.Header>Username is required</Message.Header>
              </Message>
              }
              <Form.Field error={submitted && !password}>
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Passord'
                  value={password}
                  onChange={this.handleChange}/>
              </Form.Field>
              {submitted && !password &&
              <Message negative><Message.Header>Password is required</Message.Header>
              </Message>
              }
              <Button color='blue' fluid size='large'>Login</Button>
              <Divider horizontal>Or</Divider>
              <Link to="/register" className="btn btn-link">Register</Link>
            </Form>
          </Grid.Column>
        </Grid>

      </div>
    )
  }
}

function mapStateToProps (state) {
  const {loggingIn} = state.authentication
  return {
    loggingIn
  }
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage)
export { connectedLoginPage as LoginPage }