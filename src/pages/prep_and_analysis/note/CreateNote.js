import React, { Component } from 'react'
import { Checkbox, Divider, Dropdown, Input } from 'semantic-ui-react'

import { WorkbenchContext } from '../../../context/ContextProvider'
import { UI } from "../../../utilities/enum/UI"
import { NOTIFICATION_TYPE } from '../../../utilities/enum/NOTIFICATION_TYPE'

class CreateNote extends Component {
  static contextType = WorkbenchContext

  state = {
    dataset: '',
    datasetOptions: [],
    name: '',
    withDataset: false
  }

  componentDidMount () {
    let context = this.context

    context.ldsService.getDatasets().then(response => {
      const datasetOptions = response.data.UnitDataSet.edges.map(dataset => ({
        key: dataset.node.id,
        text: dataset.node.name[0].languageText,
        value: dataset.node.id,
        disabled: !dataset.node.dataSourcePath,
        description: !dataset.node.dataSourcePath ? 'ingen data' : ''
      }))

      this.setState({ datasetOptions: datasetOptions })
    }).catch(error => {
      context.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text)
    })
  }

  onClick = () => {
    const { createNote } = this.props
    const { dataset, datasetOptions, withDataset, name } = this.state
    let note = { name: name }
    if (withDataset) {
      const selectedOptions = datasetOptions.filter(option => dataset.includes(option.key));
      const textArr = selectedOptions.map((option, index) => {
        const variableName = `ds${index + 1}`
        return this.paragraphTemplate(option.text, variableName, option.key)
      })
      note.paragraphs = [{
        title: 'Henter datasett fra LDS',
        text: textArr.join('\n\n'),
        config: {
          title: true,
          editorHide: true
        }
      }]
    }
    createNote(note, withDataset)
    this.setState({
      dataset: '',
      name: '',
      withDataset: false
    })
  }

  paragraphTemplate = (tableName, variableName, url) => (
    `print("%html Henter tabellen <strong>${tableName}</strong>. Alias for denne tabellen er <i>${variableName}</i>")\n`
    + `val ${variableName} = spark.read.format("no.ssb.gsim.spark").load("lds+gsim://${url}")\n`
    + `println("<pre>")\n${variableName}.printSchema()\nprintln("</pre>")`)

  toggleWithDataset = () => this.setState(prevState => ({ withDataset: !prevState.withDataset }))

  handleChange = (event, data) => this.setState({ [data.name]: data.value })

  render () {
    const { dataset, datasetOptions, name, withDataset } = this.state
    const context = this.context

    return (
      <>
        <Input fluid style={{'maxWidth':'350px'}} name='name'
               placeholder={context.getLocalizedText(UI.NOTE_CREATE_NEW)} value={name} onChange={this.handleChange}
               action={{
                 color: 'teal',
                 labelPosition: 'right',
                 icon: 'file alternate outline',
                 content: UI.NOTE_CREATE[context.languageCode],
                 onClick: () => this.onClick()
               }}
        />

        <Divider fitted hidden />

        <Checkbox label={context.getLocalizedText(UI.NOTE_CREATE_WITH_DATASET)} onChange={this.toggleWithDataset} checked={withDataset} />

        {withDataset &&
        <>
          <Divider fitted hidden />
          <Dropdown name='dataset' placeholder={context.getLocalizedText(UI.NOTE_SELECT_DATASET)} fluid multiple search
                    selection options={datasetOptions} value={dataset} onChange={this.handleChange}
          />
        </>
        }

      </>
    )
  }
}

export default CreateNote
