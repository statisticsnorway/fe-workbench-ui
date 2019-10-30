import React, { Component } from 'react'
import { Segment, Grid, Header, Button, Input, Select, Icon, TextArea, Label} from 'semantic-ui-react'
import { COLLECTION_UI, COLLECTORS } from '../../utilities/enum/COLLECTIONADMIN'
import { WorkbenchContext } from '../../context/ContextProvider'
import { get, put, post, del } from '../../utilities/fetch/Fetch'
import skeFregPlaygroundSpec  from '../../mocks/collectorSpecs/skeFregPlaygroundSpec'
import skeSiriusPersonFastsattSpec  from '../../mocks/collectorSpecs/skeSiriusPersonFastsattSpec'
import tollTvinnTestSpec  from '../../mocks/collectorSpecs/tollTvinnTestSpec'

// const GET = 'GET'
const PUT = 'PUT'
const POST = 'POST'
const DELETE = 'DELETE'
const environments = [{key: '1', text: 'development', value: 'development'},{key: '2', text: 'staging', value: 'staging_bip'}]

const collectorServerConf = {
  staging_bip: 'https://workbench.staging-bip-app.ssb.no/be/data-collector',
  development: 'http://localhost:9990'
}

const collectorEndpoint = '/tasks'
const converterStartEndpoint = '/start'
const converterStopEndpoint = '/stop'
const converterMetricsEndpoint = '/metrics'



class CollectionSetup extends Component {
  static contextType = WorkbenchContext

  state = {
    environment: window._env_.REACT_APP_ENV,
    collectorid: '',
    numberConverted: '',
    numberConvertFailed: '',
    showSpec: false,
    activeTasks: [],
    activetask: '',
    guiUpdateInterval: 3000
  }

  componentDidMount () {
    console.log(this.state.environment, 'miljø')
    this.setMetricsAndActiveTasks();
    this.interval = setInterval(() => {
      this.setMetricsAndActiveTasks()}, this.state.guiUpdateInterval)

  }

