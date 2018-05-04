import React from 'react';
import { Grid, Image } from "semantic-ui-react";
import ssb_logo from '../../assets/SSB_logo.png';

const HeaderLogo = () => (
  <Grid celled='internally'>
    <Grid.Row>
      <Grid.Column>
        <Image src={ssb_logo} size='medium'/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default HeaderLogo;