import { NavLink } from "react-router-dom";

export function EmptyShoppingCart() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl">😥</h1>
          <p className="py-6 text-x-red font-bold">You don't have any products in your cart yet... </p>
          <NavLink to="/catalog">
            <button className="btn text-x-white bg-x-red rounded-lg p-3 m-3">
              Go shopping!
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
