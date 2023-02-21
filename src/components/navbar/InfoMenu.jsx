const infoMenuItems = [
  { reference: '#', title: 'About Us' },
  { reference: '#', title: 'Shipping and Payment' },
  { reference: '#', title: 'Contacts' },
  { reference: '#', title: 'Customer Support' }
];

export function InfoMenu() {
  return (
    <div className="bg-x-dark-green px-2 breadcrumbs">
      <ul className=" text-white">
        {infoMenuItems.map((item, index) => (
          <li>
            <a
              href={item.reference}
              key={index}
              className="text-x-white text-xs font-bold"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
