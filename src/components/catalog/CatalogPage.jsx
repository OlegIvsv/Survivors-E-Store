import React from "react";
import { CategoryCard } from "./CategoryCard";

const categories = [
  {
    id: 11,
    name: "Collectibles & Art",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
  },
  {
    id: 2,
    name: "Collectibles & Art",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
  },
  {
    id: 33,
    name: "Collectibles & Art",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
  },
  {
    id: 4,
    name: "Collectibles & Art",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
  },
  {
    id: 5,
    name: "Collectibles & Art",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
  },
  {
    id: 6,
    name: "Collectibles & Art",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
  },
  {
    id: 7,
    name: "Collectibles & Art",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
  },
  {
    id: 8,
    name: "Collectibles & Art",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
  },
  {
    id: 9,
    name: "Collectibles & Art",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
  }
];

export default function CatalogPage() {
  return (
    <div className="w-full h-full min-h-screen">
      <div className="mx-auto max-w-2xl py-8 px-2 sm:py-12 sm:px-3 lg:max-w-7xl lg:px-4">
        <div className="grid grid-cols-1 gap-y-10 gap-x-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-5">
          {categories.map((category) => (
            <CategoryCard category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}


