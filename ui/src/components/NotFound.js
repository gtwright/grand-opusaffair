import React from 'react'
import {withStyles} from '@material-ui/core/styles';

const NotFound = ({classes}) => (
  <div className={classes.notFound}>
    <h1>404</h1>
  </div>
)

const styles = {
  notFound: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  }
};

export default withStyles(styles)(NotFound);
