import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Icon, Label, Segment } from 'semantic-ui-react'

import { WorkbenchContext } from '../../context/ContextProvider'
import { SSBLogo } from '../../media/Logo'
import { LANGUAGES, UI } from '../../utilities/enum'
import _ from 'lodash'
import { LDS_INSTANCES } from "../../utilities/enum/LDS_INSTANCES"

class UserPreferences extends Component {
  static contextType = WorkbenchContext

  _isMounted = false

  state = {
    rolesReady: false,
    statisticalProgramsReady: false,
    formValidated: false,
    saved: false,
    error: this.props.error,
    errorText: undefined,
    userPrefs:{
      uuid: _.get(this.context.user, 'userPrefs.uuid'),
      preferences: {
        role: _.get(this.context.user, 'userPrefs.preferences.role'),
        statisticalProgram: _.get(this.context.user, 'userPrefs.preferences.statisticalProgram'),
        language: _.get(this.context.user, 'userPrefs.preferences.language'),
        lds: _.get(this.context.user, 'userPrefs.preferences.lds')
      }
    },
    handleSave: this.props.handleUpdate,
    handleCancel: this.props.handleCancel
  }

  handleChange = (e, {name, value}) => {
    let prefs = this.state.userPrefs
    prefs.preferences[name] = value
    this.setState(prevState => {
      return {
        userPrefs: prefs, saved: false,
        formValidated: prevState.userPrefs.preferences.role
        && prevState.userPrefs.preferences.statisticalProgram
        && prevState.userPrefs.preferences.statisticalProgram.length  > 0
        && prevState.userPrefs.preferences.language
        && prevState.userPrefs.preferences.lds
      }
    })
  }

  handleSubmit = () => {
    this.state.handleSave(this.state.userPrefs).then( () =>
      this.setState({ formValidated: false, saved: true })
    ).catch((error) => {
      console.error('Error saving user preferences: ', error)
      this.setState({
        formValidated: true,
        saved: false,
        error: true,
        errorText: error ? error.text : UI.GENERIC_ERROR
      })
    })
  }

  componentDidMount () {
    this._isMounted = true;
    let context = this.context

    context.ldsService.getRoles().then(roles => {
        if (this._isMounted) {
          this.setState({
            rolesReady: true,
            roles: roles
          })
        }
      }
    ).catch(error => {
      console.error('Error contacting LDS:', error)
      this.setState({
        error: true,
        errorText: error ? error.text : UI.GENERIC_ERROR
      })
    })
    context.ldsService.getStatisticalPrograms().then(statisticalPrograms => {
      if (this._isMounted) {
        this.setState({
          statisticalProgramsReady: true,
          statisticalPrograms: statisticalPrograms
        })
      }
    }).catch(error => {
      console.log(error)
      if (this._isMounted) {
        this.setState({
          error: true,
          errorText: error ? error.text : UI.GENERIC_ERROR
        })
      }
    })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  formatDropdownValues (ready, values) {
    let context = this.context
    return ready ?
      values
        .filter(value => value.name !== undefined) // Remove values without name property
        .map(value => {
      return ({
        key: value.id,
        text: context.getLocalizedGsimObjectText(value.name),
        value: value.id
      })
    }) : null
  }

  render () {
    let context = this.context

    const { fullscreen } = this.props
    const { rolesReady, roles, statisticalProgramsReady, statisticalPrograms, formValidated,
      saved, error, userPrefs, handleCancel } = this.state

    const roleValues = this.formatDropdownValues(rolesReady, roles)
    const statisticalProgramValues = this.formatDropdownValues(statisticalProgramsReady, statisticalPrograms)

    const languages = Object.keys(LANGUAGES).map( language => ({
      key: language,
      text: UI.LANGUAGE_CHOICE[LANGUAGES[language].languageCode],
      value: language
    }))

    const ldsInstances = Object.keys(LDS_INSTANCES).map(lds => ({
        key: lds,
        text: LDS_INSTANCES[lds][context.languageCode],
        value: lds
    }))

    const columnProps = (fullscreen) => {
      if (fullscreen) {
        return {
          mobile: 16, tablet: 8, computer: 4
        }
      } else {
        return {
        }
      }
    }

    return (
      <div className='vertical-display'>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column {...columnProps(fullscreen)}>
            {fullscreen &&
            <span>
              <Divider hidden/>
                {SSBLogo('100%')}
              <Divider hidden/>
              </span>
            }
            <Segment>
              <Form size='large'>
                <Form.Select fluid name='role'
                             placeholder={context.getLocalizedText(UI.ROLE)}
                             value={userPrefs.preferences.role}
                             options={!rolesReady ? [] : roleValues}
                             onChange={this.handleChange}
                             label={context.getLocalizedText(UI.ROLE)}
                             data-testid='role-dropdown'
                             disabled={!rolesReady} loading={!rolesReady}/>
                <Form.Select fluid name='statisticalProgram'
                             placeholder={context.getLocalizedText(UI.STATISTICAL_PROGRAM)}
                             defaultValue={userPrefs.preferences.statisticalProgram}
                             options={!statisticalProgramsReady ? [] : statisticalProgramValues}
                             onChange={this.handleChange}
                             multiple
                             label={context.getLocalizedText(UI.STATISTICAL_PROGRAM)}
                             disabled={!statisticalProgramsReady} loading={!rolesReady}/>
                <Form.Select fluid name='language'
                             placeholder={context.getLocalizedText(UI.LANGUAGE)}
                             value={userPrefs.preferences.language}
                             label={context.getLocalizedText(UI.LANGUAGE)}
                             options={languages}
                             onChange={this.handleChange} />
                <Form.Select fluid name='lds'
                             placeholder={context.getLocalizedText(UI.LDS)}
                             value={userPrefs.preferences.lds}
                             label={context.getLocalizedText(UI.LDS)}
                             options={ldsInstances}
                             onChange={this.handleChange} />
                <Button primary size='large' content={context.getLocalizedText(UI.SAVE)} onClick={this.handleSubmit}
                        data-testid='save-button' disabled={!formValidated}/>
                {handleCancel && <Button size='large' content={context.getLocalizedText(UI.CANCEL)} onClick={handleCancel}
                        data-testid='cancel-button'/>}
              </Form>
            </Segment>
            {saved && !error &&
            <Label color='green'> {`${context.getLocalizedText(UI.CHANGES_SAVED)}`} <Icon name='check circle'/></Label> }
            {error &&
            <Label color='red'> {`${context.getLocalizedText(UI.GENERIC_ERROR)}`} <Icon name='times circle outline'/></Label> }
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default UserPreferences
