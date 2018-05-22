import React from 'react'
import {  Menu, Grid, Segment } from 'semantic-ui-react'
import { Route, NavLink, BrowserRouter } from 'react-router-dom'
import LeveranseDescription from './LeveranseDescription'

class NewProvisionAgreement extends React.Component {

  state = {activeItem: 'Leveransebeskrivelse'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render () {
    const {activeItem} = this.state
    return (
      <BrowserRouter>
        <div>
          <Grid stackable>
            <Grid.Column width={13}>
              <Menu pointing stackable>
                <Menu.Item name='Leveransebeskrivelse' active={activeItem === 'Leveransebeskrivelse'}
                           onClick={this.handleItemClick}>
                  <NavLink to="/leveranseDescription">
                    Leveransebeskrivelse
                  </NavLink>
                </Menu.Item>
                <Menu.Item name='Kontaktpersoner' active={activeItem === 'terms'} onClick={this.handleItemClick}>
                  <NavLink to="/contactPerson">
                    KontaktPerson
                  </NavLink>
                </Menu.Item>
                <Menu.Item name='Levranseformat' active={activeItem === 'rawDataStructure'}
                           onClick={this.handleItemClick}/>
                <Menu.Item name='Dokumenter' active={activeItem === 'rawDataStructure'} onClick={this.handleItemClick}/>
                <Menu.Item name='Forventede leveranser' active={activeItem === 'rawDataStructure'}
                           onClick={this.handleItemClick}/>
              </Menu>
            </Grid.Column>
            <Grid.Column width={16}>
              <Segment>
                <Route path="/leveranseDescription" component={LeveranseDescription}/>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default NewProvisionAgreement