import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import ssb_logo from '../../assets/ssb_logo.png'

const HeaderLogo = () => (
  <Grid celled='internally'>
    <Grid.Row>
      <Grid.Column>
        <Image src={ssb_logo} size='medium' as='a' href='/home' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default HeaderLogo