import { Header, Modal } from "semantic-ui-react"
import React, { useContext } from "react"
import { WorkbenchContext } from "../context/ContextProvider"

const NotificationPopup = (props) => {
  const context = useContext(WorkbenchContext)

  const type = props.type

  return(
    <Modal open={props.open} closeIcon onClose={() => context.setNotification(false, null, null)}>
      <Header icon={type.icon} color={type.color} content={context.getLocalizedText(type.header)} />
      <Modal.Content>
        <p>
          {props.text}
        </p>
      </Modal.Content>
    </Modal>
  )

}


export default NotificationPopup