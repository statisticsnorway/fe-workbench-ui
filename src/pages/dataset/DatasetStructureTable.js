import React, { useContext } from "react"
import { Header, Icon, Segment, Table } from "semantic-ui-react"
import { DATASET_PREVIEW } from "../../utilities/enum/DATASET_PREVIEW"
import { WorkbenchContext } from "../../context/ContextProvider"

const STYLES = {
  IDENTIFIER: {
    icon: 'tag',
    style: { color: '#0063ad' },
  },
  MEASURE: {
    icon: 'area graph',
    style: { color: '#ff5b36' },
  },
  ATTRIBUTE: {
    icon: 'sticky note outline',
    style: { color: '#00ad11' },
  }
}

export const DataTableRowsEmpty = ({ text }) => (
  <Segment placeholder>
    <Header icon>
      <Icon name='table'/>
      {text}
    </Header>
  </Segment>
)

const DatasetStructureTable = (props) => {
  const context = useContext(WorkbenchContext)

  const DataTableRows = ({ columns }) => {
    return columns.map((variable, idx) => (
      <Table.Row key={idx}>
        <Table.Cell key={'componentType' + idx} style={STYLES[variable.componentType].style}>
          <Icon disabled name={STYLES[variable.componentType].icon}/>{variable.componentType}
        </Table.Cell>
        <Table.Cell key={'name' + idx}>
          {variable.name}
        </Table.Cell>
        {props.showDescription &&
        <Table.Cell key={'description' + idx}>
          {context.getLocalizedGsimObjectText(variable.description)}
        </Table.Cell>}
        <Table.Cell key={'datatype' + idx}>
          {variable.dataType}
        </Table.Cell>
      </Table.Row>
    ))
  }

  if (props.structure) {
    return (
      <Table data-testid='dataset-table' sortable celled selectable fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{context.getLocalizedText(DATASET_PREVIEW.VARIABLE_TYPE)}</Table.HeaderCell>
            <Table.HeaderCell>{context.getLocalizedText(DATASET_PREVIEW.VARIABLE_NAME)}</Table.HeaderCell>
            {props.showDescription &&
            <Table.HeaderCell>{context.getLocalizedText(DATASET_PREVIEW.VARIABLE_DESCRIPTION)}</Table.HeaderCell>}
            <Table.HeaderCell>{context.getLocalizedText(DATASET_PREVIEW.VARIABLE_DATATYPE)}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DataTableRows columns={props.structure}/>
        </Table.Body>
      </Table>
    )
  } else {
    return <DataTableRowsEmpty/>
  }
}

export default DatasetStructureTable