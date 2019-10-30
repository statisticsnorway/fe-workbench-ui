import React, { useContext } from "react"
import { WorkbenchContext } from "../../context/ContextProvider"
import { UI } from "../../utilities/enum/UI"
import { Link } from "react-router-dom"
import { Label } from "semantic-ui-react"
import { GRAPH_NODES } from "../../utilities/enum/GRAPH_NODES"

const NodeDetailsSidebar = (props) => {
  const { node, note } = props
  const context = useContext(WorkbenchContext)
  const getLocalizedTypeName = (type) => {
    const node = GRAPH_NODES[type]
    if (node) {
      return node[context.languageCode] || type
    }
    return type
  }

  return(
    <div style={props.style}>
      {node && <>
          <p>
            <b>{node.label}</b>
          </p>
          <p>
            <b>ID:</b> <i>{node.id}</i>
          </p>
          <p>
            <b>Type:</b> {getLocalizedTypeName(node.type)}
          </p>
        </>}
      {note && <>
        <p><Label as={Link} to={{pathname: '/prep/notebooks', state: {noteID: note.body.id}}} >
          {context.getLocalizedText(UI.NOTE_OPEN)}
        </Label></p>
        <p><Label as='a' target='_blank' rel='noopener noreferrer' href={note.noteurl}>
          {context.getLocalizedText(UI.NOTE_OPEN_EXTERNAL)}</Label></p>
        </>}
    </div>
  )
}

export default NodeDetailsSidebar