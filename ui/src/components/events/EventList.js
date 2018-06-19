import React, {Component} from "react";
import { Query } from "react-apollo";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import Loading from '../Loading';
import EventListCard from './EventListCard';

class EventList extends Component {
  state = {
    nextPage: true
  }

  scrollToBottom() {
    this.bottom.scrollIntoView({ behavior: 'smooth' });
  }

  updateSearch = (obj) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), obj))
    });
  }

  render(){

  const {query, variables } = this.props;

  return (
  <Query
    query={query}
    variables={ variables }
    fetchPolicy="cache-and-network"
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, fetchMore, networkStatus }) => {
      if (networkStatus === 4) return "Refetching!";
      if (loading) return <Loading />;
      if (error) return <p>Error</p>;

      const {classes} = this.props;

      return (
        <div className={classes.container}>
          <div className={classes.grid}>
            <Grid container>
              {data.events.map((event, i) => (
                <EventListCard event={event} key={event.opus_id}/>
              ))}
            </Grid>
          </div>
          <div className={classes.buttonRow}>
            {this.state.nextPage && <Button variant="contained" color="primary" onClick={ () => {
              fetchMore({
                variables: {
                  skip: data.events.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  this.scrollToBottom();
                  this.updateSearch({limit:data.events.length+fetchMoreResult.events.length});
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
        </div>
      );
    }}

  </Query>

)}}

const styles = theme => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  grid: {
    maxWidth: theme.appContainer.maxWidth,
    alignSelf: 'center'
  },
  buttonRow: {
    alignSelf: 'center'
  }
});

export default withStyles(styles, {withTheme: true})(withRouter(EventList)) ;
