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
          <Menu.Item name='Leveranseavtale' active={activeItem === 'provisionAgreement'}
                     onClick={this.handleItemClick}/>
          <Menu.Item name='Begrep' active={activeItem === 'terms'} onClick={this.handleItemClick}/>
          <Menu.Item name='Rådatastruktur' active={activeItem === 'rawDataStructure'} onClick={this.handleItemClick}/>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Søk...'/>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}