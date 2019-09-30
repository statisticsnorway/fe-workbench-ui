import gql from 'graphql-tag';

// This should be cached, and maybe filtered by statisticalProgram
export const ALL_DATASETS = gql`
    query allDatasets {
        UnitDataSet {
            edges {
                node {
                    id
                    name {
                        languageCode
                        languageText
                    }
                    dataSourcePath
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
    }
`