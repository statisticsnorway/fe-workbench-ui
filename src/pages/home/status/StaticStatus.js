import React, { Component } from 'react'
import { Grid, Label, List } from 'semantic-ui-react'

class StaticStatus extends Component {
  createColumns = (state) =>
    Object.keys(state).reduce((all, one, i) => {
      const ch = Math.floor(i / 2)

      all[ch] = [].concat((all[ch] || []), one)

      return all
    }, [])

  selectLabelType = (data) => {
    const check = this.props[data]

    switch (typeof check) {
      case 'string':
        return <Label color='blue' content={check} horizontal />

      case 'boolean':
        return <Label color={check ? 'green' : 'red'} horizontal
                      icon={{ name: check ? 'check' : 'close', fitted: true }} />

      default:
        return <Label color='teal' content={check} horizontal />
    }
  }

  render () {
    return (
      <Grid columns='equal'>
        {this.createColumns(this.props).map((value, index) =>
          <Grid.Column key={index}>
            <List divided selection>
              {value.map(data =>
                <List.Item key={data}>
                  {`${data} `}
                  {this.selectLabelType(data)}
                </List.Item>
              )}
            </List>
          </Grid.Column>
        )}
      </Grid>
    )
  }
}

export default StaticStatus
