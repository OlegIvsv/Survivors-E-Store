import { Disclosure, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { authStateSelector } from "../redux/auth/authSlice";
import { useCartQuery } from "../redux/cart/cartApiSlice";

export default function TopMenu() {

  const {id:customerId} = useSelector(authStateSelector);
  const {data: cart, isSuccess} = useCartQuery({customerId});

  const itemCount = isSuccess ? cart.items.length : '...';

  return (
    <nav className="bg-x-dark-green text-x-white font-bold m-0 p-0">
      <div className="hidden sm:block">
        <InfoMenu />
        <div className="flex flex-row justify-between w-full">
          <div className="w-20 pl-3 py-2 mr-4">
            <img
              src={require("../pictures/logo-no-background.png")}
              className="object-scale-down"
            />
          </div>
          <div className="flex flex-col items-center grow">
            <div className="my-auto">
              <a href="#" className="m-2 text-2xl">
                CATALOG
              </a>
            </div>
          </div>
          <div className="basis-1/2 flex items-center px-4">
            <GlobalSearchInput />
          </div>
          <div className="basis-1/5 flex flex-row items-center justify-center gap-10 text-4xl">
            <button>
              <i className="bi bi-person-fill"></i>
            </button>
            <button>
              <i className="bi bi-cart-fill"></i>
              <div className="badge bg-x-green text-x-white">{itemCount}</div>
            </button>
          </div>
        </div>
      </div>

      <div className="visible sm:hidden">
        <Disclosure>
          <Transition
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-95"
          >
            <Disclosure.Panel>
              <div class="flex flex-col justify-between mt-0 pt-0">
                <InfoMenu />
                <hr />
                <div className="basis-1/2 flex flex-row items-center grow py-2">
                  <div className="basis-1/2 my-auto">
                    <a href="#" className="m-2 text-xl">
                      CATALOG
                    </a>
                  </div>
                  <div className="basis-1/2 flex flex-row items-center justify-center gap-10 text-3xl">
                    <button>
                      <i class="bi bi-person-fill"></i>
                    </button>
                    <button>
                      <i class="bi bi-cart-fill"></i>
                      <div className="badge bg-x-green text-x-white">{5}</div>
                    </button>
                  </div>
                </div>
                <GlobalSearchInput />
              </div>
            </Disclosure.Panel>
          </Transition>

          <Disclosure.Button className="py-2">
            <i class="bi bi-list"></i>
          </Disclosure.Button>
        </Disclosure>
      </div>
    </nav>
  );
}

export function GlobalSearchInput() {
  return (
    <form class="w-full px-4">
      <div class="flex">
        <input
          class="input bg-x-white w-full text-x-dark-green mr-3 py-1 px-2 rounded"
          type="text"
          placeholder="Search ..."
        />
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          <i class="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
}

export function InfoMenu() {

  const infoMenuItems = [
    { reference: '#' , title: 'About Us'},
    { reference: '#' , title: 'Shipping and Payment'},
    { reference: '#' , title: 'Contacts'},
    { reference: '#' , title: 'Customer Support'} 
  ];
  
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