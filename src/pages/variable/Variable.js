import React, { Component } from 'react'
import { WorkbenchContext } from '../../context/ContextProvider'
import { Label, Segment } from 'semantic-ui-react'
import VariableItem from './VariableItem'
import { METADATA } from '../../utilities/enum'

class Variable extends Component {
  static contextType = WorkbenchContext

  state = {
    representedVariable: undefined
  }

  componentDidMount () {
    if (this.props.match.params.id) {
      this.context.ldsService.getVariable(this.props.match.params.id).then(results => {
        this.setState({
          representedVariable: results.representedVariable,
        })
      })
    }
  }

  render () {
    let context = this.context
    const { representedVariable } = this.state
    return (
      <Segment basic>
        {representedVariable && <Segment raised>
          <Label as='a' color='blue'
                 ribbon>{context.getLocalizedGsimObjectText(representedVariable.variable.unitType.name)}</Label>
          <VariableItem representedVariable={representedVariable}/>
          <p>
            <b>{context.getLocalizedText(METADATA.CODELIST_URL)}:</b> {representedVariable.substantiveValueDomain.klassUrl}
          </p>
        </Segment>}
      </Segment>
    )
  }
}

export default Variable
