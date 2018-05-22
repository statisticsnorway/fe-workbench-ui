import React from 'react'
import { Grid, Tab } from 'semantic-ui-react'
import { BrowserRouter } from 'react-router-dom'
import LeveranseDescription from './LeveranseDescription'

class NewProvisionAgreement extends React.Component {

  state = {activeItem: 'Leveransebeskrivelse'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render () {
    const {activeItem} = this.state
    const panes = [
      {
        menuItem: 'Leveransebeskrivelse',
        render: () => <Tab.Pane><LeveranseDescription></LeveranseDescription></Tab.Pane>
      },
      {menuItem: 'Kotaktpersoner', render: () => <Tab.Pane>Kotaktpersoner Content</Tab.Pane>},
      {menuItem: 'Leveranseformat', render: () => <Tab.Pane>Leveranseformat Content</Tab.Pane>},
      {menuItem: 'Documenter', render: () => <Tab.Pane>Documenter Content</Tab.Pane>},
      {menuItem: 'Forventede leveranser', render: () => <Tab.Pane>Forventede leveranser Content</Tab.Pane>},
    ]
    return (
      <BrowserRouter>
        <div>
          <Grid stackable>
            <Grid.Column width={16}>
              <Tab panes={panes}/>
            </Grid.Column>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default NewProvisionAgreement