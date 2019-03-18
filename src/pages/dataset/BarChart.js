import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarChart extends Component {

  componentDidMount () {
    console.log('Data to plot: ', this.props.data)
  }

  prepareData() {
    const {data} = this.props
    const disallowed = ['kommuneregion', 'periode']

    let allowedLabels = Object.keys(data[0])
      .filter((e) => !disallowed.includes(e))

    return {
      labels: allowedLabels,
      datasets: [
        {
          label: 'Dyr',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: allowedLabels.map(e => data[0][e])
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <h2>Bar Chart example</h2>
        <Bar
          data={this.props.data ? this.prepareData() : []}
          width={100}
          height={50}
          options={{maintainAspectRatio: true}}
        />
      </div>
    );
  }
};
