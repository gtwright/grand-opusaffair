import React, {Component} from "react";
import gql from "graphql-tag";
import queryString from 'query-string';

import EventList from './EventList';

class EventListView extends Component {

  render(){
    const parsed = queryString.parse(this.props.location.search);
    const choice = ['events','popularEvents','pastEvents', 'updatedEvents'];

    const query = gql`
        query ($limit: Int, $skip: Int){
          events: ${choice[3]}(limit: $limit, skip: $skip) {
            title
            slug
            opus_id
            image_url
            opus_event
          }
        }
    `

    return (
      <EventList query={query} variables={parsed}/>
    )
  }
}

export default EventListView;
