import { neo4jgraphql } from "neo4j-graphql-js";

const resolvers = {
  Query: {
    users: neo4jgraphql,
    user: neo4jgraphql,
    event: neo4jgraphql,
    events(_, params, ctx) {
      let session = ctx.driver.session();
      console.log(params);
      let query = `
        MAtch (v:Venue)
        WITH v,point({latitude: $lat, longitude: $lng}) as boston
        WHERE distance(boston,point({latitude:v.latitude, longitude: v.longitude})) < $radius
        MATCH (v)--(event:Event)
        WHERE event.end_datetime >= $start AND event.start_datetime <= $end
        AND event.title contains $title AND event.published = True
        RETURN event
        ORDER BY event.start_datetime ASC
        SKIP $skip
        LIMIT $limit`
      return session.run(query, params)
        .then( result => { return result.records.map(record => { return record.get("event").properties })})
    },
    popularEvents(_, params, ctx) {
      let session = ctx.driver.session();
      console.log(params);
      let query = `
        MAtch (v:Venue)
        WITH v,point({latitude: $lat, longitude: $lng}) as boston
        WHERE distance(boston,point({latitude:v.latitude, longitude: v.longitude})) < $radius
        MATCH (v)--(event:Event)
        WHERE event.end_datetime >= $start AND event.start_datetime <= $end AND event.title contains $title
        Optional MATCH pe=((event)-[r1:INVOLVED_IN|ATTENDING|INTERESTED_IN]-(u:User))
  			Optional MATCH (event)<-[inv:INVOLVED_IN]-(u)
  			Optional MATCH (event)<-[int:INTERESTED_IN]-(u)
  			Optional MATCH (event)<-[att:ATTENDING]-(u)
  			RETURN distinct event, 0.25*event.view_count + sum(distinct reduce(weight = 0, r in relationships(pe) | weight + r.weight + u.follower_count ))^2 as total,
  			1000*count(distinct inv)+300*count(distinct att)+100*count(distinct int) + event.view_count + 10*sum(distinct reduce(weight = 0, r1 in relationships(pe) | weight + u.follower_count)) as pop
  			ORDER BY pop DESC
        SKIP $skip
        LIMIT $limit`
      return session.run(query, params)
        .then( result => { return result.records.map(record => { return record.get("event").properties })})
    }
  },
  Event: {
    involved: (obj, params, ctx) => {
      let session = ctx.driver.session();
      params.opus_id = obj.opus_id;
      let query = `
        MATCH (event:Event)
        WHERE event.opus_id = $opus_id
        MATCH (event)-[r:INVOLVED_IN]-(user:User)
        RETURN user
        SKIP $skip
        LIMIT $limit
      `;
      return session.run(query, params)
        .then(  result => { return result.records.map(  record => { return record.get("user").properties })})
    },
    involvement: (obj, params, ctx) => {
      let session = ctx.driver.session();
      params.opus_id = obj.opus_id;
      let query = `
        MATCH (event:Event)
        WHERE event.opus_id = $opus_id
        MATCH (event)-[rel:INVOLVED_IN]-(user:User)
        RETURN user, rel
        SKIP $skip
        LIMIT $limit
      `;
      return session.run(query, params)
        .then(  result => { return result.records.map(  record => {
          return Object.assign({"user":record.get("user").properties}, record.get("rel").properties)
        })})
    }
  }
};

export default resolvers;
