import { useMemo } from 'react';

export interface Parameter {
  total: number;
  rowsPerPage: number;
  currentPage?: number;
}

export interface RV {
  startIndex: number;
  endIndex: number;
  countPage: number;
}

function usePagination(parameter: Parameter): RV {
  const { total, rowsPerPage, currentPage = 1 } = parameter;

  const result = useMemo(() => {
    let startIndex = 0;
    let endIndex = 0;
    const countPage = Math.ceil(total / rowsPerPage);

    if (currentPage * rowsPerPage > total) {
      startIndex = (countPage - 1) * rowsPerPage + 1;
      endIndex = total;
    } else {
      startIndex = (currentPage - 1) * rowsPerPage + 1;
      endIndex = currentPage * rowsPerPage;
    }

    return { startIndex, endIndex, countPage };
  }, [total, currentPage, rowsPerPage]);

  return result;
}

export default usePagination;
