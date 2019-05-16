import gql from 'graphql-tag';

export const FULL_TEXT_SEARCH = gql`
    query textSearch($text: String!) {
        Search(query: $text) {
            edges {
                node {
                    __typename
                    ... on UnitDataSet {
                        id
                        name {
                            languageText
                        }
                        description {
                            languageText
                        }
                    }
                    ... on DimensionalDataSet {
                        id
                        name {
                            languageText
                        }
                        description {
                            languageText
                        }
                    }
                    ... on Variable {
                        id
                        name {
                            languageText
                        }
                        description {
                            languageText
                        }
                    }
                }
            }
        }
    }
`
export function mapSearchResult(results) {
    let mapped = results.data.Search.edges.filter(nonEmptyNode).map(mapEdge)
    return {
        datasets: mapped.filter(value => value.type === 'UnitDataSet'),
        variables: mapped.filter(value => value.type === 'Variable')
    }
}

function nonEmptyNode(edge) {
    return edge.node.name;
}

function mapEdge(edge) {
    return {
        id: edge.node.id,
        type: edge.node.__typename,
        title: edge.node.name[0].languageText,
        description: edge.node.description[0].languageText,
        data: null,
        rows: 0
    }
}
