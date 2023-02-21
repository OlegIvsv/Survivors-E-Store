import { useSearchParams } from "react-router-dom";
import { QueryParams } from "./enums/queryParameters";

export function Pagination({ numberOfPages }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number.parseInt(searchParams.get(QueryParams.Pagination));
  const startsFrom = Math.max(pageNumber - 2, 1);
  const endsWith = Math.min(pageNumber + 2, numberOfPages);
  const buttons = [];

  for (let i = startsFrom; i <= endsWith; ++i) {
    const buttonStyle = i === pageNumber ? "pagination-btn-active" : "pagination-btn";
    buttons.push(
      <button className={buttonStyle} onClick={() => setPage(i)}>
        {i}
      </button>
    );
  }

  const setPage = (value) => {
    searchParams.set(QueryParams.Pagination, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-row gap-2">
      <button
        disabled={pageNumber === 1}
        className="pagination-btn"
        onClick={() => setPage(pageNumber - 1)}
      >
        <i class="bi bi-caret-left-fill"></i>
      </button>
      {buttons}
      <button
        disabled={pageNumber === numberOfPages}
        className="pagination-btn"
        onClick={() => setPage(pageNumber + 1)}
      >
        <i class="bi bi-caret-right-fill"></i>
      </button>
    </div>
  );
}
