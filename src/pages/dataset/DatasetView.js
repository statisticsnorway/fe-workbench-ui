import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'

import VisualToggler from './VisualToggler'
import { METADATA } from '../../utilities/enum'

class DatasetView extends Component {
  render () {
    const {languageCode, location: {state: {dataset}}} = this.props
    // const {state} = location
    // const {dataset} = state

    return (
      <Segment basic>
        <Grid stretched>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <div>
                <h1>{dataset.title}</h1>
                <b>{METADATA.DESCRIPTION[languageCode]}:</b> {dataset.description}<br />
                <b>{METADATA.CREATED_DATE[languageCode]}:</b> {new Intl.DateTimeFormat(languageCode,
                {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit'
                }).format(dataset.created)}<br />
                <b>{METADATA.NO_OF_ROWS[languageCode]}:</b> {new Intl.NumberFormat(languageCode,
                {maximumSignificantDigits: 3}).format(dataset.rows)}<br />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <VisualToggler data={dataset.data} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default DatasetView