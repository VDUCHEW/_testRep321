import { company_data } from './data';
import { Founder, PastExperience, SearchCriteria, Company } from './types/company';
import DataLoader from 'dataloader';

export const founderLoader = new DataLoader<string, Founder | null>(async (ids) => {
  const founders = company_data.flatMap((company) => company.founders);
  return ids.map((id) => founders.find((founder) => founder.id === id) || null);
});

export default {
  Query: {
    searchCompanies: (_: any, { criteria }: { criteria: SearchCriteria }) => {
      return company_data.filter((company) => {
        const founderExperienceValid =
          !criteria.founder_experience ||
          company.founders.some((founder: Founder) =>
            founder.past_experience.some(
              (experience: PastExperience) => experience.name === criteria.founder_experience
            )
          );

        const headcountValid =
          !criteria.headcount ||
          (criteria.headcountFilter === 'greater' && company.headcount > criteria.headcount) ||
          (criteria.headcountFilter === 'less' && company.headcount < criteria.headcount);

        const fundingStageValid =
          !criteria.funding_stage || company.funding_stage === criteria.funding_stage;

        return founderExperienceValid && headcountValid && fundingStageValid;
      });
    },
  },
  Mutation: {
    likeCompany: (_: any, { companyId }: { companyId: string }) => {
      const likedCompanyIndex = company_data.findIndex((company) => company.id === companyId);
      if (likedCompanyIndex !== -1) {
        const likedCompany = { ...company_data[likedCompanyIndex], liked: true };
        company_data[likedCompanyIndex] = likedCompany;
        return likedCompany;
      }
      throw new Error('Company not found');
    },
    deleteCompany: (_: any, { companyId }: { companyId: string }) => {
      const deletedCompanyIndex = company_data.findIndex((company) => company.id === companyId);
      if (deletedCompanyIndex !== -1) {
        const deletedCompany = company_data.splice(deletedCompanyIndex, 1)[0];
        return deletedCompany;
      }
      throw new Error('Company not found');
    },
  },
  Company: {
    founders: (parent: Company) =>
      founderLoader.loadMany(parent.founders.map((founder) => founder.id)),
  },
};
