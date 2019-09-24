import React, { useContext, useState } from "react";
import { Icon, Popup } from "semantic-ui-react"
import DeleteNote from "./DeleteNote"
import { UI } from "../../../utilities/enum"
import { WorkbenchContext } from "../../../context/ContextProvider"

const Header = ({ node, style }) => {

  const context = useContext(WorkbenchContext)
  const [nodeStyle, setNodeStyle] = useState({ base: style.base });
  const [isHovering, setHovering] = useState(false)

  const onMouseOver = node => {
    setHovering(true)
    if (node.name !== '~Trash' && node.children === undefined) {
      setNodeStyle(() => ({
        base: { ...style.base, ...{ fontWeight: "bold" } }
      }));
    }
  };

  const onMouseLeave = node => {
    setHovering(false)
      if (node.hover) {
      setNodeStyle(() => ({ base: style.base }));
    }
  };

  return (
    <div
      style={nodeStyle.base}
      onMouseOver={() => onMouseOver(node)}
      onMouseLeave={() => onMouseLeave(node)}
    >
      {node.name === '~Trash' ?
      <><Icon name='trash alternate' />Trash</> :
      node.children !== undefined ? <><Icon name='folder' />{node.name}</> :
        <div>
          <Icon name='file alternate'/>{node.name}
          {isHovering && <>
            <DeleteNote id={node.id} name={node.name} deleteCallback={node.deleteCallback} user={node.user}/>
            <Popup basic flowing trigger={
              <a data-testid='openNote' href={node.noteurl}
                 target='_blank' rel='noopener noreferrer'>
                <Icon name='share' color='blue'/>
              </a>
            }>
              <Icon color='blue' name='info circle'/>
              {UI.NOTE_OPEN[context.languageCode]}
            </Popup>
          </>}
        </div>}
    </div>
  );
};

export default Header