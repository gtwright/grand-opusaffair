import React, {Component} from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {Link} from 'react-router-dom';
import Imgix from 'react-imgix';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  titleBar: {
    background:
      'none'
  }
});

class EventList extends Component {
  state = {
    nextPage: true
  }

  scrollToBottom() {
    this.bottom.scrollIntoView({ behavior: 'smooth' });
  }

  render(){

  return (
  <Query
    query={gql`

        query events($limit: Int, $skip: Int){
          events(limit: $limit, skip: $skip) {
            title
            slug
            opus_id
            image_url
            opus_event
          }
        }

    `}
    variables={ {limit: 10, skip: 0} }
    fetchPolicy="cache-and-network"
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, fetchMore, networkStatus }) => {
      if (networkStatus === 4) return "Refetching!";
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      const { classes } = this.props;

      return (
          <div>
            <GridList
              spacing={1}
              className={classes.gridList}
              cols={4}
              >
              {data.events.map(({title, slug, opus_id, image_url, involved, opus_event}, i) => (
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
                      width={600}
                      customParams={{ blend: "222d3d", balph: 60, bm: 'normal' }}
                    />
                  </Link>
                </GridListTile>
              ))}
            </GridList>
            {this.state.nextPage && <Button variant="contained" color="primary" onClick={ () => {
              fetchMore({
                variables: {
                  skip: data.events.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  this.scrollToBottom();
                  if (fetchMoreResult.events.length === 0) {
                    this.setState({nextPage: false});
                    return prev;
                  }

                      return Object.assign({}, prev, {
                        events: [...prev.events, ...fetchMoreResult.events]
                      });
                    }
                  })
                }
            }>Load more</Button>}
            <div ref={el => { this.bottom = el; }} />
          </div>
      );
    }}

  </Query>

)}}

export default withStyles(styles)(EventList);
