import gql from 'graphql-tag'

export const DATASET_WITH_STRUCTURE = gql`
    query getDatasetWithStructure($id: ID!) {
        UnitDataSetById(id: $id) {
            name {
                languageCode
                languageText
            }
            description {
                languageCode
                languageText
            }
            unitDataStructure {
                logicalRecords {
                    edges {
                        node {
                            id
                            instanceVariables {
                                edges {
                                    node {
                                        dataStructureComponentType
                                        shortName
                                        description {
                                            languageCode
                                            languageText
                                        }
                                        representedVariable {
                                            substantiveValueDomain {
                                                ... on DescribedValueDomain {
                                                    dataType
                                                }
                                                ... on EnumeratedValueDomain {
                                                    dataType
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

`

export function mapResult (results) {
  return {
    name: results.data.UnitDataSetById.name,
    description: results.data.UnitDataSetById.description,
    structure: results.data.UnitDataSetById.unitDataStructure.logicalRecords.edges.map(mapEdge)[0]
  }
}

function mapEdge (edge) {
  return {
    id: edge.node.id,
    instanceVariables: edge.node.instanceVariables.edges.map(mapComponent).sort(componentTypeSort)
  }
}

function mapComponent (edge) {
  return {
    name: edge.node.shortName,
    componentType: edge.node.dataStructureComponentType,
    description: edge.node.description,
    dataType: edge.node.representedVariable.substantiveValueDomain.dataType
  }
}

const componentTypeOrdering = ['IDENTIFIER', 'MEASURE', 'ATTRIBUTE']

function componentTypeSort (a, b) {
  return componentTypeOrdering.indexOf(a.componentType) > componentTypeOrdering.indexOf(b.componentType) ? 1 : -1
}

