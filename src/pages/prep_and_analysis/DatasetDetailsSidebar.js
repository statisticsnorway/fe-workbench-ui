import React, { useContext, useState } from "react"
import { Header, Label, Modal } from "semantic-ui-react"
import { WorkbenchContext } from "../../context/ContextProvider"
import { Link } from "react-router-dom"
import { DATASET_PREVIEW } from "../../utilities/enum/DATASET_PREVIEW"
import DatasetStructureTable from "../dataset/DatasetStructureTable"


const NodeDetailsSidebar = (props) => {
  const { dataset } = props
  const context = useContext(WorkbenchContext)
  const [ showVariablesPopup, setShowVariablesPopup ] = useState(false)
  const [ showVariablesList, setShowVariablesList ] = useState(false)

  return (
    <div style={{ paddingLeft: '10px' }}>
      {showVariablesPopup &&
        <Modal open={showVariablesPopup} closeIcon onClose={() => setShowVariablesPopup(false)} size='large'
        >s
          <Header icon={{ name: 'table', color: 'teal' }} color='blue' content={context.getLocalizedGsimObjectText(dataset.name)} />
          <Modal.Content>
            <DatasetStructureTable showDescription={true} structure={dataset.structure.instanceVariables}/>
          </Modal.Content>
        </Modal>
      }
      {dataset &&
      <>
        <Header as='h2' icon={{ name: 'table', color: 'teal' }} floated='left'
                content={context.getLocalizedGsimObjectText(dataset.name)}
                subheader={context.getLocalizedGsimObjectText(dataset.description)}/>
        <p><Label as={Link} to={{
          'pathname': '/dataset/' + dataset.id
        }}>{context.getLocalizedText(DATASET_PREVIEW.OPEN_IN_PREVIEW)}</Label></p>
        <p><Label as='a' onClick={() => setShowVariablesPopup(true)}>Vis variabler i popup</Label></p>
        <p><Label as='a' onClick={() => setShowVariablesList(!showVariablesList)}>Vis variabler som liste</Label></p>
      </>}
      {showVariablesList && <DatasetStructureTable structure={dataset.structure.instanceVariables}/>}
    </div>
  )
}

export default NodeDetailsSidebar