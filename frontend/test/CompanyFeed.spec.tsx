import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CompanyFeed } from '../home/CompanyFeed';
import { SEARCH_COMPANIES } from '@/gql/queries/searchCompanies';
import { LIKE_COMPANY, DELETE_COMPANY } from '@/gql/mutations/company';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

const mockCriteria = {
  headcount: 300,
  headcountFilter: 'greater',
  funding_stage: 'Series C',
  founder_experience: 'Richard Innovations',
};

const mockCompanies = [
  {
    id: 'c019',
    name: 'Virginia Innovations',
    headcount: 556,
    funding_stage: 'Series C',
    liked: null,
    founders: [
      {
        id: 'p818',
        full_name: 'William Caylor',
        past_experience: [
          {
            id: 'c742',
            name: 'Gloria Technologies',
            headcount: 226,
            funding_stage: 'Seed',
          },
          {
            id: 'c341',
            name: 'Henry Dynamics',
            headcount: 597,
            funding_stage: 'Public',
          },
          {
            id: 'c022',
            name: 'Reynaldo Technologies',
            headcount: 883,
            funding_stage: 'Series C',
          },
          {
            id: 'c478',
            name: 'Ricky Dynamics',
            headcount: 91,
            funding_stage: 'Seed',
          },
          {
            id: 'c552',
            name: 'David Solutions',
            headcount: 934,
            funding_stage: 'Seed',
          },
        ],
      },
      {
        id: 'p838',
        full_name: 'Frank Bettendorf',
        past_experience: [
          {
            id: 'c611',
            name: 'Janice Innovations',
            headcount: 803,
            funding_stage: 'Seed',
          },
          {
            id: 'c601',
            name: 'Felipe Dynamics',
            headcount: 766,
            funding_stage: 'Public',
          },
          {
            id: 'c187',
            name: 'Ann Dynamics',
            headcount: 766,
            funding_stage: 'Public',
          },
        ],
      },
      {
        id: 'p716',
        full_name: 'Evie Arena',
        past_experience: [
          {
            id: 'c194',
            name: 'Richard Innovations',
            headcount: 238,
            funding_stage: 'Series A',
          },
          {
            id: 'c190',
            name: 'Heather Innovations',
            headcount: 935,
            funding_stage: 'Series B',
          },
        ],
      },
    ],
  },
];

const mocks = [
  {
    request: {
      query: SEARCH_COMPANIES,
      variables: {
        criteria: mockCriteria,
      },
    },
    result: {
      data: {
        searchCompanies: mockCompanies,
      },
    },
  },
];

describe('CompanyFeed Component', () => {
  it('renders loading state initially', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyFeed criteria={mockCriteria} />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders companies data after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyFeed criteria={mockCriteria} />
      </MockedProvider>
    );

    await screen.findByText('Virginia Innovations');
  });
});

//TODO: complete frontend tests
