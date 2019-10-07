import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { WorkbenchContext } from '../../context/ContextProvider'
import { Header, Icon, Segment, Table, Label, Popup } from 'semantic-ui-react'
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
  const [id, setId] = useState(null)
  const [copySuccess, setCopySuccess] = useState(null)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [structure, setStructure] = useState(null)
  const { match, user } = props

  useEffect(() => {
    if (match.params.id) {
      context.ldsService.getDatasetStructure(match.params.id).then(results => {
        setId(match.params.id)
        setName(results.name)
        setDescription(results.description)
        setStructure(results.structure)
      })
    }
  }, [context.ldsService, match.params.id])

  useEffect(() => {
    // Remove the 'copy' cursor style 2 secs after user has triggered the 'copyToClipboard' function
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

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

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(id).then(() => setCopySuccess(true))
  };

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
        <Segment clearing>
        <Header as='h1' icon={{ name: 'table', color: 'teal' }} floated='left'
                content={context.getLocalizedGsimObjectText(name)}
                subheader={context.getLocalizedGsimObjectText(description)}/>
        <Header as='h4' floated='right'>
          <Popup flowing hoverable position='top left'
                 content={context.getLocalizedText(DATASET_PREVIEW.COPY_ID_TOOLTIP)} trigger={
            <Label data-testid='id-label' onClick={copyToClipboard}
                   style={copySuccess ? {cursor: 'copy'} : {cursor: 'pointer'}}><Icon name='copy'/>{id}</Label>
          }/>
        </Header>
        </Segment>
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
