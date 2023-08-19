import { useEffect } from 'react';
import styles from '../styles/CompanyFeed.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ currentPage, totalPages, onChangePage }) => {
  useEffect(() => {
    if (currentPage > totalPages) {
      onChangePage(totalPages);
    }
  }, [currentPage, onChangePage, totalPages]);

  const pages = totalPages > 0 ? Array.from({ length: totalPages }, (_, index) => index + 1) : [];

  const handleChangePage = (page: number) => {
    onChangePage(page);
  };

  if (pages.length === 0) {
    return null;
  }

  return (
    <nav className={styles.paginationContainer}>
      <ul className={styles.paginationList}>
        {pages.map((page) => (
          <li key={page}>
            <button
              className={styles.paginationButton}
              onClick={() => handleChangePage(page)}
              style={currentPage === page ? { fontWeight: 'bold' } : { color: 'gray' }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
