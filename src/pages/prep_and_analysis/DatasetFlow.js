import React, { useContext, useEffect, useState } from 'react'
import Graph from "react-graph-vis";
import { WorkbenchContext } from "../../context/ContextProvider"
import { NOTIFICATION_TYPE } from "../../utilities/enum/NOTIFICATION_TYPE"
import { MENU } from "../../utilities/enum/MENU"
import { edges, nodes } from "../../mocks/DatasetGraphMockData"
import DatasetDetailsSidebar from "./DatasetDetailsSidebar"
import { Grid } from "semantic-ui-react"

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

const DatasetFlow = () => {
  const [ selectedDataset, setSelectedDataset ] = useState(null)
  const [ showSidePane ] = useState(true) // TODO do not show initially?
  const [ network, setNetwork ] = useState(null)
  const [ graph, setGraph ] = useState(null)
  const context = useContext(WorkbenchContext)

  useEffect(() => {
    const graph = {nodes, edges}
    setGraph({
      edges : graph.edges,
      nodes: graph.nodes.map(n => {
        if (n.type === 'UnitDataset') {
          n.color = '#4881E0'
          n.shape = 'dot'
        }
        return n
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
        context.ldsService.getDatasetStructure(selectedNode.id).then(result => {
          const dataset = {
            id: selectedNode.id,
            ...result
          }
          setSelectedDataset(dataset)
        })
          .catch(error => context.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text))
      }
      network.fit()
    }
  }

  return (
    <>
      <div>
        <h1>{MENU.DATASET_FLOW[context.languageCode]}</h1>
        <Grid columns="equal">
          <Grid.Column width={12}>
            {graph && <Graph graph={graph} options={options} events={events} getNetwork={network => setNetwork(network)} />}
          </Grid.Column>
          <Grid.Column>
            {showSidePane && <DatasetDetailsSidebar dataset={selectedDataset} />}
          </Grid.Column>
        </Grid>
      </div>
    </>
  )
}

export default DatasetFlow