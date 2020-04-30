import gql from 'graphql-tag';

// This should be cached, and maybe filtered by statisticalProgram
export const ALL_DATASETS_AND_VARIABLES = gql`
    query allDatasetsAndVariables {
        UnitDataSet {
            edges {
                node {
                    id
                    name {
                        languageCode
                        languageText
                    }
                    description {
                        languageCode
                        languageText
                    }
                    __typename
                }
            }
        }
        DimensionalDataSet {
            edges {
                node {
                    id
                    name {
                        languageCode
                        languageText
                    }
                    description {
                        languageCode
                        languageText
                    }
                    __typename
                }
            }
        }
        RepresentedVariable {
            edges {
                node {
                    id
                    variable {
                        id
                        name {
                            languageCode
                            languageText
                        }
                        description {
                            languageCode
                            languageText
                        }
                        validFrom
                        validUntil
                        subjectFields {
                            edges {
                                node {
                                    name {
                                        languageCode
                                        languageText
                                    }
                                }
                            }
                        }
                        unitType {
                            name {
                                languageCode
                                languageText
                            }
                            description {
                                languageCode
                                languageText
                            }
                            typeOfStatisticalUnit
                        }
                    }
                    name {
                        languageCode
                        languageText
                    }
                    description {
                        languageCode
                        languageText
                    }
                    __typename
                }
            }
        }
    }
`
export const GET_DATASETS_FROM_VARIABLE = gql`
    query getDatasetsByVariable($id: ID!) {
        RepresentedVariableById(id: $id) {
            name {
                languageText
            }
            reverseInstanceVariableRepresentedVariable {
                edges {
                    node {
                        reverseLogicalRecordInstanceVariables {
                            edges {
                                node {
                                    reverseUnitDataStructureLogicalRecords {
                                        edges {
                                            node {
                                                reverseUnitDataSetUnitDataStructure {
                                                    edges {
                                                        node {
                                                            __typename
                                                            id
                                                            name {
                                                                languageCode
                                                                languageText
                                                            }
                                                            description {
                                                                languageCode
                                                                languageText
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
            }
        }
    }
`

export const GET_VARIABLE = gql`
    query getVariable($id: ID!) {
        RepresentedVariableById(id: $id) {
            name {
                languageCode
                languageText
            }
            description {
                languageCode
                languageText
            }
            variable {
                id
                name {
                    languageCode
                    languageText
                }
                description {
                    languageCode
                    languageText
                }
                validFrom
                validUntil
                subjectFields {
                    edges {
                        node {
                            name {
                                languageCode
                                languageText
                            }
                        }
                    }
                }
                unitType {
                    name {
                        languageCode
                        languageText
                    }
                    description {
                        languageCode
                        languageText
                    }
                    typeOfStatisticalUnit
                }
            }
            substantiveValueDomain {
                ... on DescribedValueDomain {
                    name {
                        languageCode
                        languageText
                    }
                    description {
                        languageCode
                        languageText
                    }
                    dataType
                }
                ... on EnumeratedValueDomain {
                    name {
                        languageCode
                        languageText
                    }
                    description {
                        languageCode
                        languageText
                    }
                    dataType
                    klassUrn
                }
            }
        }
    }
`
export function mapVariableByIdResult(results) {
    return {representedVariable: results.data.RepresentedVariableById}
}

export function mapDatasetsByVariableIdResult(results) {
    return results.data.RepresentedVariableById.reverseInstanceVariableRepresentedVariable.edges[0].node
      .reverseLogicalRecordInstanceVariables.edges.filter(nonEmptyNode).map(mapEdge)
}

function nonEmptyNode(edge) {
    return edge.node.reverseUnitDataStructureLogicalRecords.edges[0].node
      .reverseUnitDataSetUnitDataStructure.edges.length > 0;
}

function mapEdge(edge) {
    return mapNode(edge.node.reverseUnitDataStructureLogicalRecords.edges[0].node
      .reverseUnitDataSetUnitDataStructure.edges[0].node)
}

function mapNode(node) {
    return {
        id: node.id,
        type: node.__typename,
        name: node.name,
        description: node.description,
    }
}


