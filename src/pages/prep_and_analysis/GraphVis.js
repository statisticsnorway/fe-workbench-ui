import React, { useContext, useEffect, useState } from 'react'
import Graph from "react-graph-vis";
import ProcessStepPopup from "./ProcessStepPopup"
import { WorkbenchContext } from "../../context/ContextProvider"
import { NOTIFICATION_TYPE } from "../../utilities/enum/NOTIFICATION_TYPE"
import DatasetPopup from "./DatasetPopup"
import { get } from '../../utilities/fetch/Fetch'

const options = {
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'LR',
      sortMethod: 'hubsize',
      parentCentralization: true,
      levelSeparation: 300
    }
  },
  nodes: {
    shape: 'dot',
  },
  interaction: {
    dragNodes: false,
    dragView: true
  },
  edges: {
    color: "#000000"
  }
}


const GraphViS = () => {
  // TODO use one state variable for this
  const [ selectedNote, setSelectedNote ] = useState(null)
  const [ selectedDataset, setSelectedDataset ] = useState(null)
  const [ graph, setGraph ] = useState(null)
  const context = useContext(WorkbenchContext)

  useEffect(() => {
    get('https://workbench.staging-bip-app.ssb.no/be/workbench-graph-service/api/graph/statisticalProgram/c2a6b58a-d6df-4539-aba9-56d3eff46ef7?lds=C').then(graph => {
      setGraph({
        edges : graph.edges,
        nodes: graph.nodes.map(n => {
        if (n.type === 'ProcessStep') n.color = '#7be041'
        if (n.type === 'CodeBlock') {
          n.color = '#00000'
          n.shape = 'diamond'
        }
        if (n.type === 'UnitDataset') {
          n.color = '#4881E0'
          n.shape = 'square'
        }
        return n
      })
    })
  })

  }, [])

  const getNode = (nodeId) => {
    return graph.nodes.filter(node => node.id === nodeId)[0]
  }

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

        {graph && <Graph graph={graph} options={options} events={events} style={{ height: "840px", width: "100%" }} />}
      </div>
    </>
  )
}

export default GraphViS