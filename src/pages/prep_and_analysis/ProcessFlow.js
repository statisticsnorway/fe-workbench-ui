import React, { useContext, useEffect, useRef, useState } from 'react'
import Graph from "react-graph-vis";
import { WorkbenchContext } from "../../context/ContextProvider"
import { NOTIFICATION_TYPE } from "../../utilities/enum/NOTIFICATION_TYPE"
import { get } from '../../utilities/fetch/Fetch'
import NodeDetailsSidebar from "./NodeDetailsSidebar"
import Legend from "./Legend"
import { getGraphNode, getLegendNodes } from "../../utilities/common/GraphUtils"

const canvasHeight = '640px'

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
  height: canvasHeight,
}

const showLeftPaneStyle = {
  height: canvasHeight,
  float: 'left',
  width: '80%'
}

const ProcessFlow = () => {
  const [ selectedNote, setSelectedNote ] = useState(null)
  const [ selectedNode, setSelectedNode ] = useState(null)
  const [ showSidePane ] = useState(true) // TODO do not show initially?
  const [ network, setNetwork ] = useState(null)
  const [ graph, setGraph ] = useState(null)
  const [ legend, setLegend ] = useState(null)
  const context = useContext(WorkbenchContext)
  const mutableContext = useRef(context).current

  useEffect(() => {
    //get('http://localhost:8000/api/graph/statisticalProgram/99ce8940-400e-475f-90a2-204eca77886a').then(graph => {
    get('https://workbench.staging-bip-app.ssb.no/be/workbench-graph-service/api/graph/statisticalProgram/c2a6b58a-d6df-4539-aba9-56d3eff46ef7?lds=C').then(graph => {
      const nodes = graph.nodes.map(n => {
        return getGraphNode(n.type, false, mutableContext.languageCode, n)
      })
      setGraph({
        edges: graph.edges,
        nodes: nodes
      })
      const legendGraph = getLegendNodes(nodes, mutableContext.languageCode)
      setLegend(legendGraph)
    })
  }, [mutableContext])

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
      setSelectedNote(null)
      if (nodes[0]) {

        const selectedNode = getNode(nodes[0])
        setSelectedNode(selectedNode)
        switch (selectedNode.type) {
          case 'ProcessStep':
          {
            if (selectedNode.technicalID) {
              context.notebookService.getNote(selectedNode.technicalID, context.user)
                .then(note => {
                  if (note && note.body) {
                    setSelectedNote(note)
                  }
                })
                .catch(error => context.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text))
            }
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
          case 'StatisticalProgramCycle':
          {
            break;
          }
          default:
          {
            context.setNotification(true, NOTIFICATION_TYPE.ERROR, 'Ugyldig type')
          }
        }
      }
    }
  }

  return (
    <>
      <style>{`.vis-network {outline-color: white}`}</style>
      <div>
        <h1>Visualisering av statistikkproduksjon</h1>
        <div>

          <div style={showSidePane ? showLeftPaneStyle : fullSizeStyle}>
            {graph && <>
                <Legend legend={legend}/>
                <Graph graph={graph} options={options} events={events} getNetwork={network => setNetwork(network)} />
              </>}
          </div>
          {showSidePane && <NodeDetailsSidebar node={selectedNode} note={selectedNote}
                                               style={{float: 'right', width: '20%', paddingLeft: '2px', maxHeight: canvasHeight, overflow: 'auto'}}/>}
        </div>

      </div>
    </>
  )
}

export default ProcessFlow