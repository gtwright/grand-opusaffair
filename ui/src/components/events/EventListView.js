import React, {Component} from "react";
import gql from "graphql-tag";

import EventList from './EventList';
import EventSelectors from './EventSelectors'

class EventListView extends Component {

  state = {
    view: 'events',
  }

  handleViewChange = (view) => {
    console.log(view);
    this.setState({
      view
    })
  }

  render(){

    const query = gql`
        query ($limit: Int, $skip: Int){
          events: ${this.state.view}(limit: $limit, skip: $skip) {
            title
            slug
            opus_id
            image_url
            opus_event
          }
        }
    `

    return (
      <div>
        <EventSelectors view={this.state.view} onViewChange={this.handleViewChange} location={this.props.location} />
        <EventList query={query} />
      </div>
    )
  }
}

export default EventListView;
