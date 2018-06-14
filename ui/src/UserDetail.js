import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import queryString from 'query-string';

import './UserDetail.css';

const UserDetail = (props) => {
  const id = props.match.params.id;
  console.log(props.match);
  console.log(props.location.search);
  const parsed = queryString.parse(props.location.search);
  console.log(parsed);
  return <Query
    query={gql`
      query user($id: ID!){
        user(id: $id) {
          name
          id
        }
      }
    `}
    variables={{id}}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.user) return <p>No user found</p>;
      if (error) return <p>Error</p>;

      return (
        <div className="UserDetail">
          <h1>User: {data.user.name}</h1>
        </div>
      );
    }}
  </Query>
};

export default UserDetail;
