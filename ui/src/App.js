import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';
import EventListView from './components/events/EventListView';
import EventDetail from './components/events/EventDetail';
import Header from './components/Header';
import NotFound from './components/NotFound';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">

          <Header />

          <Switch>
            <Route exact path="/" component={EventListView}/>
            <Route exact path="/events" component={EventListView}/>
            <Route path="/events/:slug" component={EventDetail} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
