import React, { Component } from 'react'
import {  Menu } from 'semantic-ui-react'
import { NavLink, BrowserRouter } from 'react-router-dom'

export default class TopNavigation extends Component {
  state = {activeItem: 'Leveransebeskrivelse'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render () {
    const {activeItem} = this.state

    return (
      <BrowserRouter>
        <div>
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
            <Menu.Item name='Levranseformat' active={activeItem === 'rawDataStructure'} onClick={this.handleItemClick}/>
            <Menu.Item name='Dokumenter' active={activeItem === 'rawDataStructure'} onClick={this.handleItemClick}/>
            <Menu.Item name='Forventede leveranser' active={activeItem === 'rawDataStructure'}
                       onClick={this.handleItemClick}/>
          </Menu>
        </div>
      </BrowserRouter>
    )
  }
}