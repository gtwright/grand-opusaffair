import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Imgix from 'react-imgix';
import {withStyles} from '@material-ui/core/styles';
import Involvement from './Involved.js';
import Loading from '../Loading';
import NotFound from '../NotFound';

const EventDetail = (props) => {
  const slug = props.match.params.slug;
  const {classes, theme} = props;

  return <Query
    query={gql`
      query event($slug: String!){
        event(slug: $slug) {
          title
          organizer_desc
          opus_desc
          image_url
          opus_id
          involvement{
            user{
              username
              name_full
            }
            role
          }
        }
      }
    `}
    variables={{slug}}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <p>Error</p>;
      if (!data.event) return <NotFound />;
      const e = data.event;


      return (
        <div className={classes.container}>
          <div>
          <Imgix src={e.image_url} type="picture">
            <Imgix
              src={e.image_url}
              width={1200}
              height={400}
              type="source"
              crop={'faces'}
              fit={'crop'}
              imgProps={{ media: `(min-width: ${theme.breakpoints.values.lg}px)` }}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt:`${e.title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 42 }}
            />
            <Imgix
              src={e.image_url}
              width={1000}
              height={400}
              type="source"
              crop={'faces'}
              fit={'crop'}
              imgProps={{ media: `(min-width: ${theme.breakpoints.values.md}px)` }}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt: `${e.title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 20 }}
            />
            <Imgix
              src={e.image_url}
              width={800}
              height={400}
              type="source"
              crop={'faces'}
              fit={'crop'}
              imgProps={{ media: `(min-width: ${theme.breakpoints.values.sm}px)` }}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt: `${e.title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 20 }}
            />
            <Imgix
              src={e.image_url}
              width={300}
              height={300}
              type="source"
              crop={'faces'}
              fit={'crop'}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt: `${e.title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 20 }}
              imgProps={{ media: `(min-width: ${theme.breakpoints.values.xs}px)` }}
            />
            <Imgix
              src={e.image_url}
              type="img"
              crop={'faces'}
              fit={'crop'}
              customParams={{ blend: "222d3d", balph: 60, bm: 'normal', txt: `${e.title}`, txtalign: "middle,center", txtclr: "ffffff", txtsize: 20 }}
            />
          </Imgix>
          </div>
          <div>
            <h1>{e.title}</h1>
            <h3>{e.opus_desc}</h3>
            <p>{e.organizer_desc}</p>
            {e.involvement && <ul>
              {e.involvement.map( (i) => <Involvement inv={i} key={i.user.username}/> )}
            </ul>}
          </div>
        </div>
      );
    }}
  </Query>
};

const styles = theme => ({
  container: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});

export default withStyles(styles, {withTheme:true})(EventDetail);
