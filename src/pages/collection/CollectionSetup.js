import React, { Component } from 'react'
import { Segment, Grid, Header, Button, Input, Select, Popup, Icon } from 'semantic-ui-react'
import { COLLECTION_UI, COLLECTORS } from '../../utilities/enum/COLLECTIONADMIN'
import { WorkbenchContext } from '../../context/ContextProvider'
import { get, put, post } from '../../utilities/fetch/Fetch'
import  skeFregPlaygroundSpec  from '../../mocks/collectorSpecs/skeFregPlaygroundSpec'
import  skeSiriusPersonFastsattSpec  from '../../mocks/collectorSpecs/skeSiriusPersonFastsattSpec'
import  tollTvinnTestSpec  from '../../mocks/collectorSpecs/tollTvinnTestSpec'

const PUT = 'PUT'
const POST = 'POST'

class CollectionSetup extends Component {
  static contextType = WorkbenchContext

  state = {
    collectorid: '',
    uptime: ''
  }

  componentDidMount () {
    this.setMockUptime();
    this.interval = setInterval(() => {this.setMockUptime()}, 5000)
  }

  handleCollectorChange = (event, data) => {
    this.setState({
      collectorid: data.value,
      collector: Object.keys(COLLECTORS).map(collector => COLLECTORS[collector]).filter(c => c.id === data.value)[0]
    })
    console.log(this.state.collector, 'collector i handleCollectorChange')
  }

  componentWillUnmount () {clearInterval((this.interval))}

  onButtonClick = (url, verb, parameterfile) => {
    let parameters = this.getParametersFromFile(parameterfile)
    switch (verb) {
      case PUT:
        console.log('Url : ' +  url + ' Parameters: ' +  parameters)
        return put(url, parameters).then(data => {
          console.log(data)
        })
      case POST:
        console.log('Url : ' +  url + ' Parameters: ' +  parameters)
        return post(url, parameters).then(data => {
          console.log(data)
        })
      default:
        console.log('Url : ' +  url + ' Parameters: ' +  parameters)
        return get(url, parameters).then(data => {
          console.log(data)
        })
    }
  }

  getParametersFromFile (parameterFile) {
    if (parameterFile === 'skeFregPlaygroundSpec') {
      return JSON.stringify(skeFregPlaygroundSpec)
    }
    if (parameterFile === 'skeSiriusPersonFastsattSpec') {
      return JSON.stringify(skeSiriusPersonFastsattSpec)
    }
    if (parameterFile === 'tollTvinnTestSpec') {
      return JSON.stringify(tollTvinnTestSpec)
    }
  }

  setMockUptime = () => {
    return get("http://localhost:8092/mock-api/secondpassed").then(data => {
      this.setState({uptime: data.timepassed})
    })
  }

  render () {
    let context = this.context
    const {collectorid, collector, uptime} = this.state
    console.log(uptime)

    const collectors = Object.keys(COLLECTORS).map(collector => ({
      key: COLLECTORS[collector].id,
      text: COLLECTORS[collector].name[context.languageCode],
      value: COLLECTORS[collector].id
    }))


    const collectorStart = 'https://data-collector.staging-bip-app.ssb.no/task'
    const converterStart = collector ? collector.converterUrl + 'rawdata-converter/start' : ''
    const converterStop = collector ? collector.converterUrl + 'rawdata-converter/stop' : ''
    const parameterFile = collector ? collector.collectorSpec : ''

    return (
      <Segment basic>
        <Grid>
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
              // label={context.getLocalizedText(COLLECTORS)}
                         options={collectors}
                         onChange={this.handleCollectorChange}/>
          </Grid.Row>
          <Grid.Row>
            {collector ? '(' + collector.converterUrl + ')' : ''}
          </Grid.Row>
          <Grid.Row>
            <Grid>
              <Grid.Row>
                <Segment basic>
                <Popup content={this.getParametersFromFile (parameterFile)}  trigger={
                  <Button name='startcollector'
                          onClick={() => this.onButtonClick(collectorStart, PUT, parameterFile)}
                          disabled={!collector}
                  >
                    {context.getLocalizedText(COLLECTION_UI.BUTTON_START_COLLECTOR_FROM_BEGINNING.label)}
                  </Button>
                }
                />
                <Button name='startconverter'
                             onClick={() => this.onButtonClick(converterStart, POST, parameterFile)}
                             disabled={!collector}
                >
                  {context.getLocalizedText(COLLECTION_UI.BUTTON_START_CONVERTER.label)}
                </Button>
                <Button name='stopconverter'
                             onClick={() => this.onButtonClick(converterStop, POST, parameterFile)}
                             disabled={!collector}
                >
                  {context.getLocalizedText(COLLECTION_UI.BUTTON_STOP_CONVERTER.label)}
                </Button>
                </Segment>
              </Grid.Row>
              <Grid.Row>
                <Segment basic>
                  <Input label='Sekunder oppe' type="text" value={uptime} />
                </Segment>
              </Grid.Row>
            </Grid>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default CollectionSetup
