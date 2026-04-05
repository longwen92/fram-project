import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 生成页码数组
  const getPageNumbers = () => {
    const delta = 2; // 当前页前后显示的页数
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* 上一页按钮 */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="上一页"
      >
        <ChevronLeft size={18} />
      </button>

      {/* 页码 */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10">
              <MoreHorizontal size={18} className="text-gray-400" />
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-colors ${
              currentPage === page
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label={`第 ${page} 页`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* 下一页按钮 */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="下一页"
      >
        <ChevronRight size={18} />
      </button>

      {/* 页数信息 */}
      <div className="ml-4 text-sm text-gray-600">
        第 <span className="font-semibold">{currentPage}</span> 页 / 共 <span className="font-semibold">{totalPages}</span> 页
      </div>
    </div>
  );
};

export default Pagination;