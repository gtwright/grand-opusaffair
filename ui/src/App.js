import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import Header from './components/Header';
import NotFound from './components/NotFound';

import './App.css';

const theme = createMuiTheme({typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Arial'}
  });

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">

          <Header />

          <Switch>
            <Route exact path="/" component={EventList}/>
            <Route exact path="/events" component={EventList}/>
            <Route path="/events/:slug" component={EventDetail} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
