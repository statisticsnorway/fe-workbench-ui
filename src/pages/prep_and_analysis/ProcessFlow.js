import React, { useContext, useEffect, useRef, useState } from 'react'
import Graph from 'react-graph-vis'
import { WorkbenchContext } from '../../context/ContextProvider'
import { NOTIFICATION_TYPE } from '../../utilities/enum/NOTIFICATION_TYPE'
import { MENU } from '../../utilities/enum/MENU'
import { PROCESS_GRAPH } from '../../utilities/enum/PROCESS_GRAPH'
import DatasetDetailsSidebar from './DatasetDetailsSidebar'
import Legend from './Legend'
import { getGraphNode, getLegendNodes } from '../../utilities/common/GraphUtils'
import { Button, Checkbox, Dropdown, Select } from 'semantic-ui-react'
import NodeDetailsSidebar from './NodeDetailsSidebar'
import { GRAPH_NODES } from '../../utilities/enum/GRAPH_NODES'

const canvasHeight = '750px'

const options = {
  autoResize: true,
  layout: {
    improvedLayout: true,
    hierarchical: {
      enabled: true,
      direction: 'LR',
      sortMethod: 'directed',
      parentCentralization: true,
      levelSeparation: 300,
    }
  },
  nodes: {
    shape: 'dot',
  },
  physics: true,
  interaction: {
    dragNodes: true,
    dragView: true
  },
  edges: {
    color: '#000000'
  }
}

const fullSizeStyle = {
  height: canvasHeight,
}

const showSidebarStyle = {
  height: canvasHeight,
  float: 'left',
  width: '80%'
}

const sidebarStyle = {
  float: 'right',
  width: '20%',
  paddingLeft: '2px',
  maxHeight: canvasHeight,
  overflow: 'auto'
}

const getQueryFilter = (filterObj) => {
  if (filterObj) {
    const filterStr = Object.entries(filterObj).filter(e => e[1]).map(e => e[0]).join(',')
    return ['filter=' + filterStr]
  } else {
    return undefined
  }
}

