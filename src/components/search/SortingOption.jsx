import { Menu } from '@headlessui/react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';


export function SortingOption({ mini = false }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSorting = searchParams.get('sorting');

  const setSorting = (value) => {
    searchParams.set('sorting', value);
    setSearchParams(searchParams);
  };

  const options = [
    { name: "By price asc", value: "price-asc" },
    { name: "By price desc", value: "price-desc" },
    { name: "Most popular", value: "popular" },
  ];

 if(mini)
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button>
        <i class="bi bi-sort-down text-2xl text-x-white"></i>
      </Menu.Button>
      <Menu.Items className="left-0 absolute mt-2 z-50 w-56 origin-top-right divide-y divide-x-green rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {options.map((option, i) => (
          <Menu.Item key={i}>
            <button
            onClick={() => setSorting(option.value)} 
            className="hover:bg-x-green hover:text-x-white group flex w-full items-center px-2 py-2 text-sm">
              {option.name}
            </button>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>);

  return (
    <div className="flex flex-col uppercase text-xs text-x-white">
      <p>Sortign</p>
      <div className="flex flex-row justify-center gap-4">
        {options.map((option, i) => (
          <button key={i} 
          onClick={() => setSorting(option.value)}
          className={`btn btn-sm border-none py-0 ${ option.value === currentSorting ? 'underline font-bold' : ''}`}>
            {option.name}
          </button>
        ))}
      </div>
    </div>);
}
