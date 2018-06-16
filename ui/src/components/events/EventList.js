import React, {Component} from "react";
import { Query } from "react-apollo";

import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import Loading from '../Loading';
import EventListCard from './EventListCard';

class EventList extends Component {
  state = {
    nextPage: true
  }

  scrollToBottom() {
    this.bottom.scrollIntoView({ behavior: 'smooth' });
  }

  render(){

  const {query, variables, theme} = this.props;

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

      return (
          <div styles={theme.appContainer}>
            <GridList
              spacing={1}
              cols={4}
              >
              {data.events.map((event, i) => (
                <EventListCard event={event} key={i}/>
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

const styles = {}

export default withStyles(styles, {withTheme: true})(EventList) ;
