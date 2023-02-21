const references = [
  { reference: "#", title: "About" },
  { reference: "#", title: "Privacy Policy" },
  { reference: "#", title: "Licensing" },
  { reference: "#", title: "Social Media" },
];

export function Footer() {
  return (
    <footer className="px-2 bg-x-dark-green text-x-white">
      <div className="m-3">
        <ul className="flex flex-col md:flex-row flex-wrap justify-around w-full">
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
      <span className="block text-sm text-x-white m-3">
        Survivors™. All Rights Reserved.
      </span>
    </footer>
  );
}
