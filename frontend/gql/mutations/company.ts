import { gql } from '@apollo/client';

export const LIKE_COMPANY = gql`
  mutation LikeCompany($companyId: String!) {
    likeCompany(companyId: $companyId) {
      id
      name
      headcount
      funding_stage
      liked
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

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($companyId: String!) {
    deleteCompany(companyId: $companyId) {
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
