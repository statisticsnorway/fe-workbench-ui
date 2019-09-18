import React, {Component} from "react"

class NoteParagraph extends Component {
  render(){
    const {title, text} = this.props
    return (
      <>
        <div>{title}</div>
        <div>{text}</div>
      </>
    )
  }
}

export default NoteParagraph