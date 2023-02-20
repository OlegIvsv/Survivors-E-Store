import { Disclosure } from '@headlessui/react';
import React from 'react';


export function FilterBase({ title, children }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="py-2 flex flex-row justify-between px-3 border-t-2">
            <span className="font-bold">{title}</span>
            {open ? (
              <i className="bi bi-chevron-double-down"></i>
            ) : (
              <i className="bi bi-chevron-double-up"></i>
            )}
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
