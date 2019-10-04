import React, { useEffect, useState } from 'react'
import { Transition } from 'semantic-ui-react'

const FlipTransition = ({children, animation, duration}) => {
  const [renderdChild, setChild] = useState(children)
  const [visible, setVisibility] = useState(true)

  useEffect(() => {
    setVisibility(false)
  }, [children.key])
  const onHide = () => {
    setChild(children)
    setVisibility(true)
  }

  return (
    <Transition
      animation={animation}
      duration={duration}
      onHide={onHide}
      visible={visible}
    >
      {renderdChild}
    </Transition>
  )
}

export default FlipTransition