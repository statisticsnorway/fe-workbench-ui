import React, { Component } from 'react'
import { Input, Menu} from 'semantic-ui-react'

export default class TopNavigation extends Component {
    state = { activeItem: 'leveranseAvatale' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu pointing stackable>
                    <Menu.Item name='Leveranse Avatale' active={activeItem === 'leveranseAvatale'} onClick={this.handleItemClick} />
                    <Menu.Item name='Begrep' active={activeItem === 'begrep'} onClick={this.handleItemClick} />
                    <Menu.Item name='Rådatastruktur' active={activeItem === 'rådatastruktur'} onClick={this.handleItemClick} />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' placeholder='Search...' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}