import React from "react"
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
    dragView: false
  }
};

const Legend = (props) => {

  return(
    <div style={{height: '70px', width: '40%', float: 'left'}}>
      {props.legend &&
      <Graph graph={props.legend} options={options}/>
      }
    </div>
  )
}

export default Legend