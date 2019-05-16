import gql from 'graphql-tag'

export const DATASET_WITH_STRUCTURE = gql`
  query getDatasetWithStructure($id: String!) {
    UnitDataSetById(id: $id) {
      description {
        languageCode
        languageText
      }
      unitDataStructure {
        logicalRecords {
          edges {
            node {
              id
              identifierComponents {
                edges {
                  node {
                    isUnique
                    isComposite
                    shortName
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
              measureComponents {
                edges {
                  node {
                    shortName
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
              attributeComponents {
                edges {
                  node {
                    shortName
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
export function mapResult(results) {
  return results.data.UnitDataSetById.unitDataStructure.logicalRecords.edges.map(mapEdge)[0]
}

function mapEdge(edge) {
  return {
    id: edge.node.id,
    attributes: edge.node.attributeComponents.edges.map(mapComponent),
    identifiers: edge.node.identifierComponents.edges.map(mapComponent),
    measures: edge.node.measureComponents.edges.map(mapComponent),
  }
}

function mapComponent(edge) {
  return {
    name: edge.node.shortName,
    dataType: edge.node.representedVariable.substantiveValueDomain.dataType
  }
}

