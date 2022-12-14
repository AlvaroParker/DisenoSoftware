import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import Navbar from "./Navbar";

const client = new ApolloClient({
  uri: 'http://localhost:8090/graphql',
  cache: new InMemoryCache()
})
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <Navbar></Navbar>
    <App />
  </ApolloProvider>
);

reportWebVitals();
