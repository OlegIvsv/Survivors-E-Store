import React from "react";

export function ProductImageCarousel({ urls }) {
  return (
    <>
      <style>
        {`.h-70-percent{
              height: 70vh;
            }`}
      </style>
      <div className="carousel carousel-end rounded-box h-70-percent w-full">
        {urls.map((url, index) => (
          <div key={index} className="carousel-item h-full mx-2">
            <img src={url} className="rounded-box h-full hover:scale-105" />
          </div>
        ))}
      </div>
    </>
  );
}
