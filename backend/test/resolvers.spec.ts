import resolvers from '../resolvers';
import { company_data } from '../data';
import { founderLoader } from '../resolvers';

describe('Resolvers', () => {
  describe('Query.searchCompanies', () => {
    it('should return filtered companies based on search criteria', () => {
      const mockContext = {
        criteria: {
          headcount: 300,
          headcountFilter: 'greater',
          funding_stage: 'Series C',
          founder_experience: 'Richard Innovations',
        },
        loaders: {
          founderLoader,
        },
      };

      const result = resolvers.Query.searchCompanies({}, mockContext);
      const expected = [
        {
          id: 'c019',
          name: 'Virginia Innovations',
          headcount: 556,
          funding_stage: 'Series C',
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

      expect(result).toEqual(expected);
    });
  });
  describe('Mutation.likeCompany', () => {
    it('should successfully like a company', () => {
      const mockContext = {
        loaders: {
          founderLoader,
        },
        companyId: 'c001',
      };

      const result = resolvers.Mutation.likeCompany({}, mockContext);
      const expected = {
        id: 'c001',
        name: 'Russell Dynamics',
        headcount: 745,
        funding_stage: 'Series A',
        liked: true,
        founders: [
          {
            id: 'p121',
            full_name: 'Brigette Philips',
            past_experience: [
              {
                id: 'c878',
                name: 'Erika Innovations',
                headcount: 214,
                funding_stage: 'Seed',
              },
            ],
          },
        ],
      };

      expect(result).toEqual(expected);
    });

    it('should throw an error if company is not found', () => {
      const mockContext = {
        loaders: {
          founderLoader,
        },
        companyId: 'invalid_id',
      };

      expect(() => {
        resolvers.Mutation.likeCompany({}, mockContext);
      }).toThrowError('Company not found');
    });
  });
  describe('Mutation.deleteCompany', () => {
    it('should successfully delete a company', () => {
      const mockContext = {
        loaders: {
          founderLoader,
        },
        companyId: 'c001',
      };

      const initialCompanyCount = company_data.length;

      const result = resolvers.Mutation.deleteCompany({}, mockContext);

      const expectedDeletedCompany = {
        id: 'c001',
        name: 'Russell Dynamics',
        headcount: 745,
        funding_stage: 'Series A',
        liked: true,
        founders: [
          {
            id: 'p121',
            full_name: 'Brigette Philips',
            past_experience: [
              {
                id: 'c878',
                name: 'Erika Innovations',
                headcount: 214,
                funding_stage: 'Seed',
              },
            ],
          },
        ],
      };

      expect(result).toEqual(expectedDeletedCompany);

      const remainingCompanyIds = company_data.map((company) => company.id);
      expect(remainingCompanyIds).not.toContain('c001');

      const finalCompanyCount = company_data.length;
      expect(finalCompanyCount).toEqual(initialCompanyCount - 1);
    });

    it('should throw an error if company is not found', () => {
      const mockContext = {
        loaders: {
          founderLoader,
        },
        companyId: 'invalid_id',
      };

      expect(() => {
        resolvers.Mutation.deleteCompany({}, mockContext);
      }).toThrowError('Company not found');
    });
  });
});
