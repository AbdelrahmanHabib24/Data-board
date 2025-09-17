import Button from "./Button";

export default function Pagination({ page, total, onPageChange, pageSize }) {
  const pages = Math.ceil(total / pageSize);
  if (!pages || pages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4 justify-center">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-1 md:px-5 md:py-2  disabled:bg-gray-300 disabled:text-gray-500"
      >
        Prev
      </Button>

      <span className="px-3 py-1 md:px-4 md:py-2 font-semibold text-gray-700 dark:text-gray-200">
        {page} / {pages}
      </span>

      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="px-4 py-1 md:px-5 md:py-2  disabled:bg-gray-300 disabled:text-gray-500"
      >
        Next
      </Button>
    </div>
  );
}
