import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Dropdown, Grid, Icon, Label, Menu, Message } from 'semantic-ui-react'
import { SchemaHandler, UIFormBuilder, UITableBuilder } from 'react-components-library'

import { UI } from '../../utilities/Enum'
import { extractName, handleRoute, splitOnUppercase } from '../../utilities/Common'

const HEADER = {
  en: 'GSIM domains',
  nb: 'GSIM domener'
}

class GSIM extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ready: false,
      schemas: [],
      message: '',
      search: ''
    }
  }

  componentDidMount () {
    const {producer, endpoint, namespace, route} = this.props
    const updatedUrl = endpoint + handleRoute(namespace) + '?schema=embed'

    SchemaHandler(updatedUrl, producer, endpoint, namespace, false, route).then(schemas => {
      this.setState({
        schemas: schemas,
        ready: true
      })
    }).catch(error => {
      this.setState({
        schemas: [],
        ready: true,
        message: error.toString()
      })
    })
  }

  handleSearch = (event) => {
    this.setState({search: event.target.value})
  }

  render () {
    const {ready, schemas, message, search} = this.state
    const {producer, route, endpoint, user, languageCode, namespace} = this.props

    return (
      <Grid>
        <Grid.Column width={2}>
          <Menu vertical fluid>
            <Menu.Item header>
              {HEADER[languageCode]}
              <Label color='teal' size='large'>{ready ? schemas.length : <Icon fitted loading name='spinner' />}</Label>
            </Menu.Item>
            <Dropdown item scrolling search icon='search' placeholder={UI.SEARCH[languageCode]} value={search}
                      onSearchChange={this.handleSearch}>
              <Dropdown.Menu>
                {ready && search === '' && schemas.map((schema, index) => {
                  const domain = extractName(schema.$ref)
                  const link = route + domain

                  return <Dropdown.Item key={index} as={Link} to={link} content={splitOnUppercase(domain)} />
                })}

                {ready && search !== '' && schemas.map((schema, index) => {
                  const domain = extractName(schema.$ref)
                  const link = route + domain

                  if (domain.toUpperCase().includes(search.toUpperCase())) {
                    return <Dropdown.Item key={index} as={Link} to={link} content={splitOnUppercase(domain)} />
                  }

                  return null
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Grid.Column>
        <Grid.Column width={14}>
          <Switch>
            {ready && message !== '' && <Message error content={message} />}
            {ready && schemas.map((schema, index) => {
              const domain = extractName(schema.$ref)
              const path = route + domain + '/:id'

              return <Route key={index} path={path} exact
                            render={({match}) => <UIFormBuilder params={match.params} producer={producer}
                                                                schema={JSON.parse(JSON.stringify(schema))}
                                                                languageCode={languageCode} namespace={namespace}
                                                                endpoint={endpoint} user={user} />} />
            })}
            {ready && schemas.map((schema, index) => {
              const domain = extractName(schema.$ref)
              const path = route + domain

              return <Route key={index} path={path} exact
                            render={({match}) => <UITableBuilder params={match.params} producer={producer}
                                                                 schema={JSON.parse(JSON.stringify(schema))}
                                                                 languageCode={languageCode} namespace={namespace}
                                                                 endpoint={endpoint} routing={path} />} />
            })}
          </Switch>
        </Grid.Column>
      </Grid>
    )
  }
}

export default GSIM
