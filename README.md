# GRANDstack Starter

This project is a starter for building a [GRANDstack](https://grandstack.io) (GraphQL, React, Apollo, Neo4j Database) application. There are two components to the starter, the UI application (a React app) and the API app (GraphQL server).

Find the full [GRANDstack starter repo here](https://github.com/grand-stack/grand-stack-starter).

#Opus Affair and Neo4j

We've been using Neo4j on the [Opus Affair](https://www.opusaffair.com) site for several years. The current site uses Python/Flask and Neomodel. Our goal is showcase the people who are involved in creating arts and culture events, so our database mainly consists of People, Events, Venues, and Organizations. To make things a little more interesting, we also use Neo4j for real time recommendations, for events that are either based on overall popularity of an event or personalized for a user. Those recommendations are based on which users a person follows and their own connections to events.

Since most of our events are from classical music, theater, and dance, it's fairly common to see some of hte same freelance performers popping up across town in projects associated with many different organizations. We wanted to make it easier to keep track of collaborations.

#Why GRAND?

We've wanted to overhaul the site for a while. We love Neo4j, but were pretty ready to change everything else. GRAND seems like a good fit. This repo is a quick, hacky attempt to see how GRAND could work for us.
