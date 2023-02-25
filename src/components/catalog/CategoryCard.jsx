import React from "react";
import { createSearchParams, Link } from "react-router-dom";
import { QueryParams } from "../search/enums/queryParameters";
import { SortingOptions } from "../search/enums/sortingOptions";


export function CategoryCard({ category }) {
  const routeParams = createSearchParams({
    [QueryParams.Sorting]: SortingOptions.Popular,
    [QueryParams.Pagination]: 1,
    [QueryParams.Categories]: [category.id],
  });

  return (
    <Link
      to={`/search?${routeParams}`}
      className="bg-x-red text-x-white pb-2 font-bold text-start rounded-lg"
    >
      <h3 className="py-2 pl-3">{category.name}</h3>
      <div className="w-full aspect-w-10 aspect-h-8 overflow-hidden">
        <img
          src={category.imageUrl}
          className="h-full w-full object-cover object-center hover:opacity-75" />
      </div>
    </Link>
  );
}
