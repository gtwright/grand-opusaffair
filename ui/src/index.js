import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI
})

const Main = () => (
    <Router>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
    </Router>
)

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
