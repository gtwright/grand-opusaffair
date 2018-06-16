import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

const Header = ({classes, theme}) => (
    <div style={theme.root}>
      <AppBar position="sticky">
        <div style={theme.appContainer}>
          <Link to='/'>
            <img src={process.env.PUBLIC_URL + '/img/logo-web-lores.png'} className={classes.appLogo} alt="logo" />
          </Link>
        </div>
      </AppBar>
    </div>
)

const styles = {
  appLogo: {
    height: 25,
    alignContent: 'center',
    padding: 9,
  }
};

export default withStyles(styles, { withTheme: true })(Header);
