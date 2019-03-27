import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

import { SSBLogo } from '../../media/Logo'
import { UI } from '../../utilities/enum'
import { mockRole } from '../../mocks/MockRole'
import { mockDataResource } from '../../mocks/MockDataResource'

class Login extends Component {
  render () {
    const {dataResource, handleChange, handleLogin, languageCode, password, role, user} = this.props

    const dataResourceOptions = Object.keys(mockDataResource).map(dataResource => ({
      key: dataResource,
      text: mockDataResource[dataResource].name[languageCode],
      value: dataResource
    }))

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
                <Form.Select fluid name='role' placeholder={UI.ROLE[languageCode]} value={role}
                             options={Object.keys(mockRole).map(role =>
                               ({key: mockRole[role].key, text: mockRole[role].name[languageCode], value: role}))}
                             onChange={handleChange} label={UI.ROLE[languageCode]} />
                <Form.Select fluid name='dataResource' placeholder={UI.DATA_RESOURCE[languageCode]}
                             value={dataResource} label={UI.DATA_RESOURCE[languageCode]} multiple
                             options={dataResourceOptions} onChange={handleChange} />
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
