import gql from 'graphql-tag';
import _ from 'lodash'

// This should be cached, and maybe filtered by statisticalProgram
export const ALL_DATASETS = gql`
    query allDatasets {
        UnitDataSet {
            edges {
                node {
                    name {
                        languageText
                    }
                    description {
                        languageText
                    }
                }
            }
        }
        DimensionalDataSet {
            edges {
                node {
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
`

export function filterByText(result, value) {
    // Collect all types into one list
    let mapped = [result.data.UnitDataSet, result.data.DimensionalDataSet].flatMap(ds => ds.edges).map(mapEdge);
    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = obj => re.test(obj.title) || re.test(obj.description)
    return _.filter(mapped, isMatch)
}

function mapEdge(edge) {
    return {
        type: edge.node.__typename,
        title: edge.node.name[0].languageText,
        description: edge.node.description[0].languageText,
        data: null,
        rows: 0
    }
}
