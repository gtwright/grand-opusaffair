import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

const Header = ({classes}) => (

      <AppBar position="sticky">
        <div className={classes.navContainer}>

            <Link to='/'>
              <img src={process.env.PUBLIC_URL + '/img/logo-web-lores.png'} className={classes.appLogo} alt="logo" />
            </Link>

        </div>
      </AppBar>

)

const styles = (theme) => ({
  appLogo: {
    height: 25,
    padding: 9,
  },
  navContainer: {
    maxWidth: theme.appContainer.maxWidth,
  },
});

export default withStyles(styles, { withTheme: true })(Header);
