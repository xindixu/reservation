import { gql } from "apollo-server-express"
import Team from "./team.js"
import Manager from "./manager.js"
import User from "./user.js"

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION

  ${Team}
  ${Manager}
  ${User}

  type Query {
    _: String!
  }

  type Mutation {
    _: String
  }
`

export default typeDefs
