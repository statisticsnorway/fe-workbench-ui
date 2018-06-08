import _ from 'lodash'
import React from 'react'
import { Button, Icon, Modal, Search, Segment } from 'semantic-ui-react'
import '../../assets/css/site.css'
import sjofart_logo from '../../assets/sjofart.jpg'
import skatteetaten_logo from '../../assets/skatteetaten.png'

const suppliers = [
  {
    title: 'SDIR',
    description: 'Sjøfart',
    image: sjofart_logo
  },
  {
    title: 'SERIUS',
    description: 'Skatteetaten',
    image: skatteetaten_logo
  }
]

class Supplier extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openModal: false,
      activeItem: 'MyDecks',
      activeTrap: false,
      selectedSupplier: ''
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.unmountTrap = this.unmountTrap.bind(this)
  }

  resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

  handleResultSelect = (e, {result}) => {
    console.log(result)

    this.props.onSearchSupplier(result)
    this.setState({value: result.title})
  }

  handleSearchChange = (e, {value}) => {
    this.setState({isLoading: true, value})

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(suppliers, isMatch)
      })
    }, 300)
  }

  handleOpen () {
    this.setState({
      modalOpen: true,
      activeTrap: true
    })
  }

  handleClose () {
    this.setState({
      modalOpen: false,
      activeTrap: false
    })
  }

  handleAccept = () => {
    this.setState({
      modalOpen: false,
      activeTrap: false
    })
  }

  unmountTrap () {
    if (this.state.activeTrap) {
      this.setState({activeTrap: false})
    }
  }

  render () {
    const {isLoading, value, results} = this.state

    return (
      <Modal trigger={
        <Button icon aria-label='Open' data-tooltip='Søk leverandør'
                aria-hidden={this.state.modalOpen}
                basic onClick={this.handleOpen}><Icon name='ellipsis horizontal' />
        </Button>
      }
             open={this.state.modalOpen}
             onClose={this.handleClose}
             size='small'
             className='container'
             role='dialog'
             id='exampleModal'
             tabIndex='0'>
        <Modal.Header className='ui center aligned' as='h1' id='exampleModalHeader'>
          Leverandør
        </Modal.Header>
        <Modal.Content>
          <Segment color='blue' textAlign='center' padded>
            <Segment.Group horizontal>
              <Segment textAlign='left'>
                <Search
                  input={{fluid: true}}
                  ref={(ref) => this.search = ref}
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                  results={results}
                  value={value}
                />
              </Segment>
              <Segment textAlign='left' compact>
                <Modal.Actions>
                  <Button color='green' tabIndex='0' type='button' aria-label='Accept' data-tooltip='Select leverandør'
                          onClick={this.handleAccept}>
                    Select
                  </Button>
                  <Button color='red' tabIndex='0' type='button' aria-label='Cancel' data-tooltip='Cancel'
                          onClick={this.handleClose}>
                    Cancel
                  </Button>
                </Modal.Actions>
              </Segment>
            </Segment.Group>
          </Segment>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Supplier

