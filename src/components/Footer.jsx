import React from 'react'

export default function Footer() {
  const references = [
    { reference: "#", title: "About" },
    { reference: "#", title: "Privacy Policy" },
    { reference: "#", title: "Licensing" },
    { reference: "#", title: "Social Media" },
  ];

  return (
    <footer class="px-2 bg-x-dark-green text-x-white">
      <div className="m-3">
        <ul class="flex flex-col md:flex-row flex-wrap justify-around w-full">
          {references.map((item, index) => (
            <li key={index}>
              <a href={item.reference} className="mr-4">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr className="border-x-green" />
      <span class="block text-sm text-x-white m-3">
        Survivors™. All Rights Reserved.
      </span>
    </footer>
  );
}
