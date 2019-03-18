import React, { Component, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input, Dropdown } from 'semantic-ui-react'

export default class BarChart extends Component {
  constructor(props) {
    super(props)
    const {data} = props

    this.state = {
      year: props.data[0]['periode'],
      municipality: props.data[0]['kommuneregion'],
      years: [...(new Set(data.map(e => e['periode'])))],
      municipalities : [...(new Set(data.map(e => e['kommuneregion'])))],
      index: 0
    }
  }

  componentDidMount () {
    const {data} = this.props
    console.log('Data to plot: ', data)
    console.log('Available years: ', this.state.years)
    console.log('Available municipalities: ', this.state.municipalities)
  }

  prepareData(index) {
    const {data} = this.props
    const disallowed = ['kommuneregion', 'periode']

    let allowedLabels = Object.keys(data[index])
      .filter((e) => !disallowed.includes(e))

    return {
      labels: allowedLabels,
      datasets: [
        {
          label: `Dyr i kommune ${data[index]['kommuneregion']} i år ${data[index]['periode']}`,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: allowedLabels.map(e => data[index][e])
        }
      ]
    }
  }

  findIndex = (municipality, year) => {
    let index = 0
    this.props.data.forEach((e, i) => {
      if (e['kommuneregion'] === municipality && e['periode'] === year) {
        index = i
      }
    })
    return index
  }

  handleYearChange = (event, data) => {
    console.log('year changed: ', data)
    if (this.state.years.includes(data.value)) {
      const index = this.findIndex(this.state.municipality, data.value)
      this.setState({year: data.value, index: index})
    }
  }

  handleMunicipalityChange = (event, data) => {
    console.log('municipalities changed: ', data)
    if (this.state.municipalities.includes(data.value)) {
      const index = this.findIndex(data.value, this.state.year)
      this.setState({municipality: data.value, index: index})
    }
  }

  render() {
    const {years, municipalities} = this.state
    return (
      <Fragment>
        <Input list='years' placeholder='Choose year...' style={{width: '170px'}}
               onChange={this.handleYearChange} label={'År'}/>
        <datalist id='years'>
          {years && years.map(e => {return <option value={e}/>})}
        </datalist>
        <Input list='municipalities' placeholder='Choose municipalitiy...' style={{width: '120px'}}
               onChange={this.handleMunicipalityChange} label={'Kommune'}/>
        <datalist id='municipalities'>
          {municipalities && municipalities.map(e => {return <option value={e}/>})}
        </datalist>
        <Bar
          data={this.props.data ? this.prepareData(this.state.index) : []}
          width={100}
          height={50}
          options={{maintainAspectRatio: true}}
        />
      </Fragment>
    );
  }
};
