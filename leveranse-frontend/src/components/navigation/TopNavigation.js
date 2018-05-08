import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'

export default class TopNavigation extends Component {
  state = {activeItem: 'provisionAgreement'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render () {
    const {activeItem} = this.state

    return (
      <div>
        <Menu pointing stackable>
          <Menu.Item name='Leveransebeskrivelse' active={activeItem === 'provisionAgreement'}
                     onClick={this.handleItemClick}/>
          <Menu.Item name='Kontaktpersoner' active={activeItem === 'terms'} onClick={this.handleItemClick}/>
          <Menu.Item name='Levranseformat' active={activeItem === 'rawDataStructure'} onClick={this.handleItemClick}/>
          <Menu.Item name='Dokumenter' active={activeItem === 'rawDataStructure'} onClick={this.handleItemClick}/>
          <Menu.Item name='Forventede leveranser' active={activeItem === 'rawDataStructure'} onClick={this.handleItemClick}/>
          <Menu.Item>
              <Input size='mini' icon='search' placeholder='Søk...'/>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}