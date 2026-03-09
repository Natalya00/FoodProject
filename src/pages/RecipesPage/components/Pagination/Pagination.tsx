import React from 'react';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  limit: number;
  total?: number;
};

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  onPageChange, 
  limit,
  total = 0 
}) => {
  const totalPages = Math.ceil(total / limit) || 1;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handlePrev = () => {
    if (hasPrev) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onPageChange(currentPage + 1);
    }
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <div 
          className={styles.arrow} 
          onClick={handlePrev}
          style={{ opacity: hasPrev ? 1 : 0.3, cursor: hasPrev ? 'pointer' : 'default' }}
        >
          <ArrowDownIcon color="secondary" style={{ transform: 'rotate(90deg)' }} />
        </div>
        <div className={styles.pages}>
          {getVisiblePages().map((page, index) => (
            <div
              key={index}
              className={`${styles.page} ${page === currentPage ? styles.active : ''} ${page === '...' ? styles.dots : ''}`}
              onClick={() => typeof page === 'number' ? handlePageClick(page) : undefined}
              style={{ cursor: typeof page === 'number' ? 'pointer' : 'default' }}
            >
              {page}
            </div>
          ))}
        </div>
        <div 
          className={styles.arrow} 
          onClick={handleNext}
          style={{ opacity: hasNext ? 1 : 0.3, cursor: hasNext ? 'pointer' : 'default' }}
        >
          <ArrowDownIcon color="secondary" style={{ transform: 'rotate(-90deg)' }} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
