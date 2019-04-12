import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import DatasetView from '../dataset/DatasetView'
import HomeMenu from './HomeMenu'
import SearchPage from '../search/SearchPage'
import Dashboard from '../collection/Dashboard'
import CollectionSetup from '../collection/CollectionSetup'
import PrepAnalsysis from '../prep_and_analysis/PrepAnalsysis'
import PrepAnalysisSetup from '../prep_and_analysis/PrepAnalysisSetup'
import MethodLibrary from '../prep_and_analysis/MethodLibrary'
import Import from '../metadata/Import'
import GsimBrowser from '../metadata/GsimBrowser'
import WorkbenchSidebar from '../../menu/WorkbenchSidebar'
import { Button, Grid, Icon, Segment, Sidebar } from 'semantic-ui-react'
import AccessControlRoute from '../../utilities/security/AccessControlRoute'
import NoAccess from '../../utilities/security/NoAccess'

import ApolloClient, { InMemoryCache } from 'apollo-boost'

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../search/fragmentTypes.json';

// Some queries contain union or interface types, so Apollo Client's simple (heuristic) fragment matcher can not
// be used. See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const cache = new InMemoryCache({ fragmentMatcher });
class Home extends Component {

  state = {
    animation: 'push',
    direction: 'left',
    visible: true,
  }

  // Prevent scrollbar for main window
  componentWillMount() {
    document.body.style.overflow = "hidden";
  }

  handleAnimationChange = () => () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { handleLogout, graphqlURL, ...user} = this.props
    const { animation, direction, visible } = this.state
    const client = new ApolloClient({
      uri: graphqlURL,
      cache: cache
    });

    return (
      <div>
        <HomeMenu handleLogout={handleLogout} client={client}/>
        <div style={{marginTop: '4.5em', height: '100vh'}}>
          <Sidebar.Pushable as={Segment}>
            <Button style={{position: 'fixed', top: '15px', left: '15px', zIndex: 3}} fixed='top' icon onClick={this.handleAnimationChange()}>
              <Icon name='bars'/>
            </Button>
            <WorkbenchSidebar
              style={{zIndex: 4}}
              animation={animation}
              direction={direction}
              visible={visible}
              closeCallback={this.handleAnimationChange()}
              user={user}
            />
            <Sidebar.Pusher dimmed={false}>
              <Grid stretched centered style={{paddingTop: '15px'}}>
                <Grid.Row>  {/*Main row for layout*/}
                  <Grid.Column floated='left' width={1}> {/*Left padding column*/}
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <AccessControlRoute user={user} client={client} path='/search' component={SearchPage} />
                    <AccessControlRoute user={user} path='/dataset' component={DatasetView} />
                    <AccessControlRoute user={user} path='/collection/dashboard' component={Dashboard} />
                    <AccessControlRoute user={user} path='/collection/setup' component={CollectionSetup} />
                    <AccessControlRoute user={user} path='/prep/analysis' component={PrepAnalsysis} />
                    <AccessControlRoute user={user} path='/prep/setup' component={PrepAnalysisSetup} />
                    <AccessControlRoute user={user} path='/prep/methodlibrary' component={MethodLibrary} />
                    <AccessControlRoute user={user} path='/metadata/import' component={Import} />
                    <AccessControlRoute user={user} path='/metadata/gsimbrowser' component={GsimBrowser} />
                    <Route user={user}  path='/noaccess' component={NoAccess} />
                  </Grid.Column>
                  <Grid.Column floated='right' width={1}> {/*Right padding column*/}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    )
  }
}

export default Home
