import _ from 'lodash'

/**
 *   Filters datasets and/or variables for a given GraphQL result.
 *   The method requires that the result has the following structure:
  *   {
 *      "data": {
 *       <TYPE_NAME>: {
 *         "edges": [
 *            {
 *              "node": {
 *                "id": <ID>,
 *                "name": [ ... ],
 *                "description": [ ... ],
 *                "__typename": <TYPE_NAME>
 *              }
 *            }
 *          ],
 *        }
 *      }
 *    }
 *
 */
export function filterByText(results, value) {
  const re = new RegExp(_.escapeRegExp(value), 'i')
  const isMatch = obj => re.test(flattenTexts(obj.name)) || re.test(flattenTexts(obj.description))
  return _.filter(flattenResults(results), isMatch)
}

function flattenTexts(arr) {
  return arr.map(value => value.languageText).join(' ');
}

// Collect all result entries (e.g. dataset types and variables) into one list
function flattenResults(result) {
  return Object.values(result.data).flatMap(ds => ds.edges).map(mapEdge)
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
