import React, { useEffect, useState } from "react"
import Graph from "react-graph-vis"

const options = {
  autoResize: true,
  layout: {
    hierarchical: false
  },
  nodes: {
    shape: 'dot',
  },
  physics: false,
  interaction: {
    dragNodes: false,
    dragView: false,
    zoomView: false
  }
};

const Legend = (props) => {
  const [ network, setNetwork ] = useState(null)
  const [ graphContainer, setGraphContainer ] = useState(null)

  useEffect( () => {
    if (network) {
      const width = graphContainer.clientWidth
      network.moveTo({
        position: {
          x: 0,
          y: 0
        },
        offset: {
          x: -width/2,
          y: 0
        },
        animation: {
          duration: 800,
          easingFunction: 'easeInOutQuad'
        }
      })
    }
  }, [network, graphContainer])

  return(
    <div style={{height: '70px', width: '100%', float: 'left'}} ref={ (graphContainer) => setGraphContainer(graphContainer)}>
      {props.legend &&
      <Graph graph={props.legend} options={options} getNetwork={network => setNetwork(network)}/>
      }
    </div>
  )
}

export default Legend