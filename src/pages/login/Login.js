import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { SSBLogo } from '../../media/Logo'
import { UI } from '../../utilities/enum'

class Login extends Component {
  static contextType = WorkbenchContext

  state = {
    ready: false,
    roles: []
  }

  render () {
    const { handleChange, handleLogin,  user } = this.props


    let context = this.context

    return (
      <div className='vertical-display'>
        <style>{`body > div,body > div > div, body > div > div > div.vertical-display {height: 100%;}`}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            {SSBLogo('100%')}
            <Divider hidden />
            <Segment>
              <Form size='large'>
                <Form.Input fluid icon='user' iconPosition='left' name='user' value={user} onChange={handleChange}
                            placeholder={UI.USER[context.languageCode]} />
                <Button primary fluid size='large' content={UI.LOGIN[context.languageCode]} onClick={handleLogin}
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
