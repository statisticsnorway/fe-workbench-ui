import React, { Component } from 'react'
import { Checkbox, Divider, Dropdown, Input, Message } from 'semantic-ui-react'

import { WorkbenchContext } from '../../../context/ContextProvider'

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

    context.ldsService.getDataSets().then(response => {
      const datasetOptions = response.data.UnitDataSet.edges.map(dataset => ({
        key: dataset.node.id,
        text: dataset.node.name[0].languageText,
        value: dataset.node.id
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

    context.notebookService.postNote({ name: name }, user).then(response => {
      if (withDataset) {
        const datasetName = datasetOptions.find(option => option.key === dataset).text
        const datasetUrl = datasetOptions.find(option => option.key === dataset).key
        const paragraph = {
          title: `Fetch unitdataset ${datasetName} from LDS`,
          text: `%sh\nwget [ldsUrl/${datasetUrl}] -O unitdataset.json\n` //TODO: prefix datasetUrl with lds url
        }

        context.notebookService.postParagraph(response.body, paragraph, user).then(() => {
          this.setState({
            dataset: '',
            name: '',
            response: `Note with id ${response.body} (${name}) created. Initiated with dataset ${datasetName}`,
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
      } else {
        this.setState({
          dataset: '',
          name: '',
          response: `Note with id ${response.body} (${name}) created`,
          withDataset: false
        }, () => {
          loadNotes()
          setTimeout(() => {
            this.setState({ response: false })
          }, 4000)
        })
      }
    }).catch(error => {
      this.setState({
        error: error
      })
    })
  }

  toggleWithDataset = () => this.setState(prevState => ({ withDataset: !prevState.withDataset }))

  handleChange = (event, data) => this.setState({ [data.name]: data.value })

  render () {
    const { dataset, datasetOptions, error, name, response, withDataset } = this.state

    return (
      <>
        <Input fluid style={{'maxWidth':'350px'}} name='name'
               placeholder='Create new Note' value={name} onChange={this.handleChange}
               action={{
                 color: 'teal',
                 labelPosition: 'right',
                 icon: 'file alternate outline',
                 content: 'Create',
                 onClick: () => this.createNote()
               }}
        />

        <Divider fitted hidden />

        <Checkbox label='Init with dataset?' onChange={this.toggleWithDataset} checked={withDataset} />

        {withDataset &&
        <>
          <Divider fitted hidden />
          <Dropdown name='dataset' placeholder='Select Dataset' selection options={datasetOptions} value={dataset}
                    onChange={this.handleChange}
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
