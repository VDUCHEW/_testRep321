import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_COMPANIES } from '@/gql/queries/searchCompanies';
import { LIKE_COMPANY, DELETE_COMPANY } from '@/gql/mutations/company';
import { Pagination } from './Pagination';
import styles from '../styles/CompanyFeed.module.css';

export const CompanyFeed = ({ criteria }: { criteria: any }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [likedCompanies, setLikedCompanies] = useState<string[]>([]);
  const [removedCompanies, setRemovedCompanies] = useState<string[]>([]);
  const [showLikedCard, setShowLikedCard] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [criteria]);

  useEffect(() => {
    if (likedCompanies.length === 0) {
      setShowLikedCard(false);
      setCurrentPage(1);
    }
  }, [likedCompanies]);

  const { loading, error, data } = useQuery(SEARCH_COMPANIES, {
    variables: { criteria },
    fetchPolicy: 'cache-and-network',
  });

  const [likeCompany] = useMutation(LIKE_COMPANY);
  const [removeCompany] = useMutation(DELETE_COMPANY);

  const PAGE_SIZE = 2;
  const offset = (currentPage - 1) * PAGE_SIZE;
  const shouldShowLikedCheckbox = likedCompanies.length > 0;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleLike = async (id: string) => {
    try {
      await likeCompany({ variables: { companyId: id } });
      setLikedCompanies([...likedCompanies, id]);
    } catch (error) {
      console.error('Error liking company:', error);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeCompany({ variables: { companyId: id } });
      setLikedCompanies((prevLikedCompanies) =>
        prevLikedCompanies.filter((companyId) => companyId !== id)
      );
      setRemovedCompanies([...removedCompanies, id]);
    } catch (error) {
      console.error('Error removing company:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const companies = showLikedCard
    ? data.searchCompanies
        .filter((company: any) => likedCompanies.includes(company.id))
        .slice(offset, offset + PAGE_SIZE)
    : data.searchCompanies
        .filter(
          (company: any) =>
            !likedCompanies.includes(company.id) && !removedCompanies.includes(company.id)
        )
        .slice(offset, offset + PAGE_SIZE);

  const totalPages = Math.ceil(
    (showLikedCard
      ? data.searchCompanies.filter((company: any) => likedCompanies.includes(company.id))
      : data.searchCompanies.filter(
          (company: any) =>
            !likedCompanies.includes(company.id) && !removedCompanies.includes(company.id)
        )
    ).length / PAGE_SIZE
  );

  return (
    <>
      <div className={styles.companyFeed}>
        {companies.map((company: any) => (
          <div className={styles.companyCard} key={company.id}>
            <h3 className={styles.companyCardTitle}>{company.name}</h3>
            <p className={styles.companyCardText}>Headcount: {company.headcount}</p>
            <p className={styles.companyCardText}>Funding Stage: {company.funding_stage}</p>
            <div className={styles.companyCardFounders}>
              <h4>Founders:</h4>
              <ul>
                {company.founders.map((founder: any) => (
                  <li key={founder.id}>{founder.full_name}</li>
                ))}
              </ul>
            </div>
            <div className={styles.companyCardPastExperience}>
              <h4>Past Experience:</h4>
              <ul>
                {company.founders.map((founder: any) =>
                  founder.past_experience.map((experience: any) => (
                    <li key={experience.id}>{experience.name}</li>
                  ))
                )}
              </ul>
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.likeButton} ${
                  likedCompanies.includes(company.id) ? styles.likedButton : ''
                }`}
                onClick={() => handleLike(company.id)}
                disabled={likedCompanies.includes(company.id)}
              >
                {likedCompanies.includes(company.id) ? 'You liked this company!' : 'Like'}
              </button>
              <button className={styles.removeButton} onClick={() => handleRemove(company.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {shouldShowLikedCheckbox && (
        <div className={styles.likeCheckBox}>
          <label>
            <input
              type="checkbox"
              checked={showLikedCard}
              onChange={(e) => setShowLikedCard(e.target.checked)}
            />
            Show Liked Companies
          </label>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handleChangePage}
      />
    </>
  );
};
