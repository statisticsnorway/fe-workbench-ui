import React from 'react'
import { connect } from 'react-redux'
import { Grid, Tab } from 'semantic-ui-react'
import { BrowserRouter } from 'react-router-dom'
import { ProvisionAgreementDesc } from './ProvisionAgreementDesc'
import '../../assets/css/site.css'
import { ContactPerson } from '../contactPerson/ContactPerson'
import { provisionAgreementActions } from "../../actions";


class ProvisionAgreement extends React.Component {

  componentWillMount(){
    const {dispatch} = this.props
    dispatch(provisionAgreementActions.reset())
  }

  render() {
    console.log("Props in PA: ", this.props.location.state)
    const panes = [
      {
        menuItem: 'Leveransebeskrivelse',
        render: () => <Tab.Pane><ProvisionAgreementDesc
          selectedData={this.props.location.state} createdPA={this.props.location.state}/></Tab.Pane>
      },
      {
        menuItem: 'Kontaktpersoner',
        render: () => <Tab.Pane><ContactPerson selectedData={this.props.location.state} /></Tab.Pane>
      },
      {menuItem: 'Leveranseformat', render: () => <Tab.Pane>Leveranseformat innhold</Tab.Pane>},
      {menuItem: 'Dokumenter', render: () => <Tab.Pane>Dokumenter innhold</Tab.Pane>},
      {menuItem: 'Forventede leveranser', render: () => <Tab.Pane>Forventede leveranser innhold</Tab.Pane>}
    ]

    return (
      <BrowserRouter>
        <div>
          <Grid stackable>
            <Grid.Column width={16}>
              <Tab menu={{className: 'wrapped'}} panes={panes} />
            </Grid.Column>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  const {authentication, alert, createdPA} = state
  return {
    authentication,
    createdPA,
    alert
  }
}

const connectedProvisionAgreement = connect(mapStateToProps)(ProvisionAgreement)
export { connectedProvisionAgreement as ProvisionAgreement }
