import { Disclosure, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CartStatus } from "../../redux/cart/cartStatus";
import { GlobalSearchInput } from "./GlobalSearchInput";
import { InfoMenu } from "./InfoMenu";
import {
  cartItemCountSelector,
  cartStatusSelector,
} from "../../redux/cart/cartSelectors";
import { fetchCartItemsAsync } from "../../redux/cart/thunks";


export function TopMenu() {

  const dispatch = useDispatch();
  const cartItemsCount = useSelector(cartItemCountSelector);
  const cartStatus = useSelector(cartStatusSelector);

  useEffect(() => { 
    if(cartStatus === CartStatus.Idle) {
     dispatch(fetchCartItemsAsync());
    }
  }, [cartStatus]);
  
  const itemCountValue = (cartStatus === CartStatus.Succeeded ? cartItemsCount : '...'); 

  return (
    <nav className="bg-x-dark-green text-x-white font-bold m-0 p-0">
      <div className="hidden sm:block">
        <InfoMenu />
        <div className="flex flex-row justify-between w-full">
          <div className="w-20 pl-3 py-2 mr-4">
            <img
              src={require("../../pictures/logo-no-background.png")}
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
              <NavLink to="login">
                <i className="bi bi-person-fill"></i>
              </NavLink>
            <NavLink to='cart'>
              <i className="bi bi-cart-fill"></i>
              <div className="badge bg-x-green text-x-white">{itemCountValue}</div>
            </NavLink>
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
                      <NavLink to="login">
                        <i className="bi bi-person-fill"></i>
                      </NavLink>
                    <NavLink to='cart'>
                      <i class="bi bi-cart-fill"></i>
                      <div className="badge bg-x-green text-x-white">{itemCountValue}</div>
                    </NavLink>
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


