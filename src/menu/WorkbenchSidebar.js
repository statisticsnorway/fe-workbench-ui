import React, { Component } from 'react'
import { Accordion, Menu, Sidebar } from 'semantic-ui-react'
import './slidingmenu.css'
import { MENU } from '../utilities/enum'
import { Link } from 'react-router-dom'
import { WorkbenchContext } from '../context/ContextProvider'

class WorkbenchSidebar extends Component {
  static contextType = WorkbenchContext

  state = {
    activeIndex: -1
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render () {
    const {visible, animation, direction, closeCallback, style} = this.props
    const {activeIndex} = this.state
    let context = this.context

    const CollectionMenu = (
      <Menu.Menu>
        <Menu.Item style={{textAlign:'left'}} as={Link} to='/collection/dashboard'>{MENU.DASHBOARD[context.languageCode]}</Menu.Item>
        <Menu.Item style={{textAlign:'left'}} as={Link} to='/collection/setup'>{MENU.SETUP_AND_CONFIG[context.languageCode]}</Menu.Item>
      </Menu.Menu>
    )

    const PrepAndAnalysisMenu = (
      <Menu.Menu>
        <Menu.Item style={{textAlign:'left'}} as={Link} to='/prep/notebooks'>{MENU.NOTEBOOKS[context.languageCode]}</Menu.Item>
        <Menu.Item style={{textAlign:'left'}} as={Link} to='/prep/analysis'>{MENU.PREP_ANALYSIS[context.languageCode]}</Menu.Item>
        <Menu.Item style={{textAlign:'left'}} as={Link} to='/prep/setup'>{MENU.SETUP_AND_CONFIG[context.languageCode]}</Menu.Item>
        <Menu.Item style={{textAlign:'left'}} as={Link} to='/prep/methodlibrary'>{MENU.METHODLIBRARY[context.languageCode]}</Menu.Item>
      </Menu.Menu>
    )

    const MetadataMenu = (
      <Menu.Menu>
        <Menu.Item style={{textAlign:'left'}} as={Link} to='/metadata/import'>{MENU.IMPORT[context.languageCode]}</Menu.Item>
        <Menu.Item style={{textAlign:'left'}} as={Link} to='/metadata/gsimbrowser'>{MENU.GSIM_BROWSER[context.languageCode]}</Menu.Item>
        <Menu.Item style={{textAlign:'left'}} href='https://data.ssb.no' target='_blank'>{MENU.KLASS[context.languageCode]}</Menu.Item>
      </Menu.Menu>
    )

    const DocumentationMenu = (
      <Menu.Menu>
        <Menu.Item style={{textAlign:'left'}} href='https://wiki.ssb.no' target='_blank'>{MENU.USER_DOC[context.languageCode]}</Menu.Item>
        <Menu.Item style={{textAlign:'left'}} href='https://wiki.ssb.no' target='_blank'>{MENU.TECH_DOC[context.languageCode]}</Menu.Item>
      </Menu.Menu>
    )

    return (
      <Sidebar
        as={Menu}
        animation={animation}
        direction={direction}
        icon='labeled'
        inverted
        vertical
        visible={visible}
        width='thin'
        style={style}
        data-testid='leftMenu'
      >
        <Accordion as={Menu} vertical inverted>
          <Menu.Item as='a' onClick={closeCallback} data-testid='leftMenu-hide'>
            X
          </Menu.Item>
          <Menu.Item style={{ textAlign: 'left' }}>
            <Accordion.Title
              active={activeIndex === 0}
              content={context.getLocalizedText(MENU.COLLECTION)}
              index={0}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 0} content={CollectionMenu}/>
          </Menu.Item>

          <Menu.Item style={{ textAlign: 'left' }}>
            <Accordion.Title
              active={activeIndex === 1}
              content={context.getLocalizedText(MENU.PREP_AND_ANALYSIS)}
              index={1}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 1} content={PrepAndAnalysisMenu}/>
          </Menu.Item>

          <Menu.Item style={{ textAlign: 'left' }}>
            <Accordion.Title
              active={activeIndex === 2}
              content={context.getLocalizedText(MENU.METADATA)}
              index={2}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 2} content={MetadataMenu}/>
          </Menu.Item>

          <Menu.Item style={{ textAlign: 'left' }}>
            <Accordion.Title
              active={activeIndex === 3}
              content={context.getLocalizedText(MENU.DOCUMENTATION)}
              index={3}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 3} content={DocumentationMenu}/>
          </Menu.Item>

          <Menu.Item style={{ textAlign: 'left', color: 'rgba(255,255,255,.9)' }} as={Link}
                     to='/search'>{context.getLocalizedText(MENU.SEARCH)}</Menu.Item>
        </Accordion>
      </Sidebar>
    )
  }
}

export default WorkbenchSidebar