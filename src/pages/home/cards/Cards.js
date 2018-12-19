import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Icon } from 'semantic-ui-react'

const cards = [
  {
    linkTo: '/home/gsim',
    image: 'puzzle',
    header: {
      en: 'GSIM domains',
      nb: 'GSIM domener'
    },
    subheader: {
      en: 'Something',
      nb: 'Noe'
    },
    description: {
      en: 'Description',
      nb: 'Beskrivelse'
    },
    bottom: {
      en: 'Something more',
      nb: 'Noe mer'
    }
  },
  {
    linkTo: '/home/tasks',
    image: 'tasks',
    header: {
      en: 'My tasks',
      nb: 'Mine oppgaver'
    },
    subheader: {
      en: 'Something',
      nb: 'Noe'
    },
    description: {
      en: 'Description',
      nb: 'Beskrivelse'
    },
    bottom: {
      en: 'Something more',
      nb: 'Noe mer'
    }
  }
]

class Cards extends Component {
  render () {
    const {languageCode} = this.props

    return (
      <Card.Group centered>
        {cards.map((card, index) => {
          return (
            <Card key={index} as={Link} to={card.linkTo}>
              <Container textAlign='center' style={{padding: '0.7rem'}}>
                <Icon name={card.image} size='massive' />
              </Container>
              <Card.Content>
                <Card.Header>{card.header[languageCode]}</Card.Header>
                <Card.Meta>{card.subheader[languageCode]}</Card.Meta>
                <Card.Description>{card.description[languageCode]}</Card.Description>
              </Card.Content>
              <Card.Content extra>{card.bottom[languageCode]}</Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    )
  }
}

export default Cards