  componentWillUnmount () {clearInterval(this.interval)}

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }

  // handleIntervalChange = (event, data) => {
  //   this.setState({ [data.name]: data.value })
  //   this.setInterval(data.value)
  // }

  handleCollectorChange = (event, data) => {
    this.setState({
      collectorid: data.value,
      collector: Object.keys(COLLECTORS).map(collector => COLLECTORS[collector]).filter(c => c.id === data.value)[0]
    })
  }


  onButtonClick = (url, verb, collectorSpec) => {
    console.log(verb + ' : ' +  url + ' collectorSpec: ' +  collectorSpec)
    return( verb === PUT ? put(url, collectorSpec) :
      (verb === POST ? post(url, collectorSpec) :
        (verb === DELETE ? del(url, collectorSpec) :
          get(url, collectorSpec))))
      .then(data => {
        data.json(json => console.log(json))
    })
  }

  getCollectorSpecFromFile (collectorSpecFile) {
    return collectorSpecFile === 'skeFregPlaygroundSpec' ? skeFregPlaygroundSpec :
        (collectorSpecFile === 'skeSiriusPersonFastsattSpec' ? skeSiriusPersonFastsattSpec :
            (collectorSpecFile === 'tollTvinnTestSpec' ? tollTvinnTestSpec : {spec: 'ingen spec'})
        )
  }

  setMetricsAndActiveTasks = () => {
    console.log(this.state.collector ? this.state.collector.converterUrl[this.state.environment] + converterMetricsEndpoint :'', 'call converter-metrics')
    console.log(collectorServerConf[this.state.environment] + collectorEndpoint, 'call collector active tasks')
    if (this.state.collector) {
      Promise.all([
        get(this.state.collector.converterUrl[this.state.environment] + converterMetricsEndpoint),
        get(collectorServerConf[this.state.environment] + collectorEndpoint)
      ]).then(response => {
        response.json(json => console.log(json))
        this.setState({
          numberConverted: response[0]['converter-metrics'].converted,
          numberConvertFailed: response[0]['converter-metrics'].failed,
          activeTasks: response[1]
        })
      })
    } else {
      this.setState({numberConverted: '', numberConvertFailed: '', activeTasks: []})
    }
    console.log(this.state.numberConverted, 'setMetrics')
  }

  handleShowSpecClick = () => this.setState((prevState) => ({showSpec: !prevState.showSpec}))


  render () {
    let context = this.context
    const {environment, collectorid, collector, numberConverted, numberConvertFailed, showSpec, activeTasks, activetask, guiUpdateInterval} = this.state

    const collectors = Object.keys(COLLECTORS).map(collector => ({
      key: COLLECTORS[collector].id,
      text: COLLECTORS[collector].name[context.languageCode],
      value: COLLECTORS[collector].id
    }))

    const activetaskscollection = Object.keys(activeTasks).map(task => ({
      key: activeTasks[task]['task-id'],
      text: activeTasks[task]['specification-id'],
      value: activeTasks[task]['task-id']
    }))

    const collectorSpec = collector ? this.getCollectorSpecFromFile(collector.collectorSpec)  : ''
    const collectorIdFromSpec = collectorSpec.id || ''
    const activeCollectorTask = activeTasks.filter(t => t['specification-id'] === collectorIdFromSpec)[0]
    const activeCollectorTaskId = activeCollectorTask ? activeCollectorTask['task-id'] : ''

    const converterStart = collector ? collector.converterUrl[environment] + converterStartEndpoint : ''
    const converterStop = collector ? collector.converterUrl[environment] + converterStopEndpoint : ''
    const collectorStart = collectorServerConf[environment] + collectorEndpoint
    const collectorStop = collectorServerConf[environment] + collectorEndpoint + '/' + (activeCollectorTaskId || activetask)

    // const ActiveTaskList = () =>
    //   <List>
    //     {activeTasks.map((item) => ActiveTasksListItem(item))}
    //   </List>
    // const ActiveTasksListItem = item =>
    //   <List.Item>
    //     <List.Content>{item['specification-id']}</List.Content>
    //   </List.Item>


    return (
      <Segment basic>
        <Segment.Group horizontal>
          <Segment>
            <Grid style={{width: 800}}>
              <Grid.Row>
                <Header>
                  <Icon name={'database'} color={'blue'}/>
                  <Header.Content>{context.getLocalizedText(COLLECTION_UI.COLLECTION_HEADER)} for</Header.Content>
                </Header>
                <Select fluid
                        style={{width: `${(8 * collectors.length) + 100}px`}}
                        name='collector'
                        placeholder={context.getLocalizedText(COLLECTION_UI.COLLECTORS)}
                        value={collectorid}
                        options={collectors}
                        onChange={this.handleCollectorChange}/>
                <Select fluid
                        style={{width: `${(8 * collectors.length) + 100}px`}}
                        name='environment'
                        placeholder={context.getLocalizedText(COLLECTION_UI.ENVIRONMENT)}
                        value={environment}
                        options={environments}
                        onChange={this.handleChange}/>
                <Button icon={(showSpec ? 'hide':'unhide')} onClick={this.handleShowSpecClick} disabled={!collector}/>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={10}>
                    <Segment>
                      <Label attached={'top'}>{context.getLocalizedText(COLLECTION_UI.COLLECTOR)}</Label>

                      <Button name='startcollector'
                              onClick={() => this.onButtonClick(collectorStart, PUT, JSON.stringify(collectorSpec))}
                              disabled={!collector}>
                        {context.getLocalizedText(COLLECTION_UI.BUTTON_START_COLLECTOR_FROM_BEGINNING.label)}
                      </Button>
                      <Button name='stopcollector'
                              onClick={() => this.onButtonClick(collectorStop, DELETE, null)}
                              disabled={!collector || !(activeCollectorTaskId || activetask)}>
                        {context.getLocalizedText(COLLECTION_UI.BUTTON_STOP_COLLECTOR.label)} {collectorIdFromSpec}
                      </Button>
                      {!collectorIdFromSpec && activetaskscollection.length > 0 &&
                      <Select style={{width: `${(8 * activetaskscollection.length) + 100}px`}}
                              name='activetask'
                              placeholder={context.getLocalizedText(COLLECTION_UI.COLLECTORS)}
                              value={activetask}
                              options={activetaskscollection}
                              onChange={this.handleChange}/>
                      }
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment>
                      <Label attached={'top'}>{context.getLocalizedText(COLLECTION_UI.CONVERTER)}</Label>
                      <Button name='startconverter'
                                   onClick={() => this.onButtonClick(converterStart, POST, null)}
                                   disabled={!collector}>
                        {context.getLocalizedText(COLLECTION_UI.BUTTON_START_CONVERTER.label)}
                      </Button>
                      <Button name='stopconverter'
                                   onClick={() => this.onButtonClick(converterStop, POST, null)}
                                   disabled={!collector}>
                        {context.getLocalizedText(COLLECTION_UI.BUTTON_STOP_CONVERTER.label)}
                      </Button>
                    </Segment>
                </Grid.Column>


                  <Grid.Row>
                    <Segment basic>
                      <Input label={context.getLocalizedText(COLLECTION_UI.NUMBER_CONVERTED)}
                             type="text" value={numberConverted}
                             style={{width: 300}}/>
                      <Input label={context.getLocalizedText(COLLECTION_UI.NUMBER_FAILED)}
                             type="text" value={numberConvertFailed}
                             style={{width: 300}} />
                      <Input label={context.getLocalizedText(COLLECTION_UI.GUI_UPDATE_INTERVAL)}
                             type="text" name='guiUpdateInterval' value={guiUpdateInterval}
                             style={{width: 90}}
                             disabled={true}
                             // onChange={this.handleIntervalChange}
                      />
                    </Segment>
                  </Grid.Row>
              </Grid.Row>
            </Grid>
          </Segment>
          {collector && showSpec &&
            <Segment basic>
              <TextArea value={JSON.stringify(collectorSpec, null, 2)} style={{width: 800}} rows={40}/>
            </Segment>
          }
        </Segment.Group>
        {collector && environment ? '(' + collectorStart + ',  ' + collectorStop + ',  ' + converterStart + ')' : ''}
      </Segment>
    )
  }
}
export default CollectionSetup
