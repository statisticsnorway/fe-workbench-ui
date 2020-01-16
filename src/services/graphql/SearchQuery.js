import gql from 'graphql-tag';

export const GET_QUERY_FIELDS = gql`
    query gettype {
        __type(name: "Query") {
            name
            fields {
                name
            }
        }
    }
`

export const FULL_TEXT_SEARCH = gql`
    query textSearch($text: String!) {
        Search(query: $text) {
            edges {
                node {
                    __typename
                    ... on UnitDataSet {
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
                    ... on DimensionalDataSet {
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
                    ... on RepresentedVariable {
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
    }
`
export function hasSearchQueryField(results) {
    let searchField = results.data.__type.fields.find(field => field.name === "Search")
    let result = typeof searchField !== 'undefined'
    return result
}

export function mapSearchResult(results) {
    return results.data.Search.edges.filter(nonEmptyNode).map(mapEdge)
}

function nonEmptyNode(edge) {
    return edge.node.name;
}

function mapEdge(edge) {
    return {
        id: edge.node.id,
        type: edge.node.__typename,
        name: edge.node.name,
        description: edge.node.description,
        variable: edge.node.variable,
        data: null,
        rows: 0
    }
}
