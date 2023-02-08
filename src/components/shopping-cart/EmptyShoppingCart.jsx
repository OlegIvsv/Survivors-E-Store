import { NavLink } from "react-router-dom";


export function EmptyShoppingCart() {
  return (
    <p className="font-bold text-x-dark-green">
      <p>You don't have any products in your cart yet :(</p>
      <NavLink to="/catalog">
        <button className="text-x-white bg-x-red rounded-lg p-3">
          Go shopping!
        </button>
      </NavLink>
    </p>
  );
}
