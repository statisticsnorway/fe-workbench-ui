import React, { Component } from 'react'
import { WorkbenchContext } from '../../context/ContextProvider'
import { Link } from 'react-router-dom'
import { METADATA } from '../../utilities/enum'
import { Label } from 'semantic-ui-react'

const SubjectFieldTags = ({ names }) => {
  if (!names || names.length === 0) return <></>
  return names.map(value =>
    <Label as='a' color='green' tag key={value}>{value}</Label>
  )
}

class VariableItem extends Component {
  static contextType = WorkbenchContext

  render () {
    let context = this.context
    const { representedVariable } = this.props
    const subjectFields = representedVariable.variable.subjectFields
    const subjectFieldNames = subjectFields ? subjectFields.edges.map(value =>
      context.getLocalizedGsimObjectText(value.node.name)) : null
    return (
      <>
        <p style={{ marginBottom: 10 + 'px' }}>
          { representedVariable.id ?
            <Link to={{ 'pathname': '/variable/' + representedVariable.id }}>
              <b>{METADATA.TITLE[context.languageCode]}:</b> {context.getLocalizedGsimObjectText(representedVariable.name)}
            </Link> :
            <><b>{METADATA.TITLE[context.languageCode]}:</b> {context.getLocalizedGsimObjectText(representedVariable.name)}</>
          }
          <br/>
          <b>{METADATA.DESCRIPTION[context.languageCode]}:</b> {context.getLocalizedGsimObjectText(representedVariable.description)}
          <br/>
        </p>
        <SubjectFieldTags names={subjectFieldNames}/>
      </>
    )
  }
}

export default VariableItem
