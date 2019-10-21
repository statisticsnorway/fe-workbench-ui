import React from "react"
import { Header, Modal } from "semantic-ui-react"

const DatasetPopup = (props) => {
  const {dataset} = props
  return(
    <Modal open={props.open} closeIcon onClose={props.onClose}>
      <Header content={dataset.objectId} />
      <Modal.Content>
        <p>
          Diverse metadata
        </p>
        <p>
          Link to dataset
        </p>
      </Modal.Content>
    </Modal>
  )
}

export default DatasetPopup