const ProcessFlow = () => {
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedDataset, setSelectedDataset] = useState(null)
  const [showSidebar] = useState(true) // TODO do not show initially?
  const [network, setNetwork] = useState(null)
  const [graph, setGraph] = useState(null)
  const [refresh, setRefresh] = useState(null)
  const [legend, setLegend] = useState(null)
  const [statisticalProgram, setStatisticalProgram] = useState(null)
  const [statisticalPrograms, setStatisticalPrograms] = useState(null)
  const [statisticalProgramCycle, setStatisticalProgramCycle] = useState(null)
  const [statisticalProgramCycles, setStatisticalProgramCycles] = useState(null)
  const [showFilters, setShowFilters] = useState(null)
  const [filters, setFilters] = useState({
    'BusinessProcess': true,
    'ProcessStep': true,
    'UnitDataset': true,
    'CodeBlock': false,
  })
  const context = useContext(WorkbenchContext)
  const mutableContext = useRef(context).current

  useEffect(() => {
    mutableContext.ldsService.getStatisticalPrograms().then(statisticalPrograms => {
      setStatisticalPrograms(statisticalPrograms)
    })
  }, [mutableContext])

  useEffect(() => {
    if (statisticalProgram) {
      const statisticalProgramObj = statisticalPrograms.find(e => e.id === statisticalProgram)
      Promise.all(
        statisticalProgramObj.statisticalProgramCycles.map(path => {
          return mutableContext.ldsService.getStatisticalProgramCycle(path.split('/')[2])
        })
      ).then(statisticalProgramCycles => {
        setStatisticalProgramCycles(statisticalProgramCycles)
      })
    }
  }, [mutableContext, statisticalProgram, statisticalPrograms])

  useEffect(() => {
    if (statisticalProgram && statisticalProgramCycle) {
      mutableContext.graphService.getGraph(mutableContext.user, statisticalProgram, statisticalProgramCycle,
        getQueryFilter(filters)).then(graph => {
        if (!graph.nodes) {
          mutableContext.setNotification(true, NOTIFICATION_TYPE.ERROR, mutableContext.getLocalizedText(PROCESS_GRAPH.STATISTICAL_PROGRAM_NOT_FOUND))
        } else {
          const nodes = graph.nodes.map(n => {
            return getGraphNode(n.type, false, mutableContext.languageCode, n)
          })
          setGraph({
            edges: graph.edges,
            nodes: nodes
          })
          const legendGraph = getLegendNodes(nodes, mutableContext.languageCode)
          setLegend(legendGraph)

          if (network) {
            network.fit()
          }
        }
      })
        .catch(error => mutableContext.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text))
    }
    setRefresh(false)
  }, [mutableContext, statisticalProgram, statisticalProgramCycle, filters, network, refresh])

  const reloadGraph = () => {
    setRefresh(true)
  }

  const getNode = (nodeId) => {
    return graph.nodes.filter(node => node.id === nodeId)[0]
  }

  const events = {
    select: (event) => {
      let { nodes } = event
      setSelectedNote(null)
      if (nodes[0]) {

        const selectedNode = getNode(nodes[0])
        setSelectedNode(selectedNode)
        switch (selectedNode.type) {
          case 'ProcessStep': {
            if (selectedNode.technicalID) {
              context.notebookService.getNote(selectedNode.technicalID, context.user)
                .then(note => {
                  if (note && note.body) {
                    setSelectedNote(note)
                  }
                })
                .catch(error => context.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text))
            }
            break
          }
          case 'UnitDataset': {
            context.ldsService.getDatasetStructure(selectedNode.id).then(result => {
              const dataset = {
                id: selectedNode.id,
                ...result
              }
              setSelectedDataset(dataset)
            })
              .catch(error => context.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text))
            break
          }
          case 'BusinessProcess': {
            break
          }
          case 'CodeBlock': {
            break
          }
          case 'StatisticalProgramCycle': {
            break
          }
          default: {
            context.setNotification(true, NOTIFICATION_TYPE.ERROR, 'Ugyldig type')
          }
        }
      }
    }
  }

  const SideBar = () => {
    if (selectedNode && selectedNode.type === 'UnitDataset') {
      return <DatasetDetailsSidebar dataset={selectedDataset} style={sidebarStyle}/>
    } else if (selectedNode && selectedNode.type !== 'UnitDataset') {
      return <NodeDetailsSidebar node={selectedNode} note={selectedNote} style={sidebarStyle}/>
    } else {
      return <></>
    }
  }

  const toggleFilters = (e, { name, checked }) => {
    const newFilter = Object.assign([], filters)
    newFilter[name] = checked
    setFilters(newFilter)
  }

  const Filters = () => {
    return (
      <Dropdown open={showFilters} onMouseEnter={() => setShowFilters(true)} onMouseLeave={() => setShowFilters(false)}
                className='button icon' text={context.getLocalizedText(PROCESS_GRAPH.FILTERS) + ' '}
                simple item>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Checkbox name='BusinessProcess' label={context.getLocalizedText(GRAPH_NODES.BusinessProcess)}
                      checked={filters['BusinessProcess']} onChange={toggleFilters}/>
          </Dropdown.Item>
          <Dropdown.Item>
            <Checkbox name='ProcessStep' label={context.getLocalizedText(GRAPH_NODES.ProcessStep)}
                      checked={filters['ProcessStep']} onChange={toggleFilters}/>
          </Dropdown.Item>
          <Dropdown.Item>
            <Checkbox name='UnitDataset' label={context.getLocalizedText(GRAPH_NODES.UnitDataset)}
                      checked={filters['UnitDataset']} onChange={toggleFilters}/>
          </Dropdown.Item>
          <Dropdown.Item>
            <Checkbox name='CodeBlock' label={context.getLocalizedText(GRAPH_NODES.CodeBlock)}
                      checked={filters['CodeBlock']} onChange={toggleFilters}/>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  const statisticalProgramOptions = statisticalPrograms ? statisticalPrograms.map(value => {
    return ({
      key: value.id,
      text: mutableContext.getLocalizedGsimObjectText(value.name),
      value: value.id
    })
  }) : []
  const statisticalProgramCycleOptions = statisticalProgramCycles ? statisticalProgramCycles.map(value => {
    return ({
      key: value.id,
      text: mutableContext.getLocalizedGsimObjectText(value.name),
      value: value.id
    })
  }) : []

  return (
    <>
      <style>{`.vis-network {outline-color: white}`}</style>
      <div>
        <h1>{MENU.WORK_FLOW[context.languageCode]}</h1>
        <Select name='statisticalProgram'
                placeholder={context.getLocalizedText(PROCESS_GRAPH.STATISTICAL_PROGRAM_PLACEHOLDER)}
                options={statisticalProgramOptions}
                onChange={(event, data) => setStatisticalProgram(data.value)}
                label={context.getLocalizedText(PROCESS_GRAPH.STATISTICAL_PROGRAM) + ':'}/>
        <Select name='statisticalProgramCycle'
                placeholder={context.getLocalizedText(PROCESS_GRAPH.STATISTICAL_PROGRAM_CYCLE_PLACEHOLDER)}
                options={statisticalProgramCycleOptions}
                onChange={(event, data) => setStatisticalProgramCycle(data.value)}
                label={context.getLocalizedText(PROCESS_GRAPH.STATISTICAL_PROGRAM_CYCLE) + ':'}/>
        <Filters/>
        <Button icon='refresh' onClick={reloadGraph}/>
        <div>

          <div style={showSidebar ? showSidebarStyle : fullSizeStyle}>
            {graph && <>
              <Legend legend={legend}/>
              <Graph graph={graph} options={options} events={events} getNetwork={network => setNetwork(network)}/>
            </>}
          </div>
          {showSidebar && <SideBar/>}
        </div>
      </div>
    </>
  )
}

export default ProcessFlow