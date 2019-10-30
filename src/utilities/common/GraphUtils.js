import { GRAPH_NODES } from "../enum/GRAPH_NODES"

// TODO add tests

export const getGraphNode = (type, legend, languageCode, originalNode) => {
  let node = GRAPH_NODES[type]
  if (!node) {
    node = GRAPH_NODES.UNKNOWN
  }
  node.size = legend ? 10 : 20
  node.label = node[languageCode] // TODO get label from GSIM object
  return {
    ...node,
    ...originalNode
  }
}

export const getLegendNodes = (nodes, languageCode) => {
  const distinctObjectTypes = [...new Set(nodes.map(node => node.type))]
  const legends = distinctObjectTypes.map(legend => {
    return getGraphNode(legend, true, languageCode)
  })
  let step = 150
  let x = 0
  legends.map(legend => {
    legend.y = 0
    legend.x = x + step
    x = legend.x
    return legend
  })
  return { nodes: legends, edges: {} }
}