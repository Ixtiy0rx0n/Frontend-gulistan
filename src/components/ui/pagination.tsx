import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage < 3) {
                for (let i = 0; i < 4; i++) {
                    pages.push(i);
                }
                pages.push(-1); // Separator
                pages.push(totalPages - 1);
            } else if (currentPage > totalPages - 4) {
                pages.push(0);
                pages.push(-1); // Separator
                for (let i = totalPages - 4; i < totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(0);
                pages.push(-1); // Separator
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push(-1); // Separator
                pages.push(totalPages - 1);
            }
        }

        return pages;
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {generatePageNumbers().map((pageNumber, index) =>
                pageNumber === -1 ? (
                    <span key={`separator-${index}`} className="px-2">
                        ...
                    </span>
                ) : (
                    <Button
                        key={pageNumber}
                        variant={pageNumber === currentPage ? "default" : "outline"}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber + 1}
                    </Button>
                )
            )}

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};
