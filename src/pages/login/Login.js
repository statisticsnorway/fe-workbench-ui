import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

import { SSBLogo } from '../../media/Logo'
import { UI } from '../../utilities/Enum'

class Login extends Component {
  handleChange = (event) => {
    this.props.handleChange(event)
  }

  handleLogin = () => {
    this.props.handleLogin()
  }

  render () {
    const {user, password, languageCode} = this.props

    return (
      <Grid textAlign='center' centered columns={5} verticalAlign='middle'>
        <Grid.Column>
          {SSBLogo('100%')}
          <Divider hidden />
          <Segment>
            <Form size='large'>
              <Form.Input fluid icon='user' iconPosition='left' name='user' placeholder={UI.USER[languageCode]}
                          value={user} onChange={this.handleChange} />
              <Form.Input fluid icon='lock' iconPosition='left' name='password' placeholder={UI.PASSWORD[languageCode]}
                          type='password' value={password} onChange={this.handleChange} />
              <Button primary fluid size='large' content={UI.LOGIN[languageCode]} onClick={this.handleLogin} />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
