import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { WorkbenchContext } from '../../context/ContextProvider'
import { Header, Icon, Segment, Table } from 'semantic-ui-react'
import { DATASET_PREVIEW } from '../../utilities/enum/DATASET_PREVIEW'
import NotebookToolbar from './../notebook/NotebookToolbar'

const STYLES = {
  IDENTIFIER: {
    icon: 'tag',
    style: { color: '#0063ad' },
  },
  MEASURE: {
    icon: 'area graph',
    style: { color: '#ff5b36' },
  },
  ATTRIBUTE: {
    icon: 'sticky note outline',
    style: { color: '#00ad11' },
  }
}

const DatasetPreview = (props) => {
  const context = useContext(WorkbenchContext)
  const [name, setName] = useState(false)
  const [description, setDescription] = useState(false)
  const [structure, setStructure] = useState(false)
  const { match, user } = props

  useEffect(() => {
    if (match.params.id) {
      context.ldsService.getDatasetStructure(match.params.id).then(results => {
        setName(results.name)
        setDescription(results.description)
        setStructure(results.structure)
      })
    }
  }, [context.ldsService, match.params.id])

  const DataTableRows = ({ columns }) => {
    if (!columns) return <DataTableRowsEmpty/>
    return columns.map((variable, idx) => (
      <Table.Row key={idx}>
        <Table.Cell key={'componentType' + idx} style={STYLES[variable.componentType].style}>
          <Icon disabled name={STYLES[variable.componentType].icon}/>{variable.componentType}
        </Table.Cell>
        <Table.Cell key={'name' + idx}>
          {variable.name}
        </Table.Cell>
        <Table.Cell key={'description' + idx}>
          {context.getLocalizedGsimObjectText(variable.description)}
        </Table.Cell>
        <Table.Cell key={'datatype' + idx}>
          {variable.dataType}
        </Table.Cell>
      </Table.Row>
    ))
  }

  const DataTableRowsEmpty = ({ text }) => (
    <Segment placeholder>
      <Header icon>
        <Icon name='table'/>
        {text}
      </Header>
    </Segment>
  )

  const dataset = {
    'id': match.params.id,
    'name': name
  }

  if (!structure) {
    return (
      <DataTableRowsEmpty text={context.getLocalizedText(DATASET_PREVIEW.DATASET_NOT_FOUND)}/>
    )
  } else if (!structure.instanceVariables) {
    return (
      <DataTableRowsEmpty text={context.getLocalizedText(DATASET_PREVIEW.DATASET_EMPTY)}/>
    )
  } else {
    return (
      <>
        <Header as='h1' dividing icon={{ name: 'table', color: 'teal' }}
                content={context.getLocalizedGsimObjectText(name)}
                subheader={context.getLocalizedGsimObjectText(description)}/>

        <NotebookToolbar user={user} dataset={dataset}/>

        <Table data-testid='dataset-table' sortable celled selectable fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{context.getLocalizedText(DATASET_PREVIEW.VARIABLE_TYPE)}</Table.HeaderCell>
              <Table.HeaderCell>{context.getLocalizedText(DATASET_PREVIEW.VARIABLE_NAME)}</Table.HeaderCell>
              <Table.HeaderCell>{context.getLocalizedText(DATASET_PREVIEW.VARIABLE_DESCRIPTION)}</Table.HeaderCell>
              <Table.HeaderCell>{context.getLocalizedText(DATASET_PREVIEW.VARIABLE_DATATYPE)}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <DataTableRows columns={structure.instanceVariables}/>
          </Table.Body>
        </Table>
      </>
    )
  }
}

export default withRouter(DatasetPreview)
