import { QueryParams } from "./enums/queryParameters";
import PriceFilter from "./filters/PriceFilter";
import PropertyFilter from "./filters/PropertyFilter";

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

export function FilterPanel() {
 
  return (
    <div className="w-full m-0 flex flex-col bg-x-white">
      <PriceFilter />
      <PropertyFilter
        allOptions={brands}
        searchKey={QueryParams.Brands}
        title="Product Brand"
      />
      <PropertyFilter
        allOptions={categories}
        searchKey={QueryParams.Categories}
        title="Categories"
      />
    </div>
  );
}
