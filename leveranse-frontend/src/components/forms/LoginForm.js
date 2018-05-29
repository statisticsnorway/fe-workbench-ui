import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Validator from 'validator'
import InlineError from '../messages/InlineError'

class LoginForm extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {},
    activeItem: 'home'
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  onChange = e => this.setState({
    data: {...this.state.data, [e.target.name]: e.target.value}
  })

  onSubmit = () => {
    const errors = this.validate(this.state.data)

    this.setState({errors})

    if (Object.keys(errors).length === 0) {
      this.setState({loading: true})
      this.props
        .submit(this.state.data)
        .catch(
          err => this.setState({errors: err.response.data.errors, loading: false}))
    }
  }

  validate = data => {
    const errors = {}

    if (!Validator.isEmail(data.email)) errors.email = 'Ugyldig e-post format'
    if (!data.password) errors.password = 'Feltet kan ikke være tomt'

    return errors
  }

  render () {
    const {data, errors, loading} = this.state

    return (
      <div>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' color='blue' textAlign='center'>
            </Header>
            <Header as='h2' color='blue' textAlign='center'>
              Innlogging
            </Header>
            <Form onSubmit={this.onSubmit} loading={loading} size='large'>
              {errors.global && (
                <Message negative>
                  <Message.Header>Noe gikk galt</Message.Header>
                  <p>{errors.global}</p>
                </Message>
              )}
              <Segment stacked>
                <Form.Field error={!!errors.email}>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    type='email'
                    id='email'
                    name='email'
                    placeholder='eksempel@ssb.no'
                    value={data.email}
                    onChange={this.onChange} />
                  {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Passord'
                    value={data.password}
                    onChange={this.onChange} />
                  {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button color='blue' fluid size='large'>Login</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default LoginForm