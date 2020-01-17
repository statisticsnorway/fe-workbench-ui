import React from 'react'
import PropTypes from 'prop-types'
import { Header, Icon, Pagination, Placeholder, Segment, Table } from 'semantic-ui-react'

// Sortable header cell
const DataTableHeaderCell = (name, style, icon, props) => (
  <Table.HeaderCell key={name} style={style} sorted={props.sort === name ? props.sortOrder : null}
                    onClick={() => props.onSortChange(name)}>
    <Icon disabled name={icon}/>{name}
  </Table.HeaderCell>
)

// Maps identifiers, measures and attributes to header columns
const DataTableHeader = (props) => (
  <Table.Header>
    <Table.Row>
      {props.columns.map(variable =>
        DataTableHeaderCell(variable.name, { color: '#0063ad' }, 'tag', props))}
      {/*{props.columns.identifiers.map(structure =>*/}
      {/*  DataTableHeaderCell(structure.name, { color: '#0063ad' }, 'tag', props))}*/}
      {/*{props.columns.measures.map(structure =>*/}
      {/*  DataTableHeaderCell(structure.name, { color: '#ff5b36' }, 'area graph', props))}*/}
      {/*{props.columns.attributes.map(structure =>*/}
      {/*  DataTableHeaderCell(structure.name, { color: '#00ad11' }, 'sticky note outline', props))}*/}
    </Table.Row>
  </Table.Header>
)

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

/**
 * A numRows by numColumns loading table.
 */
const DataTableRowsLoading = ({ numColumns = 3, numRows = 3 }) => (
  <>
    {[...Array(numRows).keys()].map(rowIdx => (
      <Table.Row key={rowIdx}>
        {[...Array(numColumns).keys()].map(colIdx => (
          <Table.Cell key={colIdx}>
            <Placeholder>
              <Placeholder.Line/>
            </Placeholder>
          </Table.Cell>
        ))}
      </Table.Row>
    ))}
  </>
)

const DataTableRows = ({ columns, data }) => {
  console.log(columns, 'columns')
  console.log(data, 'data')
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

const DataTable = (props) => {

  if (!props.columns || !props.data) {
    return (
      <React.Fragment/>
    )
  }
  if (!props.data && !props.loading) {
    return <DataTableRowsEmpty/>
  }
  console.log(props.columns, 'columns i DataTable')
  // Normalize columns.
  // const columnOrder = [props.columns.identifiers, props.columns.measures, props.columns.attributes].flat()
  const columnOrder = props.columns.structure.instanceVariables
  console.log(props.columns.structure.instanceVariables, 'props to DataTableHeader')
  return (
    <Table data-testid='dataset-table' sortable celled selectable fixed>
      <DataTableHeader columns={props.columns.structure.instanceVariables} sort={props.sort} sortOrder={props.sortOrder}
                       onSortChange={props.onSortChange}/>
      <Table.Body>
        {props.loading
          ? <DataTableRowsLoading numColumns={columnOrder.length} numRows={props.limit || 10}/>
          : <DataTableRows columns={columnOrder} data={props.data}/>
        }
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={columnOrder.length}>
            <Pagination
              totalPages={props.totalPages}
              activePage={props.currentPage}
              onPageChange={props.onPageChange}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default DataTable

DataTable.propTypes = {
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  sort: PropTypes.string,
  sortOrder: PropTypes.string,
}
