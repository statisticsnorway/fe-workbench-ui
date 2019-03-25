import React, { Component, Fragment } from 'react'
import PlainTable from './PlainTable'
import BarChart from './BarChart'
import { Button } from 'semantic-ui-react'

class VisualToggler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visualType : PlainTable,
      buttonText: 'Show as BarChart'
    }
  }

  toggle = (event, data) => {
    if (this.state.visualType === PlainTable) {
      this.setState({
        visualType : BarChart,
        buttonText: 'Show as Table'
      })
    }
    else if (this.state.visualType === BarChart) {
      this.setState({
        visualType : PlainTable,
        buttonText: 'Show as BarChart'
      })
    }
  }

  render () {
    const Viz = this.state.visualType
    return (
      <Fragment>
        <Viz data={this.props.data}/>
        <Button primary style={{width: '170px'}}
                onClick={this.toggle}>{this.state.buttonText}</Button>
      </Fragment>
    )
  }
}

export default VisualToggler
