import React, { Component } from 'react'
import { Divider, Grid, Icon, Label, Popup, Segment } from 'semantic-ui-react'

import { METADATA } from '../../utilities/enum'
import { WorkbenchContext } from '../../context/ContextProvider'
import SearchResultDataset from './SearchResultDataset'
import VariableItem from '../variable/VariableItem'

class SearchResultVariable extends Component {
  static contextType = WorkbenchContext

  state = {
    datasetResults: undefined
  }

  loadDatasets = () => {
    const { result } = this.props
    this.context.ldsService.getDatasetsFromVariable(result.id).then(results => {
      this.setState({
        datasetResults: results,
      })
    })
  }

  hideResults = () => {
    this.setState({
      datasetResults: undefined,
    })
  }

  render () {
    const { result } = this.props
    const { datasetResults } = this.state
    let context = this.context

    const DatasetLoader = () => {
      if (datasetResults) {
        return <Popup flowing hoverable position='top left'
                      content={context.getLocalizedText(METADATA.VARIABLE_DATASETS_HIDE)} trigger={
          <Label floating onClick={this.hideResults}>
            <Icon name='minus circle'/>
          </Label>
        }/>
      } else {
        return <Popup flowing hoverable position='top left'
                      content={context.getLocalizedText(METADATA.VARIABLE_DATASETS_SHOW)} trigger={
          <Label floating onClick={this.loadDatasets}>
            <Icon name='plus circle'/>
          </Label>
        }/>
      }
    }

    const Datasets = () => {
      if (!datasetResults) return <></>
      else if (datasetResults.length === 0)
        return context.getLocalizedText(METADATA.VARIABLE_DATASETS_EMPTY)
      return datasetResults.map(value =>
        <SearchResultDataset key={value.id} result={value}/>
      )
    }

    const Separator = () => {
      if (!datasetResults) return <></>
      return (
        <Divider vertical>
          <Icon name='arrow circle right'/>
        </Divider>
      )
    }

    const UnitTypeRibbon = () => {
      if (!result.variable.unitType) return <></>
        return <Label as='a' color='blue' ribbon>{context.getLocalizedGsimObjectText(result.variable.unitType.name)}</Label>
    }

    return (
      <Segment>
        <UnitTypeRibbon/>
        <Grid columns={2}>
          <Grid.Column>
            <VariableItem representedVariable={result}/>
          </Grid.Column>
          <Grid.Column>
            <DatasetLoader/>
            <Datasets/>
          </Grid.Column>
        </Grid>
        <Separator/>
      </Segment>
    )
  }
}

export default SearchResultVariable
