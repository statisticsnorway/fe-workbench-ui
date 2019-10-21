import React, { useContext } from "react"
import { Header, Modal } from "semantic-ui-react"
import { WorkbenchContext } from "../../context/ContextProvider"
import { UI } from "../../utilities/enum/UI"

const ProcessStepPopup = (props) => {
  const context = useContext(WorkbenchContext)
  const note = props.note
  return(
    <Modal open={props.open} closeIcon onClose={props.onClose}>
      <Header content={note.name} />
      <Modal.Content>
        <p>
          Diverse metadata
        </p>
        <a target='_blank' rel='noopener noreferrer' href={note.noteurl}>{context.getLocalizedText(UI.NOTE_OPEN)}</a>
      </Modal.Content>
    </Modal>
  )
}

export default ProcessStepPopup