import React from 'react'
import { Grid, Tab } from 'semantic-ui-react'
import { BrowserRouter } from 'react-router-dom'
import LeveranseDescription from './LeveranseDescription'
import '../../../assets/css/site.css'
import ContactPerson from "../contactPerson/ContactPerson";

class NewProvisionAgreement extends React.Component {

  render () {
    const panes = [
      {
        menuItem: 'Leveransebeskrivelse',
        render: () => <Tab.Pane><LeveranseDescription isNewProvisionAgreement={this.props.isNewProvisionAgreement}/></Tab.Pane>
      },
      {menuItem: 'Kontaktpersoner', render: () => <Tab.Pane><ContactPerson/></Tab.Pane>},
      {menuItem: 'Leveranseformat', render: () => <Tab.Pane>Leveranseformat Content</Tab.Pane>},
      {menuItem: 'Documenter', render: () => <Tab.Pane>Documenter Content</Tab.Pane>},
      {menuItem: 'Forventede leveranser', render: () => <Tab.Pane>Forventede leveranser Content</Tab.Pane>},
    ]
    return (
      <BrowserRouter>
        <div>
          <Grid stackable>
            <Grid.Column width={16}>
              <Tab menu={{ className: 'wrapped' }} panes={panes}/>
            </Grid.Column>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default NewProvisionAgreement