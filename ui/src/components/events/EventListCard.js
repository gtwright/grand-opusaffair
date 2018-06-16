import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Imgix from 'react-imgix';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
  titleBar: {
    background: 'none',
    fontFamily: theme.fontFamily
  }
});

const EventListCard = (props) => {

  const {title, slug, opus_id, image_url } = props.event;
  const { classes } = props;

  return (
  <GridListTile key={opus_id} style={{ height: 'auto' }}>
    <Link to={`/events/${slug}`} key={opus_id}>
      <GridListTileBar
        title={title}
        titlePosition="bottom"
        className={classes.titleBar}
      />
      <Imgix
        src={image_url}
        crop={'faces'}
        fit={'crop'}
        height={280}
        width={300}
        customParams={{ blend: "222d3d", balph: 60, bm: 'normal' }}
      />
    </Link>
  </GridListTile>
)};

export default withStyles(styles)(EventListCard);
