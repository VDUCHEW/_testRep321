import React from 'react';
import styles from '../styles/SearchForm.module.css';

interface Props {
  onSearch: (criteria: any) => void;
}

export const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const criteria = {
      headcount: parseInt(formData.get('headcount') as string),
      headcountFilter: formData.get('headcountFilter') as string,
      funding_stage: formData.get('funding_stage') as string,
      founder_experience: formData.get('founder_experience') as string,
    };
    onSearch(criteria);
  };

  return (
    <form onSubmit={handleSearch} className={styles.formContainer}>
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Headcount:
          <select name='headcountFilter' className={styles.formSelect}>
            <option value='greater'>Greater than</option>
            <option value='less'>Less than</option>
          </select>
          <input type='number' name='headcount' required className={styles.formInput} />
        </label>
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Founding Stage:
          <select name='funding_stage' className={styles.formSelect}>
            <option value='Seed'>Seed</option>
            <option value='Series A'>Series A</option>
            <option value='Series B'>Series B</option>
            <option value='Series C'>Series C</option>
            <option value='Public'>Public</option>
          </select>
        </label>
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Past Experience (optional):
          <input type='text' name='founder_experience' className={styles.formInput} />
        </label>
      </div>
      <button type='submit' className={styles.formButton}>
        Search
      </button>
    </form>
  );
};
