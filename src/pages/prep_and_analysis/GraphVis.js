import React, { useContext, useState } from 'react'
import Graph from "react-graph-vis";
import ProcessStepPopup from "./ProcessStepPopup"
import { WorkbenchContext } from "../../context/ContextProvider"
import { NOTIFICATION_TYPE } from "../../utilities/enum/NOTIFICATION_TYPE"
import DatasetPopup from "./DatasetPopup"

const nodes = [
    { id: 1, label: 'Skatt', color: '#4881E0', type: 'UnitDataset', objectId: 'someUUID' },
    { id: 2, label: 'Freg', color: '#4881E0', type: 'UnitDataset', objectId: 'someUUID' },
    { id: 3, label: 'Prosessteg_1', color: '#7be041', type: 'ProcessStep', objectId: '2ERCTPFF5' },
    { id: 4, label: 'Aggregert_1', color: '#4881E0', type: 'UnitDataset', objectId: 'someUUID' },
    { id: 5, label: 'Aggregert_2', color: '#4881E0', type: 'UnitDataset', objectId: 'someUUID' },
    { id: 6, label: 'Prosessteg_2', color: '#7be041', type: 'ProcessStep', objectId: '2ET8ANFY3' },
    { id: 7, label: 'Aggregert_3', color: '#4881E0', type: 'UnitDataset', objectId: 'someUUID' },
]

const edges = [
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 5, to: 6 },
    { from: 6, to: 7 },
]

const graph = {
  nodes,edges
};

const options = {
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'LR',
      sortMethod: 'directed',
      parentCentralization: true
    }
  },
  interaction: {
    dragNodes: false,
    dragView: false
  },
  edges: {
    color: "#000000"
  }
};



const getNode = (nodeId) => {
  return nodes.filter(node => node.id === nodeId)[0]
}

const GraphViS = () => {
  // TODO use one state variable for this
  const [ selectedNote, setSelectedNote ] = useState(null)
  const [ selectedDataset, setSelectedDataset ] = useState(null)
  const context = useContext(WorkbenchContext)

  const events = {
    select: (event) => {
      let { nodes, edges } = event;
      let selectedNode = getNode(nodes[0])
      switch (selectedNode.type) {
        case 'ProcessStep':
        {
          context.notebookService.getNote(selectedNode.objectId, context.user) // TODO why does this return all notes?
            .then(note => {
              setSelectedNote(note)
            })
            .catch(error => context.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text))
          break;
        }
        case 'UnitDataset':
        {
          setSelectedDataset(selectedNode)
          break;
        }
        default:
        {
          context.setNotification(true, NOTIFICATION_TYPE.ERROR, 'Ugyldig type')
        }
      }

      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
    }
  }

  return (
    <>
      {/*TODO consider use same check and component for popups*/}
      {selectedNote !== null && <ProcessStepPopup open={true} note={selectedNote}
                                         onClose={ () => setSelectedNote(null)}/>}
      {selectedDataset !== null && <DatasetPopup open={true} dataset={selectedDataset}
                                                  onClose={ () => setSelectedDataset(null)}/>}
      <div>
        <h1>React graph vis</h1>

        <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
      </div>
    </>
  )
}

export default GraphViS