import React, { Component } from 'react'
import { Segment, Grid, Header, Button, Input, Select, Icon, TextArea} from 'semantic-ui-react'
import { COLLECTION_UI, COLLECTORS } from '../../utilities/enum/COLLECTIONADMIN'
import { WorkbenchContext } from '../../context/ContextProvider'
import { get, put, post } from '../../utilities/fetch/Fetch'
import skeFregPlaygroundSpec  from '../../mocks/collectorSpecs/skeFregPlaygroundSpec'
import skeSiriusPersonFastsattSpec  from '../../mocks/collectorSpecs/skeSiriusPersonFastsattSpec'
import tollTvinnTestSpec  from '../../mocks/collectorSpecs/tollTvinnTestSpec'

const PUT = 'PUT'
const POST = 'POST'
const environments = [{key: '1', text: 'develop', value: 'develop'},{key: '2', text: 'staging', value: 'staging'}]
const collectorStart = {
  staging: 'https://data-collector.staging-bip-app.ssb.no/task', develop: 'http://localhost:18080/task'
}
const converterStartEndpoint = 'rawdata-converter/start'
const converterStopEndpoint = 'rawdata-converter/stop'
const converterMetricsEndpoint = 'rawdata-converter/metrics'


class CollectionSetup extends Component {
  static contextType = WorkbenchContext

  state = {
    environment: window._env_.REACT_APP_ENV,
    collectorid: '',
    numberConverted: '',
    numberConvertFailed: '',
    showSpec: false
  }

  componentDidMount () {
    this.setMetrics();
    this.interval = setInterval(() => {this.setMetrics()}, 5000)
  }

  componentWillUnmount () {clearInterval(this.interval)}

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleCollectorChange = (event, data) => {
    this.setState({
      collectorid: data.value,
      collector: Object.keys(COLLECTORS).map(collector => COLLECTORS[collector]).filter(c => c.id === data.value)[0]
    })
  }


  onButtonClick = (url, verb, converterSpec) => {
    console.log(verb + ' : ' +  url + ' converterSpec: ' +  converterSpec)

    return( verb === PUT ? put(url, converterSpec) :
      (verb === POST ? post(url, converterSpec) :
        (get(url, converterSpec)))
    ).then(data => {
      console.log(data, 'onButtonClick')
    })
  }

  getConverterSpecFromFile (converterSpecFile) {
    return converterSpecFile === 'skeFregPlaygroundSpec' ? skeFregPlaygroundSpec :
        (converterSpecFile === 'skeSiriusPersonFastsattSpec' ? skeSiriusPersonFastsattSpec :
            (converterSpecFile === 'tollTvinnTestSpec' ? tollTvinnTestSpec : {spec: 'ingen spec'})
        )
  }

  setMetrics = () => {
    if (this.state.collector) {
      return get(this.state.collector.converterUrl + converterMetricsEndpoint).then(data => {
        this.setState({ numberConverted: data['converter-metrics'].converted, numberConvertFailed: data['converter-metrics'].failed })
      })
    } else {
      this.setState({numberConverted: '', numberConvertFailed: ''})
    }
    console.log(this.state.numberConverted, 'setMetrics')
  }

  handleShowSpecClick = () => this.setState((prevState) => ({showSpec: !prevState.showSpec}))

  render () {
    let context = this.context
    const {environment, collectorid, collector, numberConverted, numberConvertFailed, showSpec} = this.state

    const collectors = Object.keys(COLLECTORS).map(collector => ({
      key: COLLECTORS[collector].id,
      text: COLLECTORS[collector].name[context.languageCode],
      value: COLLECTORS[collector].id
    }))


    const converterStart = collector ? collector.converterUrl[environment] + converterStartEndpoint : ''
    const converterStop = collector ? collector.converterUrl[environment] + converterStopEndpoint : ''
    const converterSpec = collector ? this.getConverterSpecFromFile(collector.collectorSpec)  : ''

    return (
      <Segment basic>
        <Segment.Group horizontal>
          <Segment>
            <Grid style={{width: 700}}>
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
              </Grid.Row>
              <Grid.Row>
                {collector ? '(' + collector.converterUrl[environment] + ')' : ''}
              </Grid.Row>
              <Grid.Row>
                <Grid>
                  <Grid.Row>
                    <Segment basic>
                      <Button name='startcollector'
                              onClick={() => this.onButtonClick(collectorStart, PUT, converterSpec)}
                              disabled={!collector}>
                        {context.getLocalizedText(COLLECTION_UI.BUTTON_START_COLLECTOR_FROM_BEGINNING.label)}
                      </Button>
                      <Button name='startconverter'
                                   onClick={() => this.onButtonClick(converterStart, POST, converterSpec)}
                                   disabled={!collector}>
                        {context.getLocalizedText(COLLECTION_UI.BUTTON_START_CONVERTER.label)}
                      </Button>
                        <Button icon={(showSpec ? 'hide':'unhide')} onClick={this.handleShowSpecClick} disabled={!collector}/>
                      <Button name='stopconverter'
                                   onClick={() => this.onButtonClick(converterStop, POST, converterSpec)}
                                   disabled={!collector}>
                        {context.getLocalizedText(COLLECTION_UI.BUTTON_STOP_CONVERTER.label)}
                      </Button>
                    </Segment>
                  </Grid.Row>
                  <Grid.Row>
                    <Segment basic>
                      <Input label={context.getLocalizedText(COLLECTION_UI.NUMBER_CONVERTED)} type="text" value={numberConverted} />
                      <Input label={context.getLocalizedText(COLLECTION_UI.NUMBER_FAILED)} type="text" value={numberConvertFailed} />
                    </Segment>
                  </Grid.Row>
                </Grid>
              </Grid.Row>
            </Grid>
          </Segment>
          {collector && showSpec &&
            <Segment basic>
              <TextArea value={JSON.stringify(converterSpec, null, 2)} style={{width: 800}} rows={40}/>
            </Segment>
          }
        </Segment.Group>
      </Segment>
    )
  }
}

export default CollectionSetup
