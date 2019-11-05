import React, { useContext, useEffect, useRef, useState } from 'react'
import Graph from 'react-graph-vis'
import { WorkbenchContext } from '../../context/ContextProvider'
import { NOTIFICATION_TYPE } from '../../utilities/enum/NOTIFICATION_TYPE'
import { MENU } from '../../utilities/enum/MENU'
import { PROCESS_GRAPH } from '../../utilities/enum/PROCESS_GRAPH'
import DatasetDetailsSidebar from './DatasetDetailsSidebar'
import Legend from './Legend'
import { getGraphNode, getLegendNodes } from '../../utilities/common/GraphUtils'
import { Checkbox, Select } from 'semantic-ui-react'
import NodeDetailsSidebar from './NodeDetailsSidebar'

const canvasHeight = '640px'

const options = {
  autoResize: true,
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'LR',
      sortMethod: 'directed',
      parentCentralization: true,
      levelSeparation: 300
    }
  },
  nodes: {
    shape: 'dot',
  },
  physics: false,
  interaction: {
    dragNodes: false,
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

const ProcessFlow = () => {
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedDataset, setSelectedDataset] = useState(null)
  const [showSidebar] = useState(true) // TODO do not show initially?
  const [network, setNetwork] = useState(null)
  const [graph, setGraph] = useState(null)
  const [legend, setLegend] = useState(null)
  const [statisticalProgram, setStatisticalProgram] = useState(null)
  const [statisticalPrograms, setStatisticalPrograms] = useState(null)
  const [datasetsOnly, setDatasetsOnly] = useState(undefined)
  const context = useContext(WorkbenchContext)
  const mutableContext = useRef(context).current

  useEffect(() => {
    mutableContext.ldsService.getStatisticalPrograms().then(statisticalPrograms => {
      setStatisticalPrograms(statisticalPrograms.map(value => {
        return ({
          key: value.id,
          text: mutableContext.getLocalizedGsimObjectText(value.name),
          value: value.id
        })
      }))
    })
  }, [mutableContext])

  useEffect(() => {
    if (statisticalProgram) {
      const filter = datasetsOnly ? ['filter=datasets'] : []
      mutableContext.graphService.getGraph(mutableContext.user, statisticalProgram, filter).then(graph => {
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
  }, [mutableContext, statisticalProgram, datasetsOnly, network])

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

  const toggleDatasetsOnly = () => {
    setDatasetsOnly(!datasetsOnly)
  }

  const defaultStatisticalProgram = statisticalPrograms && statisticalPrograms.length === 1 ? statisticalPrograms[0] : null
  return (
    <>
      <style>{`.vis-network {outline-color: white}`}</style>
      <div>
        <h1>{MENU.WORK_FLOW[context.languageCode]}</h1>
        <Select name='statisticalProgram'
                placeholder={context.getLocalizedText(PROCESS_GRAPH.STATISTICAL_PROGRAM_PLACEHOLDER)}
                defaultValue={defaultStatisticalProgram}
                options={statisticalPrograms || []}
                onChange={(event, data) => setStatisticalProgram(data.value)}
                label={context.getLocalizedText(PROCESS_GRAPH.STATISTICAL_PROGRAM) + ':'}/>
        <Checkbox label={context.getLocalizedText(PROCESS_GRAPH.DATASET_ONLY)} onChange={toggleDatasetsOnly}/>
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