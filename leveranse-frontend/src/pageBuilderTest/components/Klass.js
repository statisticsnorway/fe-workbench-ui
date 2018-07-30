import React from 'react'
import { Accordion, Checkbox, Container, Divider, Form, Grid, Icon, Input, List, Segment } from 'semantic-ui-react'
import { enums } from '../utilities/Enums'
import { getDataFromKlass } from '../utilities/DataExchange'
import { responseMessage } from '../utilities/FormComponents'
import * as moment from 'moment'
import 'moment/min/locales'

moment.locale(enums.LANGUAGE_CODE.NORWEGIAN)

class Klass extends React.Component {
  state = {
    open: false,
    response: '',
    classificationFamilies: [],
    deepAccordionIndex: -1,
    deeperAccordionIndex: -1,
    klassUrl: '',
    klassDescription: ''
  }

  componentDidMount () {
    getDataFromKlass('http://data.ssb.no/api/klass/v1/classificationfamilies', enums.HTTP_HEADERS.JSON).then((result) => {
      let classificationFamilies = result._embedded.classificationFamilies

      for (let i = 0, l = classificationFamilies.length; i < l; i++) {
        getDataFromKlass(classificationFamilies[i]._links.self.href, enums.HTTP_HEADERS.JSON).then((result) => {
          let classifications = result.classifications

          for (let i = 0, l = classifications.length; i < l; i++) {
            classifications[i].completeList = false
            classifications[i].latestList = false
            classifications[i].codes = []
          }

          classificationFamilies[i].classifications = classifications
        }).catch((reason) => {
          this.setState({response: reason})
        })
      }

      this.setState({classificationFamilies: classificationFamilies})
    }).catch((reason) => {
      this.setState({response: reason})
    })
  }

  handleAccordionClick = () => {
    this.setState({open: !this.state.open})
  }

  handleDeepAccordionClick = (e, titleProps) => {
    const {index} = titleProps
    const {deepAccordionIndex} = this.state
    const newIndex = deepAccordionIndex === index ? -1 : index

    this.setState({deepAccordionIndex: newIndex})
  }

  handleDeeperAccordionClick = (e, titleProps) => {
    const {index} = titleProps
    const {deeperAccordionIndex} = this.state
    const newIndex = deeperAccordionIndex === index ? -1 : index

    this.setState({deeperAccordionIndex: newIndex})
  }

  handleListCheckbox (index, item, list) {
    let boolean = this.state.classificationFamilies[index].classifications[item][list]

    this.fetchCodesFromKlass(index, item)

    //TODO: Should use https://github.com/kolodny/immutability-helper
    if (list === 'completeList' && boolean) {
      this.setState({
        classificationFamilies: {
          ...this.state.classificationFamilies,
          [index]: {
            ...this.state.classificationFamilies[index],
            classifications: {
              ...this.state.classificationFamilies[index].classifications,
              [item]: {
                ...this.state.classificationFamilies[index].classifications[item],
                completeList: !boolean,
                latestList: false
              }
            }
          }
        }
      })
    } else {
      this.setState({
        classificationFamilies: {
          ...this.state.classificationFamilies,
          [index]: {
            ...this.state.classificationFamilies[index],
            classifications: {
              ...this.state.classificationFamilies[index].classifications,
              [item]: {
                ...this.state.classificationFamilies[index].classifications[item],
                [list]: !boolean
              }
            }
          }
        }
      })
    }
  }

  handleCodesListCheckbox (index, item, code) {
    let boolean = this.state.classificationFamilies[index].classifications[item].codes[code].checked

    //TODO: Should use https://github.com/kolodny/immutability-helper
    this.setState({
      classificationFamilies: {
        ...this.state.classificationFamilies,
        [index]: {
          ...this.state.classificationFamilies[index],
          classifications: {
            ...this.state.classificationFamilies[index].classifications,
            [item]: {
              ...this.state.classificationFamilies[index].classifications[item],
              codes: {
                ...this.state.classificationFamilies[index].classifications[item].codes,
                [code]: {
                  ...this.state.classificationFamilies[index].classifications[item].codes[code],
                  checked: !boolean
                }
              }
            }
          }
        }
      }
    }, () => {
      let selectedCodes = ''
      let selectedCodesNames = ''
      let classificationFamilyName = this.state.classificationFamilies[index].name
      let classificationName = this.state.classificationFamilies[index].classifications[item].name

      Object.keys(this.state.classificationFamilies[index].classifications[item].codes).forEach((key) => {
        let checked = this.state.classificationFamilies[index].classifications[item].codes[key].checked

        if (checked) {
          selectedCodes += this.state.classificationFamilies[index].classifications[item].codes[key].code + ','
          selectedCodesNames += this.state.classificationFamilies[index].classifications[item].codes[key].name + ';'
        }
      })

      let today = moment().format('YYYY-MM-DD')
      let href = this.state.classificationFamilies[index].classifications[item]._links.self.href
      let url = href + '/codesAt?date=' + today + '&selectCodes=' + selectedCodes

      if (url.endsWith(',')) {
        url = url.slice(0, -1)
      }

      if (selectedCodesNames.endsWith(';')) {
        selectedCodesNames = selectedCodesNames.slice(0, -1)
      }

      let description = classificationFamilyName + '/' + classificationName + '/' + selectedCodesNames

      this.setState({
        klassUrl: url,
        klassDescription: description
      })

      let klass = {
        url: url,
        description: description
      }

      this.props.url(klass)
    })
  }

