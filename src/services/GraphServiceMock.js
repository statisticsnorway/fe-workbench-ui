import ProcessGraph from '../__tests__/test-data/statisticalProgramSkattGraph'
import DataGraph from '../__tests__/test-data/statisticalProgramSkattDataGraph'


class GraphServiceMock {

  getGraph = (user, statisticalProgramId, filters) => {
    console.info('(MOCK) getting graph for ' + statisticalProgramId)
    return Promise.resolve(filters && filters.length > 0 ? DataGraph : ProcessGraph)
  }
}

export default GraphServiceMock
