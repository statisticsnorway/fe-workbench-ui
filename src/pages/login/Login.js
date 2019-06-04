import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Icon, Label, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { SSBLogo } from '../../media/Logo'
import { UI } from '../../utilities/enum'

class Login extends Component {
  static contextType = WorkbenchContext

  state = {
    ready: false,
    roles: [],
    user: '',
    handleLogin: this.props.handleLogin
  }

  handleChange = (e, {name, value}) => {
    this.setState({ [name] : value })
  }

  handleSubmit = () => this.state.handleLogin(this.state.user)

  render () {
    let context = this.context
    const { error } = this.props

    return (
      <div className='vertical-display'>
        <style>{`body > div,body > div > div, body > div > div > div.vertical-display {height: 100%;}`}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            {SSBLogo('100%')}
            <Divider hidden />
            <Segment>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Form.Input fluid icon='user' iconPosition='left' name='user' value={this.state.user} onChange={this.handleChange}
                            placeholder={UI.USER[context.languageCode]} data-testid='user-input'/>
                <Button primary fluid size='large' content={UI.LOGIN[context.languageCode]} data-testid='login-button'
                disabled={this.state.user.length === 0}/>
              </Form>
            </Segment>
            {error &&
            <Label color='red'> {`${UI.GENERIC_ERROR[context.languageCode]}`} <Icon name='times circle outline'/></Label> }
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login
