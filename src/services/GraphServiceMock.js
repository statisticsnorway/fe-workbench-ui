import ProcessGraph from '../__tests__/test-data/statisticalProgramSkattGraph'
import DataGraph from '../__tests__/test-data/statisticalProgramSkattDataGraph'


class GraphServiceMock {

  getGraph = (user, statisticalProgramId, cycleId, filters) => {
    console.info('(MOCK) getting graph for ' + statisticalProgramId)
    console.log(filters, 'filters')
    console.log(Promise.resolve(DataGraph, 'Datagraph'))
    console.log(Promise.resolve(ProcessGraph), 'ProcessGraph')
    return Promise.resolve(filters && filters.length > 0 ? DataGraph : ProcessGraph)
  }
}

export default GraphServiceMock
