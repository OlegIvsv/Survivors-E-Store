import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

export function GlobalSearchInput() {

  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query'));
  const navigate = useNavigate();
  
  const setTextOnSubmit = (event) => {
    event.preventDefault();
    navigate({
      pathname:'search', 
      search: createSearchParams({
        query: query,
        pageNumber: 1,
        sorting: 'popular'
      }).toString(),
    });    
  };

  return (
    <form class="w-full px-4" onSubmit={e => setTextOnSubmit(e)}>
      <div class="flex">
        <input
          class="input bg-x-white w-full text-x-dark-green mr-3 py-1 px-2 rounded"
          type="text"
          placeholder="Search ..." 
          value={query}
          onChange={e => setQuery(e.target.value)}/>
        <button
          class="btn bg-x-green border-x-green hover:border-transparent text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          <i class="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
}
