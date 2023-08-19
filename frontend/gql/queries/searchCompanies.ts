import { gql } from '@apollo/client';

export const SEARCH_COMPANIES = gql`
  query SearchCompanies($criteria: SearchCriteria) {
    searchCompanies(criteria: $criteria) {
      id
      name
      headcount
      funding_stage
      founders {
        id
        full_name
        past_experience {
          id
          name
          headcount
          funding_stage
        }
      }
    }
  }
`;
