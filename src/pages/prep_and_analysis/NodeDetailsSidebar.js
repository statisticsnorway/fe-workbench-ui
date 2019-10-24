import React from "react"


const NodeDetailsSidebar = (props) => {
  const { node } = props

  return(
    <div style={{paddingLeft: '10px'}}>
      {node && <>
          <p>
            <b>{node.label}</b>
          </p>
          <p>
            <i>{node.id}</i>
          </p>
          <p>
            Type: {node.type}
          </p>
        </>}
    </div>
  )
}

export default NodeDetailsSidebar