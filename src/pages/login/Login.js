import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { SSBLogo } from '../../media/Logo'
import { getData } from '../../utilities/fetch/Fetch'
import { UI } from '../../utilities/enum'

import { mockDataResource } from '../../mocks/MockDataResource'

class Login extends Component {
  static contextType = WorkbenchContext

  state = {
    ready: false,
    roles: []
  }

  componentDidMount () {
    let context = this.context

    getData(process.env.REACT_APP_ROLES).then(roles => {
      this.setState({
        ready: true,
        roles: roles.map(role => ({
            key: role.id,
            text: role.name.filter(name => name.languageCode === context.languageCode)[0].languageText,
            value: role.id
          })
        )
      })
    }).catch(error => {
      console.log(error)

      this.setState({ ready: true })
    })
  }

  render () {
    const { dataResource, handleChange, handleLogin, role, user } = this.props
    const { ready, roles } = this.state

    let context = this.context

    const dataResourceOptions = Object.keys(mockDataResource).map(dataResource => ({
      key: dataResource,
      text: mockDataResource[dataResource].name[context.languageCode],
      value: dataResource
    }))

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
                <Form.Select fluid name='role' placeholder={UI.ROLE[context.languageCode]} value={role} loading={!ready}
                             options={roles} onChange={handleChange} label={UI.ROLE[context.languageCode]}
                             disabled={!ready} />
                <Form.Select fluid name='dataResource' placeholder={UI.DATA_RESOURCE[context.languageCode]}
                             value={dataResource} label={UI.DATA_RESOURCE[context.languageCode]} multiple
                             options={dataResourceOptions} onChange={handleChange} />
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
