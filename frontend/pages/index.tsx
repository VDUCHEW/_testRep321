import { CompanyFeed, SearchForm } from '@/home';
import React, { useState } from 'react';

export default function Home() {
  const [criteria, setCriteria] = useState<any>(null);

  const handleSearch = (searchCriteria: any) => {
    setCriteria(searchCriteria);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {criteria && <CompanyFeed criteria={criteria} />}
    </div>
  );
}
