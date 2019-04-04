import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProver, ApolloProvider} from 'react-apollo';

//components
import BookList from './components/booklist';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Books list</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
