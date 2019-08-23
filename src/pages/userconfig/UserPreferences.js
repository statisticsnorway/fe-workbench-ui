import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Icon, Label, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { SSBLogo } from '../../media/Logo'
import { LANGUAGES, UI } from '../../utilities/enum'
import _ from 'lodash'

class UserPreferences extends Component {
  static contextType = WorkbenchContext

  state = {
    rolesReady: false,
    dataResourcesReady: false,
    formValidated: false,
    saved: false,
    error: this.props.error,
    userPrefs:{
      uuid: _.get(this.props.user, 'userPrefs.uuid'),
      preferences: {
        role: _.get(this.props.user, 'userPrefs.preferences.role'),
        dataResource: _.get(this.props.user, 'userPrefs.preferences.dataResource'),
        language: _.get(this.props.user, 'userPrefs.preferences.language'),
      }
    },
    handleSave: this.props.handleUpdate
  }

  handleChange = (e, {name, value}) => {
    let context = this.context
    let prefs = this.state.userPrefs
    prefs.preferences[name] = value
    this.setState(prevState => {
      return {
        userPrefs: prefs,saved: false,
        formValidated: prevState.userPrefs.preferences.role
        && prevState.userPrefs.preferences.dataResource
        && prevState.userPrefs.preferences.dataResource.length  > 0
        && prevState.userPrefs.preferences.language
      }
    })
    if (name === 'language') {
      context.setLanguage(LANGUAGES[value].languageCode)
    }
  }

  handleSubmit = () => {
    this.state.handleSave(this.state.userPrefs).then( () =>
      this.setState({ formValidated: false, saved: true })
    ).catch((error) => {
      console.error('Error saving user preferences: ', error)
      this.setState({ formValidated: true, saved: false, error: true })
    })
  }

  componentDidMount () {
    let context = this.context

    context.ldsService.getRoles().then(roles =>
      this.setState({
        rolesReady: true,
        roles: roles
      })
    ).catch(error => {
      console.error('Error contacting LDS:', error)
      this.setState({rolesReady: true})
    })


    context.ldsService.getDataResources().then(dataResources => {
      this.setState({
        dataResourcesReady: true,
        dataResources: dataResources
      })
    }).catch(error => {
      console.log(error)
      this.setState({dataResourcesReady: true})
    })
  }

  formatDropdownValues (ready, values) {
    let context = this.context
    return ready ?
      values
        .filter(value => value.name !== undefined) //remove values without name property
        .map(value => {
      // Check if name has text in chosen language, if not, use first
      let text = value.name.find(name => name.languageCode === context.languageCode) || value.name[0]
      text = text === undefined ? null : text.languageText
      return ({
        key: value.id,
        text: text,
        value: value.id
      })
    }) : null
  }

  render () {
    let context = this.context

    const { location } = this.props
    const { rolesReady, roles, dataResourcesReady, dataResources, formValidated, saved, error } = this.state

    const roleValues = this.formatDropdownValues(rolesReady, roles)
    const dataResourceValues = this.formatDropdownValues(dataResourcesReady, dataResources)

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
                <Form.Select fluid name='role' placeholder={UI.ROLE[context.languageCode]} value={this.state.userPrefs.preferences.role}
                             options={!rolesReady ? [] : roleValues} onChange={this.handleChange}
                             label={UI.ROLE[context.languageCode]} data-testid='role-dropdown'
                             disabled={!rolesReady} loading={!rolesReady}/>
                <Form.Select fluid name='dataResource' placeholder={UI.DATA_RESOURCE[context.languageCode]}
                             defaultValue={this.state.userPrefs.preferences.dataResource}
                             options={!dataResourcesReady ? [] : dataResourceValues} onChange={this.handleChange} multiple
                             label={UI.DATA_RESOURCE[context.languageCode]}
                             disabled={!dataResourcesReady} loading={!rolesReady}/>
                <Form.Select fluid name='language' placeholder={UI.LANGUAGE[context.languageCode]}
                             value={this.state.userPrefs.preferences.language} label={UI.LANGUAGE[context.languageCode]}
                             options={languages} onChange={this.handleChange} />
                <Button primary fluid size='large' content={UI.SAVE[context.languageCode]} onClick={this.handleSubmit}
                        data-testid='save-button' disabled={!formValidated}/>
              </Form>
            </Segment>
            {saved && !error &&
            <Label color='green'> {`${UI.CHANGES_SAVED[context.languageCode]}`} <Icon name='check circle'/></Label> }
            {error &&
            <Label color='red'> {`${UI.GENERIC_ERROR[context.languageCode]}`} <Icon name='times circle outline'/></Label> }
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default UserPreferences
