import React, { useContext } from "react"
import { WorkbenchContext } from "../../context/ContextProvider"
import { UI } from "../../utilities/enum/UI"
import { Link } from "react-router-dom"
import { Label } from "semantic-ui-react"


const NodeDetailsSidebar = (props) => {
  const { node, note } = props
  const context = useContext(WorkbenchContext)

  return(
    <div style={props.style}>
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