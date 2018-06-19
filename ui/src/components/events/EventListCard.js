import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Imgix from 'react-imgix';
import Grid from '@material-ui/core/Grid';

const EventListCard = (props) => {

  const {title, slug, opus_id, image_url } = props.event;
  const { classes, theme } = props;

  return (
  <Grid item lg={3} md={4} sm={6} xs={12} key={opus_id} className={classes.card}>
      <Link to={`/events/${slug}`}>

          <Imgix src={image_url} type="picture">
            <Imgix
              src={image_url}
              width={294}
              height={340}
              type="source"
              crop={'faces'}
              fit={'crop'}
              imgProps={{ media: `(min-width: ${theme.breakpoints.values.lg}px)` }}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt:`${title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 42 }}
            />
            <Imgix
              src={image_url}
              width={393}
              height={336}
              type="source"
              crop={'faces'}
              fit={'crop'}
              imgProps={{ media: `(min-width: ${theme.breakpoints.values.md}px)` }}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt: `${title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 20 }}
            />
            <Imgix
              src={image_url}
              width={475}
              height={348}
              type="source"
              crop={'faces'}
              fit={'crop'}
              imgProps={{ media: `(min-width: ${theme.breakpoints.values.sm}px)` }}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt: `${title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 20 }}
            />
            <Imgix
              src={image_url}
              width={574}
              height={512}
              type="source"
              crop={'faces'}
              fit={'crop'}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt: `${title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 20 }}
              imgProps={{ media: `(min-width: ${theme.breakpoints.values.xs}px)` }}
            />
            <Imgix
              src={image_url}
              type="img"
              crop={'faces'}
              fit={'crop'}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt: `${title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 20 }}
            />
          </Imgix>

      </Link>

  </Grid>
)};

const styles = theme => ({
  card: {
    padding: '0 4px 0 4px',
    overflow:'hidden'
  }
});

export default withStyles(styles, {withTheme: true})(EventListCard);
