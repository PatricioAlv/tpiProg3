import React from 'react';
import { Pagination as BsPagination } from 'react-bootstrap';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showInfo = true,
  totalItems = 0,
  itemsPerPage = 6
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  // Página anterior
  if (currentPage > 1) {
    pages.push(
      <BsPagination.Prev 
        key="prev" 
        onClick={() => onPageChange(currentPage - 1)}
      />
    );
  }

  // Primera página
  if (startPage > 1) {
    pages.push(
      <BsPagination.Item 
        key={1} 
        active={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        1
      </BsPagination.Item>
    );
    if (startPage > 2) {
      pages.push(<BsPagination.Ellipsis key="ellipsis-start" />);
    }
  }

  // Páginas del rango
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <BsPagination.Item 
        key={i} 
        active={currentPage === i}
        onClick={() => onPageChange(i)}
      >
        {i}
      </BsPagination.Item>
    );
  }

  // Última página
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push(<BsPagination.Ellipsis key="ellipsis-end" />);
    }
    pages.push(
      <BsPagination.Item 
        key={totalPages} 
        active={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </BsPagination.Item>
    );
  }

  // Página siguiente
  if (currentPage < totalPages) {
    pages.push(
      <BsPagination.Next 
        key="next" 
        onClick={() => onPageChange(currentPage + 1)}
      />
    );
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      {showInfo && totalItems > 0 ? (
        <small className="text-muted">
          Mostrando {startItem} a {endItem} de {totalItems} proyectos
        </small>
      ) : (
        <div></div>
      )}
      <BsPagination className="mb-0">
        {pages}
      </BsPagination>
      <div style={{ width: showInfo && totalItems > 0 ? '200px' : '0' }}></div>
    </div>
  );
};

export default Pagination;
