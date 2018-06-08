import React from 'react'
import { Button, Grid, Item, Segment, Portal, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions } from '../../actions/index'
import ProvisionAgreementPage from '../ProvisionAgreementPage'
import ssb_logo from '../../assets/ssb_logo.png'

class HomePage extends React.Component {
  componentDidMount () {
    this.props.dispatch(userActions.getAll())
  }

  handleDeleteUser (id) {
    return (e) => this.props.dispatch(userActions.delete(id))
  }

  state = {open: false}

  handleClick = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})

  render () {
    const {open} = this.state
    const {user, users} = this.props
    return (
      <div>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src={ssb_logo} size='medium' as='a' href='/home'/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={3} padded>
          <Grid.Column>
            <Button
              content={open ? 'Hide Users' : 'View Users'}
              negative={open}
              positive={!open}
              onClick={this.handleClick}
            />

            <Portal onClose={this.handleClose} open={open}>
              <Segment style={{left: '10%', position: 'fixed', top: '15%', zIndex: 1000}}>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                <ul>
                  {users.items.map((user, index) =>
                    <li key={user.id}>
                      {user.firstName + ' ' + user.lastName}
                      {
                        user.deleting ? <em> - Deleting...</em>
                          : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                          : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                      }
                    </li>
                  )}
                </ul>
                }
              </Segment>
            </Portal>
          </Grid.Column>
          <Grid.Column/>
          <Grid.Column textAlign='right'>
            <Item>
              <Item.Content>
                <Item.Header>
                  <Icon name='user'/>
                  {user.firstName}
                </Item.Header>
                <Item.Meta>
                  <Link to="/login">Logout</Link>
                </Item.Meta>
              </Item.Content>
            </Item></Grid.Column>
        </Grid>
        <ProvisionAgreementPage/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {users, authentication} = state
  const {user} = authentication
  return {
    user,
    users
  }
}

const connectedHomePage = connect(mapStateToProps)(HomePage)
export { connectedHomePage as HomePage }