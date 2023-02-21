import { Disclosure } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FilterPanel } from "./FilterPanel";
import { OptionsPanel } from "./OptionsPanel";
import { SearchResultList } from "./SearchResultList";

export const testData = () =>
  Array.from({ length: 10 }, (element) => ({
    id: uuidv4(),
    productId: uuidv4(),
    productTitle: "Banana",
    unitPrice: Math.random() * 30,
    discount: Math.random() > 0.5 ? 0 : 0.15,
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5a5c237490bcce79ad84df9c/1518279384323-0YUC6Z83KYA1IVXBU0OA/Soulive-Tshirt-Black-White.jpg?format=1000w",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae praesentium suscipit itaque temporibus iure blanditiis maiores corrupti natus, distinctio minima?",
  }));

export default function SearchPage() {
  /* Make request to API here and pass results to filter panel and search results */
  const [searchParams, setSearchParams] = useSearchParams();
  const products = testData();

  return (
    <div className="flex flex-col grow m-0 bg-white min-h-screen">
      <div>
        <OptionsPanel />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:basis-1/4 md:block bg-x-white">
          <FilterPanel />
        </div>
        <div className="md:hidden">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full px-4 py-2 bg-x-white hover:bg-x-red hover:text-x-white">
                  <i class="bi bi-sliders"></i>
                  <span> FILTERS</span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm text-x-dark-green rounded-b-lg border-b-4">
                  <FilterPanel />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div className="w-full md:basis-3/4">
          <SearchResultList products={products} />
        </div>
      </div>
    </div>
  );
}
