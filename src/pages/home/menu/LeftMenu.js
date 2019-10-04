import React, { useContext, useState } from 'react'
import { Accordion, Menu } from 'semantic-ui-react'
import { MENU } from '../../../utilities/enum'
import { Link } from 'react-router-dom'
import { WorkbenchContext } from '../../../context/ContextProvider'


const LeftMenu = () => {
  const context = useContext(WorkbenchContext)

  const [activeIndex, setActiveIndex] = useState(-1)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

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
      <Accordion as={Menu} vertical inverted >
        <Menu.Item style={{ textAlign: 'left' }}>
          <Accordion.Title
            active={activeIndex === 0}
            content={MENU.COLLECTION[context.languageCode]}
            index={0}
            onClick={handleClick}
          />
          <Accordion.Content active={activeIndex === 0} content={CollectionMenu}/>
        </Menu.Item>

        <Menu.Item style={{ textAlign: 'left' }}>
          <Accordion.Title
            active={activeIndex === 1}
            content={MENU.PREP_AND_ANALYSIS[context.languageCode]}
            index={1}
            onClick={handleClick}
          />
          <Accordion.Content active={activeIndex === 1} content={PrepAndAnalysisMenu}/>
        </Menu.Item>

        <Menu.Item style={{ textAlign: 'left' }}>
          <Accordion.Title
            active={activeIndex === 2}
            content={MENU.METADATA[context.languageCode]}
            index={2}
            onClick={handleClick}
          />
          <Accordion.Content active={activeIndex === 2} content={MetadataMenu}/>
        </Menu.Item>

        <Menu.Item style={{ textAlign: 'left' }}>
          <Accordion.Title
            active={activeIndex === 3}
            content={MENU.DOCUMENTATION[context.languageCode]}
            index={3}
            onClick={handleClick}
          />
          <Accordion.Content active={activeIndex === 3} content={DocumentationMenu}/>
        </Menu.Item>

        <Menu.Item style={{ textAlign: 'left', color: 'rgba(255,255,255,.9)' }} as={Link}
                   to='/search'>{MENU.SEARCH[context.languageCode]}</Menu.Item>
      </Accordion>
  )
}

export default LeftMenu