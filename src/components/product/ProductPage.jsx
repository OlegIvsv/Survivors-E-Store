import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductImageCarousel } from "./ProductImageCarousel";
import { ProductProperties } from "./ProductProperties";

export default function ProductPage() {
  const product = {
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque minus nemo ullam eligendi atque, aspernatur laborum? Veniam quibusdam alias sapiente dignissimos. Odit repellendus est nisi rerum iusto, incidunt fugiat cumque nulla! Doloribus, fugit, in, eaque ducimus ex atque molestias nam a accusamus obcaecati ullam quasi ab vitae commodi iste consequatur ipsa non accusantium? Fugiat eius quisquam hic odio! Voluptates, tempora aspernatur rerum consectetur voluptatem adipisci quis alias minus ullam molestiae ipsum dicta recusandae ut est accusantium quo iure soluta doloremque laudantium maxime eos repellat ea nobis! Numquam iste odit aliquam, tenetur voluptatum consectetur sint, quo dolor sapiente sunt labore!",
    name: "Something very very important. Gray. Size XL",
    price: 197.5,
    discount: 0.1,
    brand: {
      id: uuidv4,
      name: "Some Brand Here",
    },
    category: {
      id: uuidv4,
      name: "Some Category",
    },
    images: [
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    ],
  };

  const properties = [
    { title: "Brand", value: product.brand.name },
    { title: "Category", value: product.category.name },
    { title: "Property 3", value: "Value 3" },
    { title: "Property 4", value: "Value 4" },
    { title: "Property 5", value: "Value 5" },
  ];

  return (
    <div className="flex flex-col px-1 pt-2 pb-8 bg-gray-100">
      <div className="px-8 mb-2">
        <ProductImageCarousel urls={product.images} />
      </div>
      <div className="px-10">
        <div className="text-start py-2">
          <h2 className="text-2xl font-bold my-2">
            {product.name}
            {product.discount === 0 || (
              <span className="badge bg-x-red text-x-white border-none animate-pulse ml-3">
                -{(product.discount * 100).toFixed()}%
              </span>
            )}
          </h2>
          <div className="flex flex-row space-x-5">
            <h2 className="text-3xl my-auto font-bold">
              {(product.price * (1 - product.discount)).toFixed(2)}$
              {product.discount === 0 || (
                <span className=" text-x-red line-through text-xl">
                  {product.price.toFixed(2)}$
                </span>
              )}
            </h2>
            <button className="buy-btn w-2/12">+ Add to Cart</button>
          </div>
        </div>
        <hr />
        <ProductProperties
          properties={properties}
          description={product.description}
        />
      </div>
    </div>
  );
}
