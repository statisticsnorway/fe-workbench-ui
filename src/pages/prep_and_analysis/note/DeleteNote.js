import React, { useContext, useState } from 'react'
import { Icon, Popup } from 'semantic-ui-react'

import { WorkbenchContext } from '../../../context/ContextProvider'
import { UI } from "../../../utilities/enum"

const DeleteNote = (props) => {
  const context = useContext(WorkbenchContext)

  const [ isDeleted ] = useState(false)

  return (
    <Popup basic flowing
           trigger={
             <span> {/*Popup does not work on <>*/}
               <Icon data-testid='deleteNote' link name='trash alternate outline' color='red' size='large'
                     disabled={isDeleted}
                     onClick={() => props.deleteCallback({id: props.id, name: props.name})}/>
             </span>
           }>
      <>
        <Icon color='red' name='info circle'/>
        {context.getLocalizedText(UI.NOTE_DELETE)}
      </>
    </Popup>
  )
}

export default DeleteNote
