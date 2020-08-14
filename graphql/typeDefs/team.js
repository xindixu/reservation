import { gql } from "apollo-server-express"

export default gql`
  type Team {
    _id: ID!
    name: String!
    description: String!
    email: String!
    phone: String!
    managers: [Manager!]
  }

  input TeamInput {
    name: String!
    description: String!
    email: String!
    phone: String!
    managerIds: [ID!]
  }

  extend type Query {
    teams: [Team!]
    team(id: ID!): Team!
  }

  extend type Mutation {
    createTeam(teamInput: TeamInput): Team
  }
`