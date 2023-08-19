import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Company {
    id: String!
    name: String!
    headcount: Int!
    funding_stage: String!
    liked: Boolean
    founders: [Founder!]!
  }

  type Founder {
    id: ID!
    full_name: String!
    past_experience: [PastExperience!]!
  }

  type PastExperience {
    id: ID!
    name: String!
    headcount: Int!
    funding_stage: String!
  }

  input SearchCriteria {
    founder_experience: String
    headcount: Int
    headcountFilter: String
    funding_stage: String
  }

  type Query {
    searchCompanies(criteria: SearchCriteria): [Company!]!
  }

  type Mutation {
    likeCompany(companyId: String!): Company!
    deleteCompany(companyId: String!): Company!
  }
`;
