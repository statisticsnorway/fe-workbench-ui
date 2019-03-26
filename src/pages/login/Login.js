import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

import { SSBLogo } from '../../media/Logo'
import { UI } from '../../utilities/enum'

class Login extends Component {
  render () {
    const {handleChange, handleLogin, languageCode, password, user} = this.props

    return (
      <div className='vertical-display'>
        <style>{`body > div,body > div > div, body > div > div > div.vertical-display {height: 100%;}`}</style>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            {SSBLogo('100%')}
            <Divider hidden />
            <Segment>
              <Form size='large'>
                <Form.Input fluid icon='user' iconPosition='left' name='user' placeholder={UI.USER[languageCode]}
                            value={user} onChange={handleChange} />
                <Form.Input fluid icon='lock' iconPosition='left' name='password' type='password' value={password}
                            placeholder={UI.PASSWORD[languageCode]} onChange={handleChange} />
                <Button primary fluid size='large' content={UI.LOGIN[languageCode]} onClick={handleLogin}
                        data-testid='login-button' />
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login
