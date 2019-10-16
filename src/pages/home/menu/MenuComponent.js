import React from "react";
import TopMenu from "./TopMenu"
import LeftMenu from "./LeftMenu"
import { Button, Grid } from "semantic-ui-react"
import FlipTransition from "./FlipTransition"
import { SSBLogo } from '../../../media/Logo'

const MenuComponent = ( props ) => {

  const leftMenuButton = (
    <Button onMouseEnter={() => props.toggleLeftMenuCallback(true)} basic  color='teal'
            data-testid='leftMenu-show' icon={props.leftMenuVisible ? 'close' : 'bars'}
    />)
  const leftMenu = (
    <div style={{ position: 'fixed', zIndex: 20, marginTop: '0px', width: 'fit-content' }}
         onMouseLeave={() => props.toggleLeftMenuCallback(false)}>
    <LeftMenu data-testid='leftMenu'/>
  </div>)

  return (
    <>
      {/*TODO make page slide up smoothly*/}
      <TopMenu handleLogout={props.handleLogout} user={props.user} topMenuVisible={props.topMenuVisible}
               handlePreferenceUpdate={props.handlePreferenceUpdate}
               toggleLeftMenuCallback={ () => props.toggleLeftMenuCallback(false) } />
      <Grid columns='equal'>
        <Grid.Column>
          {/*TODO prevent some elements in main page (icon, textfield) to be visible on top of menu during transition*/}
          <FlipTransition
            animation='fade right'
            duration={1}
          >
          <span key={props.leftMenuVisible}>
            {!props.leftMenuVisible ? leftMenuButton : leftMenu}
          </span>
          </FlipTransition>
        </Grid.Column>
        <Grid.Column width={8} textAlign='center'>
          {/*TODO transition on logo, but need to still occupy the space while hidden to prevent page content from jumping*/}
          <div style={{visibility: `${props.topMenuVisible ? 'hidden' : 'visible'}`}}>{SSBLogo('21%')}</div>
        </Grid.Column>
        <Grid.Column>
          <Button style={{ float: 'right' }} basic icon={props.topMenuVisible ? 'chevron up' : 'chevron down'}  color='teal'
                  onClick={() => props.toggleTopMenuCallback(!props.topMenuVisible)} data-testid='topMenu-toggle'/>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default MenuComponent