import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({classes}) => (
  <div className={classes.loading}>
    <CircularProgress />
  </div>
)

const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  }
};

export default withStyles(styles)(Loading);
