import React, { useContext, useEffect, useState } from 'react'
import Graph from "react-graph-vis";
import { WorkbenchContext } from "../../context/ContextProvider"
import { NOTIFICATION_TYPE } from "../../utilities/enum/NOTIFICATION_TYPE"
import { get } from '../../utilities/fetch/Fetch'
import NodeDetailsSidebar from "./NodeDetailsSidebar"

const options = {
  autoResize: true,
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'LR',
      sortMethod: 'directed',
      parentCentralization: true,
      levelSeparation: 300
    }
  },
  nodes: {
    shape: 'dot',
  },
  physics: false,
  interaction: {
    dragNodes: false,
    dragView: true
  },
  edges: {
    color: "#000000"
  }
};

const fullSizeStyle = {
  height: "640px",
}

const showLeftPaneStyle = {
  height: "640px",
  float: 'left',
  width: '80%'
}

// const getNode = (nodeId) => {
//   return nodes.filter(node => node.id === nodeId)[0]
// }


const GraphViS = () => {
  const [ selectedNote/*, setSelectedNote*/ ] = useState(null)
  const [ selectedNode, setSelectedNode ] = useState(null)
  const [ showSidePane ] = useState(true) // TODO do not show initially?
  const [ network, setNetwork ] = useState(null)
  const [ graph, setGraph ] = useState(null)
  const context = useContext(WorkbenchContext)

  useEffect(() => {
    //get('http://localhost:8000/api/graph/statisticalProgram/99ce8940-400e-475f-90a2-204eca77886a').then(graph => {
    get('https://workbench.staging-bip-app.ssb.no/be/workbench-graph-service/api/graph/statisticalProgram/c2a6b58a-d6df-4539-aba9-56d3eff46ef7?lds=C').then(graph => {
      setGraph({
        edges : graph.edges,
        nodes: graph.nodes.map(n => {
        if (n.type === 'ProcessStep') n.color = '#7be041'
        if (n.type === 'StatisticalProgramCycle') {
          n.color = 'orange'
          n.shape = 'hexagon'
          n.size = 30
        }
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

  useEffect( () => {
    if (network) {
      network.fit()
    }
  }, [network])

  const events = {
    select: (event) => {
      let { nodes } = event;
      if (nodes[0]) {

        const selectedNode = getNode(nodes[0])
        setSelectedNode(selectedNode)
        switch (selectedNode.type) {
          case 'ProcessStep':
          {
            // TODO put noteID on node and fetch note details on select
            // context.notebookService.getNote(selectedNode.objectId, context.user)
            //   .then(note => {
            //     setSelectedNote(note)
            //   })
            //   .catch(error => context.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text))
            break;
          }
          case 'UnitDataset':
          {
            break;
          }
          case 'BusinessProcess':
          {
            break;
          }
          case 'CodeBlock':
          {
            break;
          }
          default:
          {
            context.setNotification(true, NOTIFICATION_TYPE.ERROR, 'Ugyldig type')
          }
        }
      }
      network.fit()
    }
  }

  return (
    <>
      <div>
        <h1>React graph vis</h1>
        <div>

          <div style={showSidePane ? showLeftPaneStyle : fullSizeStyle}>
            {graph && <Graph graph={graph} options={options} events={events} getNetwork={network => setNetwork(network)} />}
          </div>
          {showSidePane && <NodeDetailsSidebar node={selectedNode} note={selectedNote} style={{float: 'right'}}/>}
        </div>

      </div>
    </>
  )
}

export default GraphViS