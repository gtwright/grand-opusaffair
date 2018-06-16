import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

import './Header.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  }
};

const Header = (props) => (
  <div className={props.classes.root}>
    <AppBar position="sticky">
      <Link to='/'>
        <img src={process.env.PUBLIC_URL + '/img/logo-web-lores.png'} className="App-logo" alt="logo" />
      </Link>
    </AppBar>
  </div>
)

export default withStyles(styles)(Header);
