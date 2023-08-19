export interface PastExperience {
  id: string;
  name: string;
  headcount: number;
  funding_stage: string;
}

export interface Founder {
  id: string;
  full_name: string;
  past_experience: PastExperience[];
}

export interface Company {
  id: string;
  name: string;
  headcount: number;
  funding_stage: string;
  liked?: boolean;
  founders: Founder[];
}

export interface SearchCriteria {
  headcount: number;
  headcountFilter?: string;
  funding_stage?: string;
  founder_experience?: string;
}

export interface Query {
  searchCompanies(criteria: SearchCriteria): Company[];
}
