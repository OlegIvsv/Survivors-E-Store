import React from "react";
import { FilterBase } from "./filters/FilterBase";
import PriceFilter from "./filters/PriceFilter";
import PropertyFilter from "./filters/PropertyFilter";

export function FilterPanel() {
  const brands = [
    { name: "Brand One", id: '1' },
    { name: "The Second Brand", id: '22' },
    { name: "Brand #3", id: '333' },
    { name: "Brand Number 4", id: '4444' },
  ];
  const categories = [
    { name: "Death", id: '11' },
    { name: "Life", id: '2' },
    { name: "Пес Патрон", id: '33' },
    { name: "Eternity", id: '44' },
  ];

  return (
    <div className="w-full m-0 flex flex-col bg-x-white">
      <PriceFilter />
      <PropertyFilter
        allOptions={brands}
        searchKey="brands"
        title="Product Brand"
      />
      <PropertyFilter
        allOptions={categories}
        searchKey="categories"
        title="Categories"
      />
    </div>
  );
}
