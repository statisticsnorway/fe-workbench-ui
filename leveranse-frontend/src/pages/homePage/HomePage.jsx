import React from 'react'
import { Grid, Icon, Image, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import WorkbenchPage from '../WorkbenchPage'
import ssb_logo from '../../assets/ssb_logo.png'

class HomePage extends React.Component {
  render () {
    const {user} = this.props

    return (
      <div>
        <Grid columns={2} padded>
          <Grid.Column width={3}>
            <Image src={ssb_logo} size='medium' as='a' href='/home' />
          </Grid.Column>
          <Grid.Column textAlign='right' width={13}>
            <Item>
              <Item.Content>
                <Item.Header>
                  <Icon name='user' />
                  {user}
                </Item.Header>
                <Item.Meta>
                  <Link to='/login'>Logout</Link>
                </Item.Meta>
              </Item.Content>
            </Item>
          </Grid.Column>
        </Grid>

        <WorkbenchPage />
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {authentication} = state
  const {user} = authentication

  return {
    user
  }
}

const connectedHomePage = connect(mapStateToProps)(HomePage)
export { connectedHomePage as HomePage }