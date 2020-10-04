import React from "react"
import ReactDOM from "react-dom"
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { ConfigProvider } from "antd"
import zh_CN from "antd/es/locale/zh_CN"
import { UserContextProvider } from "./contexts/user-context"

import "antd/dist/antd.css"
import "./tailwind.css"
import * as serviceWorker from "./serviceWorker"
import App from "./App"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  typeDefs: gql`
    enum Role {
      CLIENT
      MANAGER
      ADMIN
    }
  `,
})

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <ApolloProvider client={client}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ApolloProvider>
  </ConfigProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
