import React, { Component } from 'react'
import { Checkbox, Divider, Dropdown, Input, Message } from 'semantic-ui-react'

import { WorkbenchContext } from '../../../context/ContextProvider'
import { UI } from "../../../utilities/enum/UI"

class CreateNote extends Component {
  static contextType = WorkbenchContext

  state = {
    dataset: '',
    datasetOptions: [],
    error: false,
    name: '',
    response: false,
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
      this.setState({
        error: error
      })
    })
  }

  createNote = () => {
    const { loadNotes, user } = this.props
    const { dataset, datasetOptions, withDataset, name } = this.state
    let context = this.context
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
    context.notebookService.postNote(note, user, withDataset).then(response => {
      let responseText = !withDataset ? `Note with id ${response.body} (${name}) created`
        : `Note with id ${response.body} (${name}) created with initial datasets`
      this.setState({
        dataset: '',
        name: '',
        response: responseText,
        withDataset: false
      }, () => {
        loadNotes()
        setTimeout(() => {
          this.setState({ response: false })
        }, 4000)
      })
    }).catch(error => {
      this.setState({
        error: error
      })
    })
  }

  paragraphTemplate = (tableName, variableName, url) => (
    `print("%html Henter tabellen <strong>${tableName}</strong>. Alias for denne tabellen er <i>${variableName}</i>")\n`
    + `val ${variableName} = spark.read.format("no.ssb.gsim.spark").load("lds+gsim://${url}")\n`
    + `println("<pre>")\n${variableName}.printSchema()\nprintln("</pre>")`)

  toggleWithDataset = () => this.setState(prevState => ({ withDataset: !prevState.withDataset }))

  handleChange = (event, data) => this.setState({ [data.name]: data.value })

  render () {
    const { dataset, datasetOptions, error, name, response, withDataset } = this.state
    const context = this.context

    return (
      <>
        <Input fluid style={{'maxWidth':'350px'}} name='name'
               placeholder={UI.NOTE_CREATE_NEW[context.languageCode]} value={name} onChange={this.handleChange}
               action={{
                 color: 'teal',
                 labelPosition: 'right',
                 icon: 'file alternate outline',
                 content: UI.NOTE_CREATE[context.languageCode],
                 onClick: () => this.createNote()
               }}
        />

        <Divider fitted hidden />

        <Checkbox label={UI.NOTE_CREATE_WITH_DATASET[context.languageCode]} onChange={this.toggleWithDataset} checked={withDataset} />

        {withDataset &&
        <>
          <Divider fitted hidden />
          <Dropdown name='dataset' placeholder={UI.NOTE_SELECT_DATASET[context.languageCode]} fluid multiple search
                    selection options={datasetOptions} value={dataset} onChange={this.handleChange}
          />
        </>
        }

        {response && <Message positive icon='check' content={response} />}
        {error && <Message negative icon='warning' header='Error' content={error} />}
      </>
    )
  }
}

export default CreateNote
