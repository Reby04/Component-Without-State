import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";

import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://192.168.41.253:8080/o/graphql",
  headers: {
    Authorization: "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0Cg=="
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
