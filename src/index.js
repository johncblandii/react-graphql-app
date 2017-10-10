// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'

import {AppShell} from './shell';

import {store, routerHistory, initializeData} from './redux';
import {CourseView, HomeView, StudentView} from './views';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: {
    type: 'light'
  }
});

ReactDOM.render(
  <Provider store={store}>
  <MuiThemeProvider theme={theme}>
    <ConnectedRouter history={routerHistory}>
      <AppShell title={'React GraphQL App'}>
        <Route exact path="/" component={HomeView}/>
        <Route path="/students" component={StudentView}/>
        <Route path="/courses" component={CourseView}/>
      </AppShell>
    </ConnectedRouter>
  </MuiThemeProvider>
</Provider>, document.getElementById('root'));

registerServiceWorker();

// Initialize the app data
store.dispatch(initializeData());
