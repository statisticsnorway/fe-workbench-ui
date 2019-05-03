import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { SSBLogo } from '../../media/Logo'
import { UI, LANGUAGES } from '../../utilities/enum'

import { mockDataResource } from '../../mocks/MockDataResource'


class UserPreferences extends Component {
  static contextType = WorkbenchContext

  state = {
    ready: false,
    roles: []
  }

  componentDidMount () {
    let context = this.context

    context.ldsService.getRoles().then(roles => {
      this.setState({
        ready: true,
        roles: roles.map(role => ({
            key: role.id,
            text: role.name.filter(name => name.languageCode === context.languageCode).map(name => name.languageText)[0],
            value: role.id
          })
        )
      })
    }).catch(error => {
      console.log(error)

      this.setState({ready: true})
    })
  }

  render () {
    // TODO get preferences object from props
    const { dataResource, handleChange, handleUpdate, role, language, location } = this.props
    const { ready, roles } = this.state

    let context = this.context

    const dataResourceOptions = Object.keys(mockDataResource).map(dataResource => ({
      key: dataResource,
      text: mockDataResource[dataResource].name[context.languageCode],
      value: dataResource
    }))

    const languages = Object.keys(LANGUAGES).map( language => ({
      key: language,
      text: UI.LANGUAGE_CHOICE[LANGUAGES[language].languageCode],
      value: language
    }))

    return (
      <div className='vertical-display'>
        <style>{`body > div,body > div > div, body > div > div > div.vertical-display {height: 100%;}`}</style>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            {location === undefined &&
              <span>
                {SSBLogo('100%')}
                <Divider hidden/>
              </span>
            }
            <Segment>
              <Form size='large'>
                <Form.Select fluid name='role' placeholder={UI.ROLE[context.languageCode]} value={role} loading={!ready}
                             options={roles} onChange={handleChange} label={UI.ROLE[context.languageCode]}
                             disabled={!ready} />
                <Form.Select fluid name='dataResource' placeholder={UI.DATA_RESOURCE[context.languageCode]}
                             value={dataResource} label={UI.DATA_RESOURCE[context.languageCode]} multiple
                             options={dataResourceOptions} onChange={handleChange} />
                <Form.Select fluid name='language' placeholder={UI.LANGUAGE[context.languageCode]}
                             value={language} label={UI.LANGUAGE[context.languageCode]}
                             options={languages} onChange={handleChange} />
                <Button primary fluid size='large' content={UI.SAVE[context.languageCode]} onClick={handleUpdate}
                        data-testid='save-button' />
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default UserPreferences