  fetchCodesFromKlass (index, item) {
    let today = moment().format('YYYY-MM-DD')
    let url = this.state.classificationFamilies[index].classifications[item]._links.self.href + '/codesAt?date=' + today
    let codes = []

    getDataFromKlass(url, enums.HTTP_HEADERS.JSON).then((result) => {
      codes = result.codes

      for (let i = 0, l = result.codes.length; i < l; i++) {
        codes[i].checked = false
      }

      //TODO: Should use https://github.com/kolodny/immutability-helper
      this.setState({
        classificationFamilies: {
          ...this.state.classificationFamilies,
          [index]: {
            ...this.state.classificationFamilies[index],
            classifications: {
              ...this.state.classificationFamilies[index].classifications,
              [item]: {
                ...this.state.classificationFamilies[index].classifications[item],
                codes
              }
            }
          }
        }
      })
    }).catch((reason) => {
      this.setState({response: reason})
    })
  }

  render () {
    const {open, response, classificationFamilies, deepAccordionIndex, deeperAccordionIndex} = this.state

    return (
      <Accordion fluid className='noMargin'>
        <Accordion.Title active={open} />

        <Accordion.Content active={open}>
          <Segment>
            {responseMessage(response)}

            <Form.Field>
              <label>{enums.CONTENT.KLASS_SEARCH}</label>
              <Input icon='search' placeholder={enums.CONTENT.SEARCH} />
            </Form.Field>

            <Divider hidden />

            <Accordion fluid>
              {typeof classificationFamilies !== 'undefined' && Object.keys(classificationFamilies).map((mainItem, mainIndex) => {
                let familyName = classificationFamilies[mainIndex].name
                let numberOfClassifications = classificationFamilies[mainIndex].numberOfClassifications
                let classifications = classificationFamilies[mainIndex].classifications

                return (
                  <div key={familyName}>
                    <Accordion.Title active={deepAccordionIndex === familyName} index={familyName}
                                     onClick={this.handleDeepAccordionClick}>
                      {deepAccordionIndex === familyName ? <Icon name='minus' /> : <Icon name='plus' />}
                      {familyName} ({numberOfClassifications})
                    </Accordion.Title>

                    <Accordion.Content active={deepAccordionIndex === familyName}>
                      <Segment>
                        <Accordion fluid className='noMargin'>
                          {typeof classifications !== 'undefined' && Object.keys(classifications).map((deepItem) => {
                            let classificationName = classificationFamilies[mainIndex].classifications[deepItem].name
                            let completeList = classificationFamilies[mainIndex].classifications[deepItem].completeList
                            let latestList = classificationFamilies[mainIndex].classifications[deepItem].latestList
                            let codes = classificationFamilies[mainIndex].classifications[deepItem].codes

                            return (
                              <div key={classificationName}>
                                <Accordion.Title active={deeperAccordionIndex === classificationName}
                                                 index={classificationName}
                                                 onClick={this.handleDeeperAccordionClick}>
                                  {deeperAccordionIndex === classificationName ? <Icon name='caret down' /> :
                                    <Icon name='caret right' />}
                                  {classificationName}
                                </Accordion.Title>

                                <Accordion.Content active={deeperAccordionIndex === classificationName}>
                                  <Grid columns={2}>
                                    <Grid.Column>
                                      <Checkbox label={enums.CONTENT.USE_COMPLETE_LIST} checked={completeList}
                                                onChange={(event, {index = mainIndex, item = deepItem, list = 'completeList'}) =>
                                                  this.handleListCheckbox(index, item, list)} />
                                    </Grid.Column>

                                    <Grid.Column>
                                      <Container fluid textAlign='right'>
                                        <Checkbox label={enums.CONTENT.USE_LATEST_LIST} checked={latestList}
                                                  disabled={!completeList}
                                                  onChange={(event, {index = mainIndex, item = deepItem, list = 'latestList'}) =>
                                                    this.handleListCheckbox(index, item, list)} />
                                      </Container>
                                    </Grid.Column>
                                  </Grid>

                                  {typeof codes !== 'undefined' && codes.length !== 0 ?
                                    <Segment>
                                      <List>
                                        {Object.keys(codes).map((deepestItem) => {
                                          let code = classificationFamilies[mainIndex].classifications[deepItem].codes[deepestItem].code
                                          let name = classificationFamilies[mainIndex].classifications[deepItem].codes[deepestItem].name
                                          let codeName = code + ' - ' + name
                                          let codeChecked = classificationFamilies[mainIndex].classifications[deepItem].codes[deepestItem].checked

                                          return (
                                            <List.Item key={codeName}>
                                              <Checkbox label={codeName} checked={codeChecked}
                                                        onChange={(event, {index = mainIndex, item = deepItem, code = deepestItem}) =>
                                                          this.handleCodesListCheckbox(index, item, code)} />
                                            </List.Item>
                                          )
                                        })}
                                      </List>
                                    </Segment> : null
                                  }
                                </Accordion.Content>
                              </div>
                            )
                          })}
                        </Accordion>
                      </Segment>
                    </Accordion.Content>
                  </div>
                )
              })}
            </Accordion>
          </Segment>
        </Accordion.Content>
      </Accordion>
    )
  }
}

export default Klass
