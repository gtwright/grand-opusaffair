import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import UserList from './UserList';
import UserDetail from './UserDetail';
import Header from './Header';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Header />

        <Switch>
          <Route exact path="/" component={UserList}/>
          <Route exact path="/users" component={UserList}/>
          <Route path="/users/:id" component={UserDetail} />
        </Switch>

      </div>
    );
  }
}

export default App;
