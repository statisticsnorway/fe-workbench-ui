import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { WorkbenchContext } from '../../context/ContextProvider'
import { Header, Icon, Label, Popup, Segment } from 'semantic-ui-react'
import { DATASET_PREVIEW } from '../../utilities/enum/DATASET_PREVIEW'
import NotebookToolbar from './../notebook/NotebookToolbar'
import DatasetStructureTable, { DataTableRowsEmpty } from "./DatasetStructureTable"

const DatasetPreview = (props) => {
  const context = useContext(WorkbenchContext)
  const [id, setId] = useState(null)
  const [copySuccess, setCopySuccess] = useState(null)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [structure, setStructure] = useState(null)
  const { match } = props

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

  const dataset = {
    'id': match.params.id,
    'name': name
  }

  const copyToClipboard = () => {
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
        <NotebookToolbar dataset={dataset}/>
        <DatasetStructureTable structure={structure.instanceVariables} showDescription={true}/>
      </>
    )
  }
}

export default withRouter(DatasetPreview)
