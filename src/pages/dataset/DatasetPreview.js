import React, { Component } from 'react'
import { WorkbenchContext } from '../../context/ContextProvider'
import { Header, Icon, Segment, Table } from 'semantic-ui-react'

class DatasetPreview extends Component {
  static contextType = WorkbenchContext

  componentDidMount () {
    if (this.props.match.params.id) {
      console.log("Loading structure for", this.props.match.params.id)
      this.context.ldsService.getDatasetStructure(this.props.match.params.id).then(results => {
        console.log(results)
        this.setState({
          structure: results,
        })
      })
    }
  }

  render () {
    // Sortable header cell
    const DataTableHeaderCell = (name, style, props) => (
      <Table.Row key={name} style={style}>
        <Table.HeaderCell key={name} style={style} sorted={props.sort === name ? props.sortOrder : null}
                          onClick={() => props.onSortChange(name)}/>
      </Table.Row>
    )

    const DataTableCell = (name, style, icon) => (
      <Table.Row key={name} style={style}>
        <Icon disabled name={icon}/>{name}
      </Table.Row>
    )
    const DataTableRows = ({ columns, data }) => {
      if (!data) return <DataTableRowsEmpty/>
      return data.map((datum, idx) => (
        <Table.Row key={idx}>
          {columns.map(({ name }) => (
            <Table.Cell key={name + idx}>
              {datum[name]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))
    }
    const DataTableRowsEmpty = () => (
      <Table.Row>
        <Segment placeholder>
          <Header icon>
            <Icon name='table'/>
            This dataset is empty.
          </Header>
        </Segment>
      </Table.Row>
    )

    //if (this.props.match.params.id !== undefined) {
    if (false) {
      let structure = this.state ? this.state.structure : null
      return (
        <Table data-testid='dataset-table' sortable celled selectable fixed>
          <Table.Header>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {structure.columns.identifiers.map(structure =>
                DataTableCell(structure.name, { color: '#0063ad' }, 'tag'))}
              {structure.columns.measures.map(structure =>
                DataTableCell(structure.name, { color: '#ff5b36' }, 'area graph'))}
              {structure.columns.attributes.map(structure =>
                DataTableCell(structure.name, { color: '#00ad11' }, 'sticky note outline'))}
            </Table.Row>
          </Table.Body>
        </Table>
          )
    } else {
      return (
        <div><Header> No dataset found </Header></div>
      )
    }
  }
}

export default DatasetPreview